import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Notification, NotificationService } from '@core/services/notification/notification.service';
import { NotificationComponent } from './notification.component';
import { Subscription } from 'rxjs';

/**
 * Position where notifications will be displayed
 */
type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

/**
 * Component that displays all active notifications in the application.
 * This component is standalone and can be imported directly into any module.
 * 
 * @example
 * // In your component template:
 * <app-notification-container></app-notification-container>
 * 
 * // In your component class:
 * constructor(private notificationService: NotificationService) {}
 * 
 * showNotification() {
 *   this.notificationService.success('Success', 'Operation completed successfully!');
 * }
 */
@Component({
  selector: 'app-notification-container',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    NotificationComponent
  ],
  template: `
    <div class="notification-container" [ngClass]="'position-' + position">
      <app-notification 
        *ngFor="let notification of notifications"
        [notification]="notification"
        (dismiss)="onDismiss(notification.id)">
      </app-notification>
    </div>
  `,
  styles: [`
    :host {
      position: fixed;
      z-index: 1100;
      max-width: 350px;
      width: 100%;
    }
    
    .notification-container {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding: 1rem;
      max-height: 100vh;
      overflow-y: auto;
    }
    
    /* Position variants */
    .position-top-right {
      top: 1rem;
      right: 1rem;
    }
    
    .position-top-left {
      top: 1rem;
      left: 1rem;
    }
    
    .position-bottom-right {
      bottom: 1rem;
      right: 1rem;
    }
    
    .position-bottom-left {
      bottom: 1rem;
      left: 1rem;
    }
  `]
})
export class NotificationContainerComponent implements OnInit, OnDestroy {
  /** Current notifications to display */
  notifications: Notification[] = [];
  
  /** Position of the notification container */
  position: NotificationPosition = 'top-right';
  
  private subscription: Subscription = new Subscription();
  
  constructor(private notificationService: NotificationService) {}
  
  ngOnInit(): void {
    // Subscribe to notification changes
    this.subscription.add(
      this.notificationService.notifications$.subscribe(
        (notifications: Notification[]) => this.notifications = notifications
      )
    );
  }
  
  /**
   * Handle notification dismiss event
   * @param id Notification ID to dismiss
   */
  onDismiss(id: number): void {
    this.notificationService.remove(id);
  }
  
  ngOnDestroy(): void {
    // Clean up subscription
    this.subscription.unsubscribe();
  }
}
