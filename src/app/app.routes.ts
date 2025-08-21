import { CountriesMenuReactive } from './ejercicios/countries-menu-reactive/countries-menu-reactive';
import { Routes } from '@angular/router';
import { Autofill } from './ejercicios/autofill/autofill';
import { CountriesMenu } from './ejercicios/countries-menu/countries-menu';
import { NestedMenu } from './ejercicios/nested-menu/nested-menu';
import { StarRating } from './ejercicios/star-rating/star-rating';

export const routes: Routes = [
  { path: '', redirectTo: 'autofill', pathMatch: 'full' },
  { path: 'autofill', component: Autofill },
  { path: 'countries', component: CountriesMenu },
  { path: 'nesting', component: NestedMenu },
  { path: 'stars', component: StarRating },
  { path: 'countries-reactive', component: CountriesMenuReactive },
];
