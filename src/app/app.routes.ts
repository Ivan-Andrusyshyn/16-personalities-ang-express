// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'test/16-personalities', pathMatch: 'full' },
  {
    path: 'test/:testName',
    loadComponent: () =>
      import('./features/personal-tests/pages/test-page/test-page.component').then(
        (m) => m.TestPageComponent,
      ),
  },
  { path: '**', redirectTo: 'test/16-personalities' },
];
