import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  location: string;
  image: string;
  address: string;
  capacity: number;
  availableHours: string[];
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  // Propiedades de búsqueda y filtros
  searchTerm = '';
  searchPerformed = false;
  selectedCuisine = '';
  selectedCity = '';
  minCapacity = 0;
  selectedHour = '';
  
  resetFilters() {
    this.searchTerm = '';
    this.selectedCuisine = '';
    this.selectedCity = '';
    this.minCapacity = 0;
    this.selectedHour = '';
    this.applyFilters();
  }

  // Tipos de cocina para el filtro
  cuisineTypes = [
    'Comida Chilena Tradicional',
    'Mariscos y Pescados (cocina costera)',
    'Comida Internacional',
    'Parrilladas y Carnes a la brasa',
    'Vegetariana / Vegana',
    'Italiana',
    'Mexicana',
    'Japonesa'
  ];

  // Ciudades para el filtro
  cities = [
    'Santiago Centro',
    'Providencia',
    'Valparaíso',
    'Viña del Mar',
    'Concepción'
  ];
  
  restaurants: Restaurant[] = [
    { 
      id: 1, 
      name: 'Sabores de la Abuela', 
      cuisine: 'Comida Chilena Tradicional', 
      rating: 4, 
      location: 'Centro', 
      image: 'https://images.unsplash.com/photo-1476224203421-9ca39d5a1f3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      address: 'Av. Providencia 1234, Santiago',
      capacity: 80,
      availableHours: ['12:00', '13:00', '19:00', '20:00', '21:00']
    },
    { 
      id: 2, 
      name: 'La Costa del Sabor', 
      cuisine: 'Mariscos y Pescados (cocina costera)', 
      rating: 5, 
      location: 'Playa', 
      image: 'https://images.unsplash.com/photo-1555396273-8c073d5c7f6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      address: 'Av. Marina 456, Viña del Mar',
      capacity: 60,
      availableHours: ['13:00', '14:00', '20:00', '21:00']
    },
    { 
      id: 3, 
      name: 'Sabor Italiano', 
      cuisine: 'Italiana', 
      rating: 4, 
      location: 'Norte', 
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      address: 'Calle Italia 789, Santiago',
      capacity: 40,
      availableHours: ['12:30', '13:30', '19:30', '20:30']
    },
    { 
      id: 4, 
      name: 'Tacos y Más', 
      cuisine: 'Mexicana', 
      rating: 4, 
      location: 'Sur', 
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      address: 'Av. México 321, Santiago',
      capacity: 35,
      availableHours: ['13:00', '14:00', '20:00', '21:00', '22:00']
    },
    { 
      id: 5, 
      name: 'Sushi Express', 
      cuisine: 'Comida Internacional', 
      rating: 4, 
      location: 'Centro', 
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      address: 'Calle Japón 567, Santiago',
      capacity: 50,
      availableHours: ['12:00', '13:00', '19:00', '20:00', '21:00']
    },
    { 
      id: 6, 
      name: 'Verde Que Te Quiero Verde', 
      cuisine: 'Vegetariana / Vegana', 
      rating: 5, 
      location: 'Este', 
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      address: 'Av. Las Condes 890, Santiago',
      capacity: 45,
      availableHours: ['12:00', '13:00', '14:00', '19:00', '20:00']
    },
    { 
      id: 7, 
      name: 'El Asador', 
      cuisine: 'Parrilladas y Carnes a la brasa', 
      rating: 5, 
      location: 'Norte', 
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      address: 'Av. Vitacura 2450, Santiago',
      capacity: 70,
      availableHours: ['12:30', '13:30', '14:30', '20:00', '21:30', '22:30']
    },
    { 
      id: 8, 
      name: 'Fusion Global', 
      cuisine: 'Comida Internacional', 
      rating: 4, 
      location: 'Centro', 
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      address: 'Av. Nueva Costanera 3921, Vitacura',
      capacity: 55,
      availableHours: ['12:00', '13:15', '14:30', '20:00', '21:15', '22:30']
    },
    { 
      id: 9, 
      name: 'La Picá del Mar', 
      cuisine: 'Mariscos y Pescados (cocina costera)', 
      rating: 5, 
      location: 'Playa', 
      image: 'https://images.unsplash.com/photo-1555396273-8c073d5c7f6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      address: 'Av. San Martín 1200, Viña del Mar',
      capacity: 65,
      availableHours: ['12:30', '13:30', '14:30', '20:00', '21:00', '22:00']
    },
    { 
      id: 10, 
      name: 'Fuego & Sabor Parrilla Urbana', 
      cuisine: 'Parrilladas y Carnes a la brasa', 
      rating: 5, 
      location: 'Norte', 
      image: 'https://images.unsplash.com/photo-1558030006-450675392846?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      address: 'Av. Vitacura 3200, Vitacura',
      capacity: 75,
      availableHours: ['12:00', '13:00', '14:00', '20:00', '21:00', '22:00']
    },
    { 
      id: 11, 
      name: 'Verde Vivo', 
      cuisine: 'Vegetariana / Vegana', 
      rating: 4, 
      location: 'Providencia', 
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      address: 'Av. Providencia 2100, Providencia',
      capacity: 40,
      availableHours: ['12:00', '13:00', '14:00', '19:30', '20:30', '21:30']
    },
    { 
      id: 12, 
      name: 'Sazón Global', 
      cuisine: 'Comida Internacional', 
      rating: 4, 
      location: 'Las Condes', 
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      address: 'Av. Apoquindo 4500, Las Condes',
      capacity: 60,
      availableHours: ['12:30', '13:30', '14:30', '20:00', '21:00', '22:00']
    }
  ];
  
  filteredRestaurants: Restaurant[] = [];
  
  constructor(private router: Router) {
    // Inicializar resultados vacíos
    this.filteredRestaurants = [];
  }
  
  // Aplicar todos los filtros (nombre, cocina, capacidad, horario)
  applyFilters() {
    this.searchPerformed = true;
    
    let results = [...this.restaurants];
    
    // Filtro por término de búsqueda (nombre del restaurante)
    if (this.searchTerm && this.searchTerm.trim()) {
      const term = this.searchTerm.trim().toLowerCase();
      results = results.filter(restaurant => 
        restaurant.name.toLowerCase().includes(term)
      );
    }
    
    // Filtro por tipo de cocina
    if (this.selectedCuisine) {
      results = results.filter(restaurant => 
        restaurant.cuisine === this.selectedCuisine
      );
    }

    // Filtro por ciudad
    if (this.selectedCity) {
      results = results.filter(restaurant => 
        restaurant.location === this.selectedCity
      );
    }
    
    // Filtro por capacidad mínima
    if (this.minCapacity > 0) {
      results = results.filter(restaurant => 
        restaurant.capacity >= this.minCapacity
      );
    }
    
    // Filtro por disponibilidad horaria
    if (this.selectedHour) {
      results = results.filter(restaurant => 
        restaurant.availableHours.includes(this.selectedHour)
      );
    }
    
    this.filteredRestaurants = results;
  }
  
  // Redirigir al usuario a la página de reserva
  viewAvailability(restaurant: Restaurant) {
    this.router.navigate(['/reservar', restaurant.id]);
  }
}
