import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Módulos de características
import { NotificationsModule } from './features/notifications/notifications.module';

// Servicios
import { NotificationService } from './core/services/notification/notification.service';

// Componentes
import { NotificationContainerComponent } from './shared/components/notification/notification-container.component';

/**
 * Componente raíz de la aplicación.
 * Configura el diseño principal y la estructura de la aplicación.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // Módulos de Angular
    CommonModule,
    RouterModule,
    
    // Módulos de características
    NotificationsModule,
    
    // Componentes standalone
    NotificationContainerComponent
  ],
  template: `
    <!-- Contenedor de notificaciones globales -->
    <app-notification-container></app-notification-container>
    
    <div class="app-container">
      <header class="navbar navbar-expand-lg p-3">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center" routerLink="/">
            <div class="logo me-2">
              <span class="logo-text">SABOR</span>
            </div>
          </a>
          <div class="ms-auto d-flex align-items-center">
            <!-- Botones de prueba para notificaciones -->
            <div class="notification-test-buttons me-3 d-none d-lg-flex">
              <button class="btn btn-sm btn-success me-1" (click)="showNotification('success')">Éxito</button>
              <button class="btn btn-sm btn-info me-1" (click)="showNotification('info')">Info</button>
              <button class="btn btn-sm btn-warning me-1" (click)="showNotification('warning')">Advertencia</button>
              <button class="btn btn-sm btn-danger" (click)="showNotification('error')">Error</button>
            </div>
            
            <button class="btn btn-outline-secondary me-2" routerLink="/login">Iniciar sesión / Registrarse</button>
          </div>
        </div>
      </header>
      
      <main>
        <router-outlet></router-outlet>
      </main>
      
      <footer class="footer p-4 mt-5">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <h5>Contacto</h5>
              <p>Email: info&#64;sabor-restaurant.com</p>
              <p>Teléfono: +123 456 7890</p>
            </div>
            <div class="col-md-4">
              <h5>Enlaces</h5>
              <ul class="list-unstyled">
                <li><a href="#">Términos y Condiciones</a></li>
                <li><a href="#">Política de Privacidad</a></li>
              </ul>
            </div>
            <div class="col-md-4">
              <h5>Síguenos</h5>
              <div class="social-icons">
                <a href="#" class="me-2">Facebook</a>
                <a href="#" class="me-2">Instagram</a>
                <a href="#">Twitter</a>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col text-center">
              <p>&copy; 2025 SABOR Restaurant. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      font-family: 'Poppins', sans-serif;
      background-color: #ffffff;
    }
    
    main {
      flex: 1;
    }

    .navbar {
      background-color: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      border-radius: 10px;
      background-color: #8b0000; /* Rojo oscuro */
      color: white;
    }

    .logo-text {
      font-weight: bold;
      font-size: 14px;
      letter-spacing: 1px;
    }

    .navbar-brand {
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }

    .btn-outline-secondary {
      border-color: #8b0000;
      color: #8b0000;
    }

    .btn-outline-secondary:hover {
      background-color: #8b0000;
      color: white;
    }

    .footer {
      background-color: #f8f9fa;
      color: #333;
    }

    .footer a {
      color: #8b0000;
      text-decoration: none;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    .social-icons a {
      color: #8b0000;
      font-weight: 500;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'SABOR Restaurant';
  
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // Mostrar notificación de bienvenida con un pequeño retraso para mejor experiencia de usuario
    setTimeout(() => {
      this.notificationService.success(
        '¡Bienvenido!',
        'Sistema de gestión de restaurantes cargado correctamente.'
      );
    }, 1000);
  }
  
  /**
   * Muestra una notificación del tipo especificado para probar el sistema
   * @param type Tipo de notificación: success, info, warning, error
   */
  showNotification(type: 'success' | 'error' | 'info' | 'warning'): void {
    const titles = {
      success: '¡Operación exitosa!',
      error: 'Error',
      info: 'Información',
      warning: 'Advertencia'
    };
    
    const messages = {
      success: 'La operación se ha completado correctamente.',
      error: 'Ha ocurrido un error al procesar la solicitud.',
      info: 'El sistema se actualizará en los próximos días.',
      warning: 'Esta acción podría afectar a datos existentes.'
    };
    
    // Usar el servicio para mostrar la notificación del tipo seleccionado
    this.notificationService[type](titles[type], messages[type]);
  }
}
