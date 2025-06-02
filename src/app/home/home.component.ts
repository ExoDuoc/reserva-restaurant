import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <!-- Banner Principal -->
    <div class="hero-banner">
      <div class="overlay"></div>
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6 text-white">
            <h1 class="hero-title">Sabor excepcional en cada momento</h1>
            <p class="hero-subtitle">Descubre una experiencia gastronómica única con nuestros platillos de autor</p>
            <div class="mt-4">
              <button class="btn btn-main btn-lg me-2" (click)="reservarAhora()">Reservar Ahora</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección de Características -->
    <section class="features-section py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="bi bi-award"></i>
              </div>
              <h3>Cocina Gourmet</h3>
              <p>Nuestros chefs crean experiencias culinarias únicas con los mejores ingredientes locales.</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="bi bi-calendar-check"></i>
              </div>
              <h3>Reserva Fácil</h3>
              <p>Sistema de reservas intuitivo y rápido para asegurar tu mesa en cualquier momento.</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="feature-card">
              <div class="feature-icon">
                <i class="bi bi-stars"></i>
              </div>
              <h3>Ambiente Único</h3>
              <p>Disfruta de un espacio acogedor diseñado para crear los mejores momentos.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-banner {
      height: 80vh;
      background-image: url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=1200&q=80');
      background-size: cover;
      background-position: center;
      position: relative;
      color: white;
      margin-bottom: 2rem;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .hero-subtitle {
      font-size: 1.3rem;
      margin-bottom: 2rem;
    }

    .btn-main {
      background-color: #8b0000; /* Rojo oscuro */
      border-color: #8b0000;
      color: white;
      padding: 0.8rem 2rem;
      font-weight: 600;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .btn-main:hover {
      background-color: #a50000;
      border-color: #a50000;
    }

    .features-section {
      background-color: #fff;
    }

    .feature-card {
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 3px 15px rgba(0,0,0,0.05);
      text-align: center;
      height: 100%;
      transition: transform 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
    }

    .feature-icon {
      font-size: 2.5rem;
      color: #8b0000;
      margin-bottom: 1.5rem;
    }

    .feature-card h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #333;
    }

    .feature-card p {
      color: #666;
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}
  
  reservarAhora() {
    this.router.navigate(['/buscar']);
  }
}
