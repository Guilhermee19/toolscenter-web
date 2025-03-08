import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/components/navbar/navbar.component').then(
        (m) => m.NavbarComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'text-convert',
        loadComponent: () =>
          import('./features/activities/text-convert/text-convert.component').then(
            (m) => m.TextConvertComponent
          ),
      },
      {
        path: 'json-format-validate',
        loadComponent: () =>
          import('./features/activities/json-format-validate/json-format-validate.component').then(
            (m) => m.JsonFormatValidateComponent
          ),
      },
    ],
  },
];
