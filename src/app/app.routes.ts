import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ReservationsComponent } from './admin/reservations/reservations.component';
import { AvailabilityComponent } from './admin/availability/availability.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { RestaurantRegisterComponent } from './restaurant-register/restaurant-register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'buscar', component: SearchComponent },
  { path: 'reservar/:restaurantId', component: ReservationComponent },
  { 
    path: 'admin', 
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'reservas', component: ReservationsComponent },
      { path: 'disponibilidad', component: AvailabilityComponent },
      { path: 'perfil', component: ProfileComponent }
    ]
  },
  { 
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'registro-restaurante', component: RestaurantRegisterComponent },
  { path: 'registro', redirectTo: 'auth/registro', pathMatch: 'full' },
  { path: 'login', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
