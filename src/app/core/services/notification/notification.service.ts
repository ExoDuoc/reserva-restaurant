import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Tipos de notificaciones soportados por el sistema.
 * - 'success': Operación exitosa
 * - 'error': Error que requiere atención
 * - 'info': Información general
 * - 'warning': Advertencia sobre una operación
 */
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

/**
 * Interfaz que define la estructura de una notificación.
 */
export interface Notification {
  /** Identificador único de la notificación */
  id: number;
  
  /** Tipo de notificación (success, error, info, warning) */
  type: NotificationType;
  
  /** Título breve de la notificación */
  title: string;
  
  /** Mensaje detallado de la notificación */
  message: string;
  
  /** 
   * Duración en milisegundos que la notificación permanecerá visible.
   * Si no se especifica, se usará el valor por defecto del servicio.
   */
  duration?: number;
  
  /** 
   * Indica si la notificación se cerrará automáticamente después de la duración especificada.
   * Por defecto es true.
   */
  autoClose?: boolean;
}

/**
 * Servicio para gestionar notificaciones en la aplicación.
 * Proporciona métodos para mostrar diferentes tipos de notificaciones
 * y permite la suscripción a cambios en el estado de las notificaciones.
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  /** Almacena el listado actual de notificaciones activas */
  private notifications: Notification[] = [];
  
  /** Subject para notificar cambios en el estado de las notificaciones */
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  
  /** Contador para generar IDs únicos */
  private lastId = 0;

  /**
   * Observable que emite el estado actual de las notificaciones cada vez que hay un cambio.
   * Los componentes pueden suscribirse a este observable para reaccionar a los cambios.
   */
  public readonly notifications$: Observable<Notification[]> = this.notificationsSubject.asObservable();

  /**
   * Muestra una notificación de éxito.
   * @param title Título de la notificación
   * @param message Mensaje detallado
   * @param duration Duración en milisegundos (opcional, por defecto 5000ms)
   * @returns El ID de la notificación creada
   */
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

  /**
   * Muestra una notificación de error.
   * @param title Título del error
   * @param message Mensaje detallado del error
   * @param duration Duración en milisegundos (opcional, por defecto 10000ms)
   * @returns El ID de la notificación creada
   */
  error(title: string, message: string, duration: number = 10000): number {
    return this.addNotification({
      id: this.generateId(),
      type: 'error',
      title,
      message,
      duration
    });
  }

  /**
   * Muestra una notificación informativa.
   * @param title Título de la información
   * @param message Mensaje detallado
   * @param duration Duración en milisegundos (opcional, por defecto 5000ms)
   * @returns El ID de la notificación creada
   */
  info(title: string, message: string, duration: number = 5000): number {
    return this.addNotification({
      id: this.generateId(),
      type: 'info',
      title,
      message,
      duration
    });
  }

  /**
   * Muestra una notificación de advertencia.
   * @param title Título de la advertencia
   * @param message Mensaje detallado de la advertencia
   * @param duration Duración en milisegundos (opcional, por defecto 7000ms)
   * @returns El ID de la notificación creada
   */
  warning(title: string, message: string, duration: number = 7000): number {
    return this.addNotification({
      id: this.generateId(),
      type: 'warning',
      title,
      message,
      duration
    });
  }

  /**
   * Añade una nueva notificación al sistema.
   * @param notification Objeto de notificación a añadir
   * @returns El ID de la notificación añadida
   * @private
   */
  private addNotification(notification: Notification): number {
    // Establecer valor por defecto para autoClose
    if (notification.autoClose === undefined) {
      notification.autoClose = true;
    }
    
    // Si la duración es 0 o negativa, desactivar autoClose
    if (notification.duration !== undefined && notification.duration <= 0) {
      notification.autoClose = false;
    }
    
    // Añadir la notificación a la lista
    this.notifications.push(notification);
    this.notificationsSubject.next([...this.notifications]);
    
    // Configurar cierre automático si está habilitado
    if (notification.autoClose && notification.duration && notification.duration > 0) {
      setTimeout(() => {
        this.remove(notification.id);
      }, notification.duration);
    }
    
    return notification.id;
  }
  
  /**
   * Elimina una notificación por su ID.
   * @param id ID de la notificación a eliminar
   */
  remove(id: number): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notificationsSubject.next([...this.notifications]);
  }
  
  /**
   * Elimina todas las notificaciones activas.
   */
  clear(): void {
    this.notifications = [];
    this.notificationsSubject.next([]);
  }
  
  /**
   * Genera un ID único para una nueva notificación.
   * @returns Un nuevo ID numérico único
   * @private
   */
  private generateId(): number {
    return ++this.lastId;
  }
}
