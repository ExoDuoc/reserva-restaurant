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
    }
    
    .card-header {
      background-color: #28a745 !important;
      padding: 1.25rem 1.5rem;
      border-bottom: none;
    }
    
    .card-body {
      padding: 0;
    }
  `]
})
export class RestaurantRegisterComponent {
  // El formulario está completamente manejado por el componente hijo RestaurantFormComponent
}
