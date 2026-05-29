import { Injectable } from '@angular/core';

//===============================
import { ITestConfig, TestState } from '../models/test.models';

@Injectable({ providedIn: 'root' })
export class TestStorageStateService {
  private getKey(testName: string): string {
    return `test-${testName}-config`;
  }

  getTestState(testName: string): ITestConfig | null {
    const raw = localStorage.getItem(this.getKey(testName));
    return raw ? JSON.parse(raw) : null;
  }

  setTestState(testName: string, state: Partial<TestState>) {
    const current =
      this.getTestState(testName) ?? this.createDefaultTestState();

    const updated = {
      ...current,
      ...state,
    };

    localStorage.setItem(this.getKey(testName), JSON.stringify(updated));
  }

  clearState(testName: string) {
    localStorage.removeItem(this.getKey(testName));
  }

  private createDefaultTestState(): ITestConfig {
    return {
      answers: {},
      currentQuestion: 1,
      paidTestInfo: null,
    };
  }
}
