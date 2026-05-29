import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// =====================
import { TestProgressComponent } from '../../components/test-progress/test-progress.component';
import { TestQuestionComponent } from '../../components/test-question/test-question.component';
import { TestResultComponent } from '../../components/test-result/test-result.component';
import { PersonalTestsStateService } from '../../services/personal-tests-state.service';
import { ITestConfig, TestName, TestState } from '../../models/test.models';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    TestProgressComponent,
    TestQuestionComponent,
    TestResultComponent,
  ],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss',
})
export class TestPageComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  readonly state = inject(PersonalTestsStateService);

  testName = signal<TestName>('16-personalities');

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('testName') as TestName;

    if (this.state.phase() === 'intro') {
      if (name) this.testName.set(name);
      this.state.setCurrentTest(this.testName());
      this.state.loadQuestions(this.testName());
    }
  }

  ngOnDestroy() {
    this.state.reset();
  }

  onAnswer(event: { questionId: number; answer: string }) {
    this.state.selectAnswer(event.questionId, event.answer);
  }

  onNext() {
    this.state.next(this.testName());
  }

  onPrev() {
    this.state.prev();
  }

  onStart() {
    this.state.startTest();
  }

  onRestart() {
    this.state.reset();
    this.state.loadQuestions(this.testName());
  }

  get questionNumber(): string {
    const i = this.state.currentIndex();
    const t = this.state.questions().length;
    return `Питання ${i + 1} з ${t}`;
  }
}
