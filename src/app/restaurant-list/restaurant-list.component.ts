import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { RestaurantService } from '../core/services/api/restaurant.service';
import { Restaurant, RestaurantFilters } from '../core/models/restaurant.model';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NgbRatingModule, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RestaurantDetailsModalComponent } from './restaurant-details-modal';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    NgbRatingModule,
    NgbModule,
    FormsModule,
    NgClass,
    NgIf,
    RestaurantDetailsModalComponent
  ],
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  // Listas
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  
  // Filtros
  filtros: RestaurantFilters = {
    searchTerm: '',
    category: 'all',
    location: 'all',
    partySize: 2,
    showAvailableOnly: true
  };
  
  // Listas de opciones para los filtros
  readonly categories: string[] = ['Comida rápida', 'Italiana', 'Asiática', 'Mariscos', 'Carnes', 'Vegana', 'Japonesa', 'Mexicana'];
  readonly locations: string[] = ['Santiago Centro', 'Providencia', 'Las Condes', 'Ñuñoa', 'Vitacura', 'La Reina'];
  
  // Estados
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.loading = true;
    this.error = null;
    
    // En una aplicación real, esto vendría de un servicio HTTP
    setTimeout(() => {
      try {
        // Datos de ejemplo - en producción, esto vendría de tu API
        this.restaurants = [
          {
            id: 1,
            name: 'Restaurante La Casona',
            imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            rating: 4.5,
            category: 'Comida rápida',
            cuisineType: 'Comida rápida',
            address: 'Calle Principal 123',
            location: 'Santiago Centro',
            phone: '+56 9 1234 5678',
            email: 'contacto@lacasona.cl',
            capacity: 50,
            maxCapacity: 8,
            description: 'Excelente lugar para disfrutar de comidas rápidas y deliciosas en un ambiente familiar y acogedor.',
            available: true,
            priceRange: '$$',
            openingHours: 'Lun-Vie: 12:00 - 23:00',
            availableHours: ['12:00', '13:00', '14:00', '20:00', '21:00', '22:00']
          },
          {
            id: 2,
            name: 'Sabores Italianos',
            imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            rating: 4.8,
            category: 'Italiana',
            cuisineType: 'Italiana',
            address: 'Avenida Italia 456',
            location: 'Providencia',
            phone: '+56 9 2345 6789',
            email: 'info@saboresitalianos.cl',
            capacity: 80,
            maxCapacity: 10,
            description: 'Auténtica cocina italiana en el corazón de la ciudad. Pastas caseras y pizzas al horno de leña.',
            available: true,
            priceRange: '$$$',
            openingHours: 'Lun-Dom: 12:00 - 00:00',
            availableHours: ['12:00', '13:30', '15:00', '20:00', '21:30', '22:30']
          },
          {
            id: 3,
            name: 'Sabores del Oriente',
            imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            rating: 4.3,
            category: 'Asiática',
            cuisineType: 'Asiática',
            address: 'Calle Oriente 789',
            location: 'Las Condes',
            phone: '+56 9 3456 7890',
            email: 'contacto@saboresoriente.cl',
            capacity: 45,
            maxCapacity: 6,
            description: 'Sabores exóticos del lejano oriente en cada plato. Especialistas en sushi y comida tailandesa.',
            available: false,
            priceRange: '$$',
            openingHours: 'Mar-Dom: 12:30 - 23:30',
            availableHours: []
          },
          {
            id: 4,
            name: 'Mar y Sazón',
            imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            rating: 4.7,
            category: 'Mariscos',
            cuisineType: 'Mariscos',
            address: 'Costanera 1011',
            location: 'Vitacura',
            phone: '+56 9 4567 8901',
            email: 'reservas@marysazon.cl',
            capacity: 60,
            maxCapacity: 12,
            description: 'Los mejores mariscos frescos directamente del mar a tu mesa. Especialistas en pescados y mariscos.',
            available: true,
            priceRange: '$$$',
            openingHours: 'Lun-Sáb: 12:00 - 23:30',
            availableHours: ['12:30', '14:00', '15:30', '20:00', '21:30']
          },
          {
            id: 5,
            name: 'El Asador',
            imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            rating: 4.9,
            category: 'Carnes',
            cuisineType: 'Parrilla',
            address: 'Camino Real 1213',
            phone: '+56 9 5678 9012',
            email: 'contacto@elasador.cl',
            capacity: 70,
            description: 'Carnes a la parrilla con el mejor sabor y calidad.',
            available: true,
            priceRange: '$$$'
          },
          {
            id: 6,
            name: 'Verde Vida',
            imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            rating: 4.6,
            category: 'Vegano',
            cuisineType: 'Vegetariano/Vegano',
            address: 'Calle Ecológica 1415',
            phone: '+56 9 6789 0123',
            email: 'hola@verdevida.cl',
            capacity: 40,
            description: 'Deliciosa comida vegana preparada con ingredientes orgánicos.',
            available: true,
            priceRange: '$$'
          }
        ];
        
        this.applyFilters();
        this.loading = false;
      } catch (err) {
        console.error('Error loading restaurants:', err);
        this.error = 'Error al cargar los restaurantes. Por favor, intente nuevamente.';
        this.loading = false;
      }
    }, 1000);
  }

  /**
   * Aplica todos los filtros a la lista de restaurantes
   */
  /**
   * Aplica todos los filtros a la lista de restaurantes
   */
  applyFilters(): void {
    this.filteredRestaurants = this.restaurants.filter(restaurant => {
      // Filtro por término de búsqueda
      const searchTerm = this.filtros.searchTerm?.toLowerCase() || '';
      const matchesSearch = !searchTerm ||
        restaurant.name.toLowerCase().includes(searchTerm) ||
        restaurant.description.toLowerCase().includes(searchTerm) ||
        restaurant.cuisineType.toLowerCase().includes(searchTerm) ||
        (restaurant.location && restaurant.location.toLowerCase().includes(searchTerm));
      
      // Filtro por categoría
      const matchesCategory = this.filtros.category === 'all' || 
        restaurant.category === this.filtros.category;
      
      // Filtro por ubicación
      const matchesLocation = this.filtros.location === 'all' ||
        (restaurant.location && restaurant.location === this.filtros.location);
      
      // Filtro por capacidad
      const matchesCapacity = !this.filtros.partySize || 
        (restaurant.maxCapacity && restaurant.maxCapacity >= this.filtros.partySize);
      
      // Filtro por disponibilidad
      const matchesAvailability = !this.filtros.showAvailableOnly || restaurant.available;
      
      return matchesSearch && matchesCategory && matchesLocation && 
             matchesCapacity && matchesAvailability;
    });
  }

  /**
   * Verifica si hay filtros activos
   */
  /**
   * Verifica si hay filtros activos
   */
  hasActiveFilters(): boolean {
    return this.filtros.searchTerm !== '' || 
           this.filtros.category !== 'all' || 
           this.filtros.location !== 'all' ||
           (this.filtros.partySize || 0) > 2 ||
           this.filtros.showAvailableOnly;
  }

  /**
   * Limpia todos los filtros
   */
  /**
   * Limpia todos los filtros
   */
  clearAllFilters(): void {
    this.filtros = {
      searchTerm: '',
      category: 'all',
      location: 'all',
      partySize: 2,
      showAvailableOnly: true
    };
    this.applyFilters();
  }

  /**
   * Limpia un filtro específico
   */
  /**
   * Limpia un filtro específico
   * @param filterName Nombre del filtro a limpiar
   */
  clearFilter(filterName: keyof RestaurantFilters): void {
    switch (filterName) {
      case 'searchTerm':
        this.filtros.searchTerm = '';
        break;
      case 'category':
        this.filtros.category = 'all';
        break;
      case 'location':
        this.filtros.location = 'all';
        break;
      case 'partySize':
        this.filtros.partySize = 2;
        break;
      case 'showAvailableOnly':
        this.filtros.showAvailableOnly = true;
        break;
    }
    this.applyFilters();
  }

  /**
   * Muestra el modal con los detalles del restaurante
   */
  viewRestaurantDetails(restaurant: Restaurant): void {
    const modalRef = this.modalService.open(RestaurantDetailsModalComponent, { size: 'lg' });
    modalRef.componentInstance.restaurant = restaurant;
  }

  /**
   * Maneja la búsqueda
   */
  onSearchChange(): void {
    this.applyFilters();
  }

  /**
   * Maneja el cambio de categoría
   */
  onCategoryChange(): void {
    this.applyFilters();
  }
}
