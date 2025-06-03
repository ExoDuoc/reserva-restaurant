export interface Restaurant {
  id?: number | string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  cuisineType: string;
  capacity: number;
  imageUrl?: string;
  rating?: number;
  priceRange?: string;
  openingHours?: {
    [key: string]: { open: boolean, slots: TimeSlot[] }
  };
}

export interface TimeSlot {
  time: string;
  available: boolean;
  maxReservations?: number;
  currentReservations?: number;
}
