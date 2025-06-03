# Historial de Cambios - SABOR Restaurant App

## v1 - Sistema de Notificaciones (03/06/2025)

### Nuevas Características
- **Sistema de Notificaciones Completo**:
  - Implementación del `NotificationService` con soporte para diferentes tipos (success, error, info, warning)
  - Creación de componentes standalone `NotificationComponent` y `NotificationContainerComponent`
  - Notificaciones con cierre automático y duración configurable
  - Posicionamiento flexible (top-right, top-left, bottom-right, bottom-left)

### Mejoras
- **Modernización de Componentes**:
  - Conversión a arquitectura standalone para mayor modularidad
  - Mejora de la UX con animaciones y transiciones suaves
  - Diseño visual consistente con el color principal verde (#28a745)
  - Integración de Bootstrap Icons para iconografía

### Cambios Técnicos
- Actualización de la estructura de la aplicación para soportar componentes standalone
- Mejora en la organización de módulos y servicios
- Refactorización de la inicialización de la aplicación en `main.ts`
- Corrección de configuración y dependencias del proyecto

### Accesibilidad
- Roles ARIA adecuados para notificaciones
- Textos alternativos para iconos
- Contraste mejorado para diferentes tipos de notificaciones
- Soporte para navegación por teclado

---

*Este archivo se irá actualizando con cada nueva versión del proyecto.*
