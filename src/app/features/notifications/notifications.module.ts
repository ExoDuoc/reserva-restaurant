import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { NotificationContainerComponent } from '../../shared/components/notification/notification-container.component';

/**
 * Módulo que agrupa la funcionalidad de notificaciones de la aplicación.
 * 
 * Este módulo exporta el componente NotificationContainerComponent que debe incluirse
 * una sola vez en la aplicación (generalmente en el AppComponent) para mostrar notificaciones.
 * 
 * El servicio NotificationService ya está proporcionado en root (providedIn: 'root'),
 * por lo que no es necesario volver a proporcionarlo aquí.
 * 
 * @example
 * // En el módulo que necesite usar notificaciones:
 * @NgModule({
 *   imports: [
 *     // Otros módulos...
 *     NotificationsModule
 *   ]
 * })
 * 
 * // En el componente donde se desee mostrar notificaciones:
 * export class MyComponent {
 *   constructor(private notificationService: NotificationService) {}
 *   
 *   showNotification() {
 *     this.notificationService.success('Éxito', 'Operación completada correctamente');
 *   }
 * }
 */
@NgModule({
  imports: [
    CommonModule,
    // Importar el componente standalone
    NotificationContainerComponent
  ],
  exports: [
    // Exportar el componente para que pueda ser usado por otros módulos
    NotificationContainerComponent
  ]
  // No es necesario proporcionar NotificationService aquí ya que usa providedIn: 'root'
})
export class NotificationsModule { }
