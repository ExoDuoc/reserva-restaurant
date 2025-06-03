export interface Reservation {
  id?: number | string;
  restaurantId: number | string;
  userId?: number | string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  partySize: number;
  status: ReservationStatus;
  specialRequests?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}
