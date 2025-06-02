import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
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
  { path: '', component: SearchComponent },
  { path: 'reservar/:restaurantId', component: ReservationComponent },
  { path: 'registro', component: RestaurantRegisterComponent },
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
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ReservationComponent,
    AdminLayoutComponent,
    DashboardComponent,
    ReservationsComponent,
    AvailabilityComponent,
    ProfileComponent,
    RestaurantRegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
