import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';

// Services
import { AuthService } from './services/auth.service';
import { RestaurantService } from './services/api/restaurant.service';
import { ReservationService } from './services/api/reservation.service';
import { NotificationService } from './services/notification.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    // Servicios centrales
    AuthService,
    RestaurantService,
    ReservationService,
    NotificationService,
    
    // Interceptores HTTP
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [
    // Exportar servicios que podrían necesitarse en otros módulos
    // Aunque los servicios son singleton a nivel de inyección de raíz,
    // esta es una buena práctica para documentar las dependencias
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Asegurarse de que CoreModule solo se importe una vez en AppModule
    if (parentModule) {
      throw new Error('CoreModule ya está cargado. Debe importarse solo en AppModule.');
    }
  }
}
