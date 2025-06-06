import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

// Componentes
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ReservationsComponent } from './admin/reservations/reservations.component';
import { AvailabilityComponent } from './admin/availability/availability.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { RestaurantRegisterComponent } from './restaurant-register/restaurant-register.component';

// Módulos personalizados
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

// Función para obtener el token JWT
export function tokenGetter() {
  return localStorage.getItem('auth_token');
}

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
  // Ruta para el registro de restaurantes
  { path: 'registro-restaurante', component: RestaurantRegisterComponent },
  // Redirigir rutas antiguas a las nuevas rutas de autenticación
  { path: 'registro', redirectTo: 'auth/registro' },
  { path: 'login', redirectTo: 'auth/login' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    // Solo componentes que no son standalone
    AdminLayoutComponent,
    DashboardComponent,
    ReservationsComponent,
    AvailabilityComponent
  ],
  imports: [
    // Módulos de Angular
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    // Módulos de la aplicación
    CoreModule,
    SharedModule,
    AuthModule,
    
    // Importar componentes standalone
    SearchComponent,
    ReservationComponent,
    ProfileComponent,
    RestaurantRegisterComponent,
    
    // Rutas
    RouterModule,
    
    // JWT Module
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: ['localhost:3000/auth/']
      }
    })
  ],
  providers: [
    provideRouter(routes)
  ]
  // Eliminamos el array bootstrap ya que usaremos bootstrapApplication
})
export class AppModule { }
