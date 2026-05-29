import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'test/:testName',
    loadComponent: () =>
      import('./features/personal-tests/pages/test-page/test-page.component').then(
        (m) => m.TestPageComponent,
      ),
  },
  { path: '**', redirectTo: 'test/16-personalities' },
];
