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
      <header class="navbar navbar-expand-lg p-3 bg-white shadow-sm">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center" routerLink="/" style="text-decoration: none;">
            <div class="logo me-3 d-flex align-items-center">
              <span class="logo-icon">🍽️</span>
              <span class="logo-text">GUSTO</span>
            </div>
          </a>
          <div class="ms-auto d-flex align-items-center">
            <div class="d-flex gap-2">
              <button class="btn btn-outline-secondary px-3 py-2 fw-medium" routerLink="/auth/registro">
                Registrarse
              </button>
              <button class="btn btn-success px-4 py-2 fw-medium" routerLink="/auth/login">
                <i class="bi bi-box-arrow-in-right me-2"></i>Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        <router-outlet></router-outlet>
      </main>
      
      <footer class="footer mt-5 bg-dark text-white pt-5 pb-4">
        <div class="container">
          <div class="row g-4">
            <!-- Contacto -->
            <div class="col-lg-4 col-md-6">
              <div class="footer-widget">
                <h5 class="text-uppercase fw-bold mb-4 position-relative pb-3">
                  <i class="bi bi-geo-alt-fill me-2 text-success"></i>Contacto
                  <span class="footer-title-border"></span>
                </h5>
                <ul class="list-unstyled">
                  <li class="mb-3">
                    <i class="bi bi-envelope me-2 text-success"></i>
                    <a href="mailto:info&#64;restaurantegusto.com" class="text-white text-decoration-none">info&#64;restaurantegusto.com</a>
                  </li>
                  <li class="mb-3">
                    <i class="bi bi-telephone-fill me-2 text-success"></i>
                    <a href="tel:+1234567890" class="text-white text-decoration-none">+1 (234) 567-890</a>
                  </li>
                  <li class="mb-3">
                    <i class="bi bi-geo-alt-fill me-2 text-success"></i>
                    Av. Principal 1234, Santiago, Chile
                  </li>
                </ul>
              </div>
            </div>

            <!-- Enlaces Rápidos -->
            <div class="col-lg-2 col-md-6">
              <div class="footer-widget">
                <h5 class="text-uppercase fw-bold mb-4 position-relative pb-3">
                  Enlaces
                  <span class="footer-title-border"></span>
                </h5>
                <ul class="list-unstyled">
                  <li class="mb-2">
                    <a href="#" class="text-white text-decoration-none d-block py-1">
                      <i class="bi bi-chevron-right text-success me-2"></i>Inicio
                    </a>
                  </li>
                  <li class="mb-2">
                    <a href="#" class="text-white text-decoration-none d-block py-1">
                      <i class="bi bi-chevron-right text-success me-2"></i>Menú
                    </a>
                  </li>
                  <li class="mb-2">
                    <a href="#" class="text-white text-decoration-none d-block py-1">
                      <i class="bi bi-chevron-right text-success me-2"></i>Reservas
                    </a>
                  </li>
                  <li class="mb-2">
                    <a href="#" class="text-white text-decoration-none d-block py-1">
                      <i class="bi bi-chevron-right text-success me-2"></i>Contacto
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Redes Sociales -->
            <div class="col-lg-4 col-md-6">
              <div class="footer-widget">
                <h5 class="text-uppercase fw-bold mb-4 position-relative pb-3">
                  Síguenos
                  <span class="footer-title-border"></span>
                </h5>
                <p class="mb-4">Síguenos en nuestras redes sociales para conocer nuestras promociones y novedades.</p>
                <div class="social-links">
                  <a href="#" class="social-icon me-2" target="_blank" title="Facebook">
                    <i class="bi bi-facebook"></i>
                  </a>
                  <a href="#" class="social-icon me-2" target="_blank" title="Instagram">
                    <i class="bi bi-instagram"></i>
                  </a>
                  <a href="#" class="social-icon me-2" target="_blank" title="Twitter">
                    <i class="bi bi-twitter-x"></i>
                  </a>
                  <a href="#" class="social-icon" target="_blank" title="TikTok">
                    <i class="bi bi-tiktok"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <hr class="my-4 bg-light">
          
          <div class="row">
            <div class="col-md-6 text-center text-md-start">
              <p class="mb-0">&copy; 2025 <span class="text-success">GUSTO</span>. Todos los derechos reservados.</p>
            </div>
            <div class="col-md-6 text-center text-md-end">
              <p class="mb-0">
                <a href="#" class="text-white text-decoration-none me-3">Términos y Condiciones</a>
                <a href="#" class="text-white text-decoration-none">Política de Privacidad</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    
    * {
      font-family: 'Poppins', sans-serif;
    }
    
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    main {
      flex: 1;
    }
    
    .footer {
      background-color: #f8f9fa;
    }
    
    .navbar {
      background-color: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .logo-icon {
      font-size: 2.5rem;
      margin-right: 0.75rem;
      transition: transform 0.3s ease;
    }
    
    .logo-text::after {
      transform: scaleX(1);
    }
    
    .logo-text {
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(90deg, #28a745, #34ce57);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      letter-spacing: -0.5px;
      position: relative;
      padding-bottom: 0.25rem;
      line-height: 1;
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
