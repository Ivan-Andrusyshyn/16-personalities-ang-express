import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ====================
import { TestName, TestResults } from '../models/test.models';
import { environment } from '../../../core/environment/environment';

// ===
@Injectable({
  providedIn: 'root',
})
export class PersonalTestsApiService {
  private http = inject(HttpClient);
  private base = environment.apiUrl + '/api/tests';

  getQuestions(testName: TestName): Observable<any> {
    return this.http.get<any>(`${this.base}/${testName}/questions`);
  }

  submitAnswers(payload: any, testName: TestName): Observable<any> {
    return this.http.post<any>(`${this.base}/${testName}/answers`, payload);
  }

  getResult(
    type: string,
    testName: TestName,
  ): Observable<{ personInformation: TestResults; message: string }> {
    return this.http.get<{ personInformation: TestResults; message: string }>(
      `${this.base}/${testName}/result/${type}`,
    );
  }
}
