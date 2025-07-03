import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-switcher',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule],
  template: `
    <div class="user-switcher" *ngIf="!isProduction">
      <div ngbDropdown placement="top-end" class="d-inline-block">
        <button 
          class="btn btn-sm btn-outline-secondary" 
          id="userSwitcher" 
          ngbDropdownToggle>
          <i class="bi bi-person-bounding-box me-1"></i>
          Cambiar Usuario
        </button>
        
        <div ngbDropdownMenu aria-labelledby="userSwitcher" class="dropdown-menu-end">
          <h6 class="dropdown-header">Usuario de Prueba</h6>
          
          <button class="dropdown-item" (click)="switchTo('client')">
            <i class="bi bi-person me-2"></i>
            Cliente
          </button>
          
          <button class="dropdown-item" (click)="switchTo('restaurant')">
            <i class="bi bi-shop me-2"></i>
            Restaurante
          </button>
          
          <div class="dropdown-divider"></div>
          
          <button class="dropdown-item text-danger" (click)="logout()">
            <i class="bi bi-box-arrow-right me-2"></i>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `.user-switcher {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      
      .btn {
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        border-radius: 20px;
        padding: 0.25rem 0.75rem;
        font-size: 0.8rem;
        
        i {
          font-size: 0.9em;
        }
      }
    }`
  ]
})
export class UserSwitcherComponent {
  isProduction = false;

  constructor(private authService: AuthService) {
    // En producción ocultamos este componente
    this.isProduction = false; // Cambiar a true en producción
  }

  switchTo(userType: 'client' | 'restaurant'): void {
    this.authService.simulateLogin(userType);
  }

  logout(): void {
    this.authService.logout();
  }
}
