import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <header class="navbar navbar-expand-lg p-3">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center" routerLink="/">
            <div class="logo me-2">
              <span class="logo-text">SABOR</span>
            </div>
          </a>
          <div class="ms-auto">
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
export class AppComponent {
  title = 'SABOR Restaurant';
}
