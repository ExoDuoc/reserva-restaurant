import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

// Componentes
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

// Módulos personalizados
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// Entorno
import { environment } from '../environments/environment';

// Función para obtener el token JWT
export function tokenGetter() {
  return localStorage.getItem('auth_token');
}

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
    // AppComponent es ahora standalone, no debe ser declarado aquí
    HomeComponent,
    SearchComponent,
    ReservationComponent,
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
    
    // JWT Module
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000', 'api.turestaurante.com'], // Ajustar según tu dominio
        disallowedRoutes: [
          `${environment.apiUrl}/auth/login`,
          `${environment.apiUrl}/auth/register`
        ]
      }
    }),
    
    // Módulos de la aplicación
    CoreModule,
    SharedModule,
    
    // Componentes (standalone)
    ProfileComponent,
    RestaurantRegisterComponent,
    
    // Rutas
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  providers: [
    // Servicios globales pueden ir aquí si no están en CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
