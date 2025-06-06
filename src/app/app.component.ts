import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginButtonComponent } from './shared/components/login-button/login-button.component';

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
    RouterOutlet,
    
    // Componentes
    LoginButtonComponent
  ],
  template: `
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
            <app-login-button></app-login-button>
          </div>
        </div>
      </header>
      
      <!-- Contenido principal -->
      <main class="flex-grow-1">
        <router-outlet></router-outlet>
      </main>
      
      <!-- Pie de página -->
      <footer class="bg-dark text-white py-4">
        <div class="container">
          <div class="row">
            <div class="col-md-4 mb-4 mb-md-0">
              <h5 class="text-uppercase mb-3">GUSTO</h5>
              <p class="mb-0">Tu plataforma de reservas de restaurantes favorita. Encuentra los mejores lugares para comer y disfruta de una experiencia única.</p>
            </div>
            <div class="col-md-2 mb-4 mb-md-0">
              <h5 class="text-uppercase mb-3">Enlaces</h5>
              <ul class="list-unstyled">
                <li class="mb-2"><a href="#" class="text-white text-decoration-none">Inicio</a></li>
                <li class="mb-2"><a href="#" class="text-white text-decoration-none">Restaurantes</a></li>
                <li class="mb-2"><a href="#" class="text-white text-decoration-none">Sobre Nosotros</a></li>
                <li class="mb-2"><a href="#" class="text-white text-decoration-none">Contacto</a></li>
              </ul>
            </div>
            <div class="col-md-3 mb-4 mb-md-0">
              <h5 class="text-uppercase mb-3">Contacto</h5>
              <ul class="list-unstyled">
                <li class="mb-2"><i class="bi bi-geo-alt me-2"></i> Av. Principal 123, Ciudad</li>
                <li class="mb-2"><i class="bi bi-telephone me-2"></i> +1 234 567 890</li>
                <li class="mb-2"><i class="bi bi-envelope me-2"></i> info&#64;gusto.com</li>
              </ul>
            </div>
            <div class="col-md-3">
              <h5 class="text-uppercase mb-3">Síguenos</h5>
              <div class="d-flex gap-3">
                <a href="#" class="text-white fs-5"><i class="bi bi-facebook"></i></a>
                <a href="#" class="text-white fs-5"><i class="bi bi-twitter"></i></a>
                <a href="#" class="text-white fs-5"><i class="bi bi-instagram"></i></a>
                <a href="#" class="text-white fs-5"><i class="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>
          <hr class="my-4 bg-light">
          <div class="text-center">
            <p class="mb-0">&copy; {{ currentYear }} GUSTO. Todos los derechos reservados.</p>
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
    }
    
    .logo {
      font-weight: 700;
      font-size: 1.5rem;
    }
    
    .logo-icon {
      font-size: 2rem;
      line-height: 1;
    }
    
    /* Estilos para los títulos del footer */
    footer h5 {
      color: #28a745; /* Color verde del botón de registro */
      font-weight: 600;
      margin-bottom: 1rem;
      position: relative;
      padding-bottom: 0.5rem;
    }
    
    footer h5::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 50px;
      height: 2px;
      background-color: #28a745;
    }
    
    .logo-text {
      color: #28a745;
      font-weight: 700;
    }
    
    main {
      flex: 1;
    }
    
    .btn-success {
      background-color: #28a745;
      border-color: #28a745;
    }
    
    .btn-outline-success {
      color: #28a745;
      border-color: #28a745;
    }
    
    .btn-outline-success:hover {
      background-color: #28a745;
      color: white;
    }
    
    .navbar {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    footer {
      background-color: #343a40;
    }
    
    footer a:hover {
      color: #28a745 !important;
      text-decoration: none !important;
    }
    
    .social-icon {
      transition: all 0.3s ease;
    }
    
    .social-icon:hover {
      transform: translateY(-3px);
      color: #28a745 !important;
    }
  `]
})
export class AppComponent {
  title = 'GUSTO';
  currentYear = new Date().getFullYear();
}
