import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Restaurant, TimeSlot } from '../../core/models/restaurant.model';

// Interfaz para las horas de apertura en formato legible
type OpeningHours = { [key: string]: { open: boolean, slots: TimeSlot[] } };

// Interfaz para el restaurante con tipos seguros para el modal
interface RestaurantDetails extends Omit<Restaurant, 'openingHours'> {
  openingHours?: string | OpeningHours;
}

@Component({
  selector: 'app-restaurant-details-modal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './restaurant-details-modal.component.html',
  styleUrls: ['./restaurant-details-modal.component.scss']
})
export class RestaurantDetailsModalComponent implements OnInit {
  @Input() restaurant: RestaurantDetails | null = null;
  
  // Propiedades para mostrar en la plantilla
  openingHoursText: string = 'No disponible';
  priceRangeText: string = 'No especificado';
  availableHoursList: string[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.restaurant) return;
    
    // Inicializar openingHoursText
    this.initializeOpeningHours();
    
    // Inicializar priceRangeText
    if (this.restaurant.priceRange) {
      this.priceRangeText = this.restaurant.priceRange;
    }
    
    // Inicializar availableHoursList
    if (Array.isArray(this.restaurant.availableHours) && this.restaurant.availableHours.length > 0) {
      this.availableHoursList = this.restaurant.availableHours;
    }
  }

  /**
   * Inicializa el texto de horarios de apertura
   */
  private initializeOpeningHours(): void {
    if (!this.restaurant?.openingHours) {
      this.openingHoursText = 'No disponible';
      return;
    }

    if (typeof this.restaurant.openingHours === 'string') {
      this.openingHoursText = this.restaurant.openingHours;
      return;
    }

    // Si es un objeto con horarios
    const hours = this.restaurant.openingHours as OpeningHours;
    this.openingHoursText = Object.entries(hours)
      .map(([day, schedule]) => {
        if (!schedule.open) return `${day}: Cerrado`;
        
        const slots = schedule.slots
          .filter(slot => slot.available)
          .map(slot => slot.time)
          .join(', ');
          
        return `${day}: ${slots || 'Sin horarios disponibles'}`;
      })
      .join('\n');
  }

  /**
   * Maneja la acción de reservar
   */
  /**
   * Obtiene el texto formateado para mostrar la capacidad del restaurante
   */
  getCapacityText(restaurant: RestaurantDetails): string {
    if (!restaurant) return 'No especificada';
    
    const capacity = restaurant.maxCapacity || restaurant.capacity;
    return capacity ? `Hasta ${capacity} personas` : 'No especificada';
  }

  reservar(restaurant: RestaurantDetails, hora: string): void {
    if (!restaurant) {
      console.error('No se puede hacer la reserva: restaurante no definido');
      return;
    }
    
    console.log(`Reservando en ${restaurant.name} a las ${hora}`);
    this.activeModal.close({ restaurant, hora });
  }

  navegarAReserva(restaurant: RestaurantDetails | null, event: Event): void {
    event.preventDefault();
    this.router.navigate(['/auth/login']).then(() => {
      this.activeModal.close('reserve');
    });
  }
}
