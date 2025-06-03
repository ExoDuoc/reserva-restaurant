import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Notification, NotificationType } from '@core/services/notification/notification.service';

/**
 * Componente que muestra una notificación individual.
 * Este componente es standalone y debe usarse con NotificationContainerComponent.
 *
 * @example
 * <app-notification
 *   [notification]="notificationObject"
 *   (dismiss)="handleDismiss($event)">
 * </app-notification>
 */
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, NgClass],
  template: `
    <div class="notification" [ngClass]="notification.type" role="alert" [attr.aria-live]="notification.type === 'error' ? 'assertive' : 'polite'">
      <div class="notification-content">
        <div class="notification-header">
          <i [class]="getIconClass()" aria-hidden="true"></i>
          <h3 class="notification-title">{{ notification.title }}</h3>
          <button 
            *ngIf="dismissible"
            type="button"
            class="close-btn" 
            (click)="onDismiss()"
            [attr.aria-label]="'Cerrar notificación: ' + notification.title">
            &times;
          </button>
        </div>
        <p class="notification-message" *ngIf="notification.message">{{ notification.message }}</p>
      </div>
    </div>
  `,
  styles: [`
    .notification {
      position: relative;
      padding: 1rem;
      margin-bottom: 0.5rem;
      border-radius: 0.25rem;
      color: #fff;
      box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease, opacity 0.2s ease;
      opacity: 0.95;
    }

    .notification:hover {
      opacity: 1;
      transform: translateY(-2px);
    }

    .notification.success {
      background-color: #28a745;
      border-left: 4px solid #218838;
    }

    .notification.error {
      background-color: #dc3545;
      border-left: 4px solid #c82333;
    }

    .notification.info {
      background-color: #17a2b8;
      border-left: 4px solid #138496;
    }

    .notification.warning {
      background-color: #ffc107;
      color: #212529;
      border-left: 4px solid #e0a800;
    }

    .notification-content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .notification-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .notification-title {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      flex-grow: 1;
    }

    .notification-message {
      margin: 0.25rem 0 0 0;
      font-size: 0.875rem;
      line-height: 1.4;
      opacity: 0.9;
    }

    .close-btn {
      background: none;
      border: none;
      color: inherit;
      font-size: 1.25rem;
      line-height: 1;
      cursor: pointer;
      padding: 0.25rem;
      opacity: 0.7;
      transition: opacity 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
    }

    .close-btn:hover {
      opacity: 1;
    }

    .close-btn:focus {
      outline: 2px solid rgba(255, 255, 255, 0.5);
      outline-offset: 2px;
      border-radius: 0.25rem;
    }
  `]
})
export class NotificationComponent {
  /** La notificación a mostrar */
  @Input() notification!: Notification;
  
  /** Evento emitido cuando se debe descartar la notificación */
  @Output() dismiss = new EventEmitter<number>();
  
  /** Indica si la notificación puede ser descartada por el usuario */
  @Input() dismissible: boolean = true;

  /**
   * Devuelve la clase de icono según el tipo de notificación
   * @returns Clase CSS para el icono de Bootstrap
   */
  getIconClass(): string {
    const icons: Record<NotificationType, string> = {
      success: 'bi-check-circle-fill',
      error: 'bi-exclamation-circle-fill',
      warning: 'bi-exclamation-triangle-fill',
      info: 'bi-info-circle-fill'
    };
    return `bi ${icons[this.notification.type]}`;
  }

  /**
   * Maneja el evento de cierre de la notificación
   */
  onDismiss(): void {
    this.dismiss.emit(this.notification.id);
  }
}
