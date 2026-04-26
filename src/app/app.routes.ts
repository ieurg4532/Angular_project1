import { Routes } from '@angular/router';
import { TravelListComponent } from './features/travel-list/travel-list';
import { LoginComponent } from './features/login/login';
import { RegisterComponent } from './features/register/register';
import { TravelFormComponent } from './features/travel-form/travel-form';
import { authGuard } from './core/guards/auth.guard';
import { TravelDetailsComponent } from './features/travel-details/travel-details';

export const routes: Routes = [
  { path: 'travels', component: TravelListComponent },

  // Тепер цей рядок працюватиме без помилок
  { path: 'travel/:id', component: TravelDetailsComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'travel/new',
    component: TravelFormComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/travels', pathMatch: 'full' },
  { path: '**', redirectTo: '/travels' },
];
