// Este es el archivo de entorno de desarrollo
// Los valores aquí definidos se utilizan cuando la aplicación se ejecuta en modo desarrollo
// `ng build` reemplaza `environment.ts` con `environment.prod.ts` durante la compilación

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api', // URL de tu API de desarrollo
  appName: 'Restaurant App (Dev)',
  version: '1.0.0-dev',
  defaultLanguage: 'es',
  supportedLanguages: ['es', 'en'],
  // Configuración de autenticación
  auth: {
    tokenKey: 'auth_token',
    userKey: 'current_user',
    tokenExpirationKey: 'token_expiration',
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
    minReservationNotice: 2, // Horas de anticipación mínima para reservar
  },
  // Configuración de mapas (si se usa)
  maps: {
    apiKey: 'TU_API_KEY_DE_GOOGLE_MAPS',
    defaultZoom: 12,
    defaultCenter: {
      lat: -33.4489, // Santiago, Chile (coordenadas de ejemplo)
      lng: -70.6693,
    },
  },
};
