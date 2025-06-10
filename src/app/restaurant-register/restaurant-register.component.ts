import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';

@Component({
  selector: 'app-restaurant-register',
  standalone: true,
  imports: [CommonModule, RouterModule, RestaurantFormComponent],
  template: `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="card shadow-sm">
            <div class="card-header bg-success text-white">
              <div class="d-flex justify-content-between align-items-center">
                <h2 class="h4 mb-0">Registro de Restaurante</h2>
                <a routerLink="/" class="btn btn-outline-light btn-sm">
                  <i class="bi bi-arrow-left"></i> Volver al inicio
                </a>
              </div>
            </div>
            <div class="card-body">
              <app-restaurant-form></app-restaurant-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border: none;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .card-header {
      background-color: #2c3e50 !important; /* Azul oscuro en lugar de verde */
      padding: 1.5rem;
      border-bottom: none;
      color: white; /* Asegura que el texto sea blanco */
    }
    
    .card-header h2 {
      color: white !important; /* Fuerza el color blanco en el título */
    }
    
    .card-body {
      padding: 0;
      background-color: #f8f9fa;
    }
    
    .btn-outline-light {
      border-color: rgba(255, 255, 255, 0.5);
      color: white;
      transition: all 0.3s ease;
    }
    
    .btn-outline-light:hover {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: white;
    }
  `]
})
export class RestaurantRegisterComponent {
  // El formulario está completamente manejado por el componente hijo RestaurantFormComponent
}
