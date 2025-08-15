import { Routes } from '@angular/router';
import { Autofill } from './ejercicios/autofill/autofill';
import { CountriesMenu } from './ejercicios/countries-menu/countries-menu';

export const routes: Routes = [
  { path: '', redirectTo: 'autofill', pathMatch: 'full' },
  { path: 'autofill', component: Autofill },
  { path: 'countries', component: CountriesMenu },
];
