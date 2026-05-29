import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  inject,
  PLATFORM_ID,
  signal,
  computed,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';

// ----------------------
import { PersonalTestsApiService } from './personal-tests-api.service';
import {
  Question,
  TestName,
  TestResultRequest,
  TestState,
} from '../models/test.models';
import { TestStorageStateService } from './test-storage.service';

const INITIAL: TestState = {
  phase: 'intro',
  currentTest: '16-personalities',
  questions: [],
  currentIndex: 0,
  answers: {},
  result: null,
  resultType: null,
  error: null,
  isLoading: false,
};

@Injectable({ providedIn: 'root' })
export class PersonalTestsStateService {
  private api = inject(PersonalTestsApiService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private testStorageService = inject(TestStorageStateService);
  private isBrowser = isPlatformBrowser(this.platformId);
  // ── Стан ──────────────────────────────────────────────────────────────
  private _state = signal<TestState>({ ...INITIAL });

  readonly phase = computed(() => this._state().phase);
  readonly questions = computed(() => this._state().questions);
  readonly currentIndex = computed(() => this._state().currentIndex);
  readonly answers = computed(() => this._state().answers);
  readonly result = computed(() => this._state().result);
  readonly error = computed(() => this._state().error);
  readonly isLoading = computed(() => this._state().isLoading);

  readonly currentQuestion = computed<Question | null>(() => {
    const qs = this._state().questions;
    const i = this._state().currentIndex;
    return qs[i] ?? null;
  });

  readonly progress = computed(() => {
    const total = this._state().questions.length;
    if (!total) return 0;
    return Math.round((this._state().currentIndex / total) * 100);
  });

  readonly isLastQuestion = computed(() => {
    const s = this._state();
    return s.currentIndex === s.questions.length - 1;
  });

  currentAnswer = computed(() => {
    const q = this.currentQuestion();
    if (!q) return null;
    const answers = this._state().answers;
    return (
      Object.entries(answers).find(
        ([questionId, answer]) => +questionId === q.id,
      )?.[1] ?? null
    );
  });

  constructor() {
    if (this.isBrowser) {
      const storageData = this.testStorageService.getTestState(
        '16-personalities',
      ) as TestState | null;
      if (storageData) {
        if (storageData.result) {
          storageData.phase = 'result';
        }
        this.patch(storageData);
      }
    }
  }

  getSignalState(): WritableSignal<TestState> {
    return this._state;
  }

  private patch(partial: Partial<TestState>): void {
    this._state.update((s) => ({ ...s, ...partial }));
    if (this.isBrowser) {
      if (this._state().currentTest) {
        this.testStorageService.setTestState(this._state().currentTest!, {
          ...partial,
        });
      } else {
        window.prompt('PROBLEM WITH TEST NAME IN STATE');
      }
    }
  }

  private getDevice(): string {
    if (!isPlatformBrowser(this.platformId)) return 'server';
    const w = window.innerWidth;
    return w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
  }

  private buildPayload(testName: TestName): TestResultRequest {
    const isBrowser = isPlatformBrowser(this.platformId);
    return {
      answers: this._state().answers,
      userInformation: {
        testName,
        testPrice: null,
        isPreload: false,
        referrer: isBrowser ? document.referrer : '',
        routeTracker: isBrowser ? window.location.href : '',
        timestamp: new Date().toISOString(),
        device: this.getDevice(),
      },
    };
  }

  setCurrentTest(testName: TestName): void {
    this.patch({ currentTest: testName });
  }

  loadQuestions(testName: TestName): void {
    this.patch({ isLoading: true, error: null, phase: 'intro' });
    this.api.getQuestions(testName).subscribe({
      next: (res) => {
        this.patch({
          questions: res.questions,
          isLoading: false,
          phase: 'intro',
        });
      },
      error: (err) => {
        this.patch({
          isLoading: false,
          error: err.message ?? 'Помилка завантаження',
        });
      },
    });
  }

  startTest(): void {
    this.patch({ phase: 'questions', currentIndex: 0, answers: {} });
  }

  selectAnswer(questionId: number, optionType: string): void {
    const answers = this._state().answers;
    answers[questionId] = optionType;

    this.patch({ answers });
  }

  next(testName: TestName): void {
    const s = this._state();
    if (s.currentIndex < s.questions.length - 1) {
      this.patch({ currentIndex: s.currentIndex + 1 });
    } else {
      this.submitAnswers(testName);
    }
  }

  prev(): void {
    const s = this._state();
    if (s.currentIndex > 0) {
      this.patch({ currentIndex: s.currentIndex - 1 });
    }
  }

  private submitAnswers(testName: TestName): void {
    this.patch({ phase: 'loading', isLoading: true, error: null });
    const payload = this.buildPayload(testName);

    this.api.submitAnswers(payload, testName).subscribe({
      next: ({ personType }) => {
        this.patch({ resultType: personType });
        this.loadResult(personType, testName);
      },
      error: (err) => {
        this.patch({
          phase: 'questions',
          isLoading: false,
          error: err.message ?? 'Помилка відправки',
        });
      },
    });
  }

  private loadResult(type: string, testName: TestName): void {
    this.api.getResult(type, testName).subscribe({
      next: (result) => {
        this.patch({
          result: result.personInformation,
          isLoading: false,
          phase: 'result',
        });
      },
      error: (err) => {
        this.patch({
          isLoading: false,
          error: err.message ?? 'Помилка завантаження результату',
        });
      },
    });
  }

  reset(): void {
    if (this.isBrowser) {
      const key = `test-${this._state().currentTest}-config`;
      localStorage.removeItem(key);
    }

    this._state.set({ ...INITIAL });
  }
}
