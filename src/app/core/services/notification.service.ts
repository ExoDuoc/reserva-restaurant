import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Tipos de notificaciones soportados
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

// Interfaz para las notificaciones
export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  duration?: number; // Duración en milisegundos (opcional)
  autoClose?: boolean; // Si se cierra automáticamente
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: Notification[] = [];
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  private lastId = 0;

  // Observable para suscribirse a cambios en las notificaciones
  public notifications$: Observable<Notification[]> = this.notificationsSubject.asObservable();

  // Mostrar notificación de éxito
  success(title: string, message: string, duration: number = 5000): number {
    return this.addNotification({
      id: this.generateId(),
      type: 'success',
      title,
      message,
      duration,
      autoClose: true
    });
  }

  // Mostrar notificación de error
  error(title: string, message: string, duration: number = 5000): number {
    return this.addNotification({
      id: this.generateId(),
      type: 'error',
      title,
      message,
      duration,
      autoClose: true
    });
  }

  // Mostrar notificación informativa
  info(title: string, message: string, duration: number = 3000): number {
    return this.addNotification({
      id: this.generateId(),
      type: 'info',
      title,
      message,
      duration,
      autoClose: true
    });
  }

  // Mostrar notificación de advertencia
  warning(title: string, message: string, duration: number = 4000): number {
    return this.addNotification({
      id: this.generateId(),
      type: 'warning',
      title,
      message,
      duration,
      autoClose: true
    });
  }

  // Añadir una notificación personalizada
  addNotification(notification: Omit<Notification, 'id'> & { id?: number }): number {
    const id = this.generateId();
    const newNotification: Notification = {
      id,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      duration: notification.duration,
      autoClose: notification.autoClose !== false // true por defecto
    };

    this.notifications.push(newNotification);
    this.notificationsSubject.next([...this.notifications]);

    // Configurar cierre automático si está habilitado
    if (newNotification.autoClose && newNotification.duration) {
      setTimeout(() => {
        this.removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }

  // Eliminar una notificación por su ID
  removeNotification(id: number): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notificationsSubject.next([...this.notifications]);
  }

  // Limpiar todas las notificaciones
  clearNotifications(): void {
    this.notifications = [];
    this.notificationsSubject.next([]);
  }

  // Generar un ID único para la notificación
  private generateId(): number {
    return ++this.lastId;
  }
}
