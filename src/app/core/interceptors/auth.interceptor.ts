import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Obtener el token de autenticación
    const token = this.authService.getToken();
    
    // Clonar la solicitud y añadir el encabezado de autorización si existe el token
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Manejar la solicitud y capturar errores
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Manejar errores 401 (No autorizado)
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login'], { 
            queryParams: { returnUrl: this.router.url } 
          });
        }
        
        // Manejar errores 403 (Prohibido)
        if (error.status === 403) {
          // Redirigir a página de acceso denegado o mostrar mensaje
          this.router.navigate(['/access-denied']);
        }
        
        // Propagar el error
        return throwError(() => error);
      })
    );
  }
}
