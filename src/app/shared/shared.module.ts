import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios (ahora se proporcionan en provideIn: 'root')
// Los componentes standalone ya no necesitan ser importados aquí

// Módulos de terceros
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/**
 * Módulo compartido que proporciona componentes, directivas y pipes comunes 
 * para toda la aplicación.
 * 
 * Nota: Los componentes de notificación ahora son standalone y no necesitan
 * ser declarados o exportados a través de este módulo.
 */
@NgModule({
  declarations: [
    // Otros componentes compartidos que no son standalone
  ],
  imports: [
    // Módulos de Angular
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    
    // Módulos de terceros
    NgbModule
  ],
  exports: [
    // Módulos de Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    // Módulos de terceros
    NgbModule,
    
    // Los componentes standalone ya no se exportan desde aquí
  ]
  // NotificationService se provee con provideIn: 'root' en su decorador @Injectable
})
export class SharedModule { }
