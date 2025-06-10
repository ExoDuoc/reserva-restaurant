export interface Restaurant {
  id?: number | string;
  name: string;
  description: string;
  address: string;
  location?: string;
  phone: string;
  email: string;
  cuisineType: string;
  category: string;
  capacity: number;
  maxCapacity?: number;
  imageUrl?: string;
  image?: string; // Para compatibilidad con el componente existente
  rating?: number;
  available?: boolean;
  priceRange?: string;
  openingHours?: string | {
    [key: string]: { open: boolean, slots: TimeSlot[] }
  };
  availableHours?: string[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
  maxReservations?: number;
  currentReservations?: number;
}

export interface RestaurantFilters {
  searchTerm: string;
  category: string;
  location: string;
  partySize: number;
  showAvailableOnly: boolean;
  [key: string]: unknown; // Para permitir acceso por índice de tipo string
}
