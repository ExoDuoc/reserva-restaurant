export interface User {
  id?: number | string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  profileImage?: string;
  preferences?: UserPreferences;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum UserRole {
  CUSTOMER = 'customer',
  RESTAURANT_ADMIN = 'restaurant_admin',
  SYSTEM_ADMIN = 'system_admin'
}

export interface UserPreferences {
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  language: string;
  theme: 'light' | 'dark';
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresAt: number;
}
