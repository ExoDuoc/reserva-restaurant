// Este es el archivo de entorno de producción
// Los valores aquí definidos se utilizan cuando la aplicación se construye para producción
// con el comando `ng build --configuration=production`

export const environment = {
  production: true,
  apiUrl: 'https://api.turestaurante.com/api', // URL de producción de tu API
  appName: 'Restaurant App',
  version: '1.0.0',
  defaultLanguage: 'es',
  supportedLanguages: ['es', 'en'],
  // Configuración de autenticación
  auth: {
    tokenKey: 'prod_auth_token',
    userKey: 'prod_current_user',
    tokenExpirationKey: 'prod_token_expiration',
  },
  // Configuración de notificaciones
  notifications: {
    defaultDuration: 5000, // 5 segundos
    maxStack: 5,
  },
  // Configuración de paginación
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
  },
  // Configuración de la aplicación
  app: {
    maxPartySize: 20,
    maxDaysInAdvance: 90,
    minReservationNotice: 2,
  },
  // Configuración de mapas (si se usa)
  maps: {
    apiKey: 'TU_API_KEY_DE_GOOGLE_MAPS_PRODUCCION',
    defaultZoom: 12,
    defaultCenter: {
      lat: -33.4489, // Santiago, Chile (coordenadas de ejemplo)
      lng: -70.6693,
    },
  },
  // Otras configuraciones específicas de producción
  enableAnalytics: true,
  logLevel: 'error',
};
