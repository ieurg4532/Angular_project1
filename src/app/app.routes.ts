import { Routes } from '@angular/router';
import { TravelListComponent } from './features/travel-list/travel-list';
import { TravelDetailsComponent } from './features/travel-details/travel-details';
import { NotFound } from './core/pages/not-found/not-found';
import { TravelFormComponent } from './features/travel-form/travel-form';

export const routes: Routes = [
  { path: '', redirectTo: 'travels', pathMatch: 'full' },

  { path: 'travels', component: TravelListComponent },

  { path: 'travel/new', component: TravelFormComponent },

  { path: 'travel/:id', component: TravelDetailsComponent },

  { path: '**', component: NotFound },
];
