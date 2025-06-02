import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  // Propiedades de búsqueda y filtros
  searchTerm = '';
  searchPerformed = false;
  selectedCuisine = '';
  minCapacity = 0;
  selectedHour = '';
  
  // Tipos de cocina para el filtro
  cuisineTypes = [
    'Chilena',
    'Italiana',
    'Mariscos',
    'Mexicana',
    'Japonesa',
    'Vegetariana'
  ];
  
  restaurants: Restaurant[] = [
    { 
      id: 1, 
      name: 'La Parrilla', 
      cuisine: 'Chilena', 
      rating: 4, 
      location: 'Centro', 
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      address: 'Av. Providencia 1234, Santiago',
      capacity: 80,
      availableHours: ['12:00', '13:00', '19:00', '20:00', '21:00']
    },
    { 
      id: 2, 
      name: 'El Marino', 
      cuisine: 'Mariscos', 
      rating: 5, 
      location: 'Playa', 
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
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
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      address: 'Calle Italia 789, Santiago',
      capacity: 40,
      availableHours: ['12:30', '13:30', '19:30', '20:30']
    },
    { 
      id: 4, 
      name: 'Tacos y Más', 
      cuisine: 'Mexicana', 
      rating: 3, 
      location: 'Sur', 
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      address: 'Av. México 321, Santiago',
      capacity: 30,
      availableHours: ['13:00', '14:00', '20:00', '21:00', '22:00']
    },
    { 
      id: 5, 
      name: 'Sushi Express', 
      cuisine: 'Japonesa', 
      rating: 5, 
      location: 'Centro', 
      image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      address: 'Calle Japón 567, Santiago',
      capacity: 50,
      availableHours: ['12:00', '13:00', '19:00', '20:00', '21:00']
    },
    { 
      id: 6, 
      name: 'Veggie Garden', 
      cuisine: 'Vegetariana', 
      rating: 4, 
      location: 'Este', 
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      address: 'Av. Las Condes 890, Santiago',
      capacity: 45,
      availableHours: ['12:00', '13:00', '14:00', '19:00', '20:00']
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
    
    // Filtro por término de búsqueda (nombre o ubicación)
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      results = results.filter(restaurant => 
        restaurant.name.toLowerCase().includes(term) ||
        restaurant.location.toLowerCase().includes(term) ||
        restaurant.address.toLowerCase().includes(term)
      );
    }
    
    // Filtro por tipo de cocina
    if (this.selectedCuisine) {
      results = results.filter(restaurant => 
        restaurant.cuisine === this.selectedCuisine
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
