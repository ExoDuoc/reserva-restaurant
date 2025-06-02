import { Component, OnInit } from '@angular/core';

interface Reservation {
  id: number;
  clientName: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  people: number;
  status: 'confirmed' | 'cancelled' | 'completed';
}

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];
  statusFilter: string = 'all';
  editingReservation: Reservation | null = null;
  showEditModal: boolean = false;
  
  // Datos temporales para la edición de reserva
  editFormData: {
    date: string;
    time: string;
    people: number;
    status: 'confirmed' | 'cancelled' | 'completed';
  } = {
    date: '',
    time: '',
    people: 1,
    status: 'confirmed'
  };
  
  // Opciones de hora para el formulario de edición
  timeOptions: string[] = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ];
  
  ngOnInit(): void {
    // Simular carga de datos desde un servicio
    this.loadReservations();
    this.applyFilters();
  }
  
  loadReservations(): void {
    // Datos de ejemplo
    this.reservations = [
      {
        id: 1,
        clientName: 'Carlos Rodríguez',
        email: 'carlos@ejemplo.com',
        phone: '+56 9 1234 5678',
        date: '2025-06-02',
        time: '20:00',
        people: 4,
        status: 'confirmed'
      },
      {
        id: 2,
        clientName: 'María González',
        email: 'maria@ejemplo.com',
        date: '2025-06-02',
        time: '13:00',
        people: 2,
        status: 'confirmed'
      },
      {
        id: 3,
        clientName: 'Juan Pérez',
        email: 'juan@ejemplo.com',
        phone: '+56 9 8765 4321',
        date: '2025-06-01',
        time: '21:00',
        people: 6,
        status: 'completed'
      },
      {
        id: 4,
        clientName: 'Ana Martínez',
        email: 'ana@ejemplo.com',
        date: '2025-06-03',
        time: '19:30',
        people: 3,
        status: 'confirmed'
      },
      {
        id: 5,
        clientName: 'Pedro Sánchez',
        email: 'pedro@ejemplo.com',
        phone: '+56 9 2468 1357',
        date: '2025-06-01',
        time: '14:00',
        people: 2,
        status: 'cancelled'
      }
    ];
  }
  
  applyFilters(): void {
    if (this.statusFilter === 'all') {
      this.filteredReservations = [...this.reservations];
    } else {
      this.filteredReservations = this.reservations.filter(
        reservation => reservation.status === this.statusFilter
      );
    }
    
    // Ordenar por fecha y hora
    this.filteredReservations.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  }
  
  changeStatusFilter(status: string): void {
    this.statusFilter = status;
    this.applyFilters();
  }
  
  editReservation(reservation: Reservation): void {
    this.editingReservation = {...reservation};
    this.editFormData = {
      date: reservation.date,
      time: reservation.time,
      people: reservation.people,
      status: reservation.status
    };
    this.showEditModal = true;
  }
  
  cancelReservation(reservation: Reservation): void {
    if (confirm(`¿Está seguro que desea cancelar la reserva de ${reservation.clientName}?`)) {
      // En un caso real, se enviaría una solicitud al servidor
      const index = this.reservations.findIndex(r => r.id === reservation.id);
      if (index !== -1) {
        this.reservations[index].status = 'cancelled';
        this.applyFilters();
      }
    }
  }
  
  saveReservationChanges(): void {
    if (this.editingReservation) {
      // En un caso real, se enviaría una solicitud al servidor
      const index = this.reservations.findIndex(r => r.id === this.editingReservation!.id);
      if (index !== -1) {
        this.reservations[index] = {
          ...this.reservations[index],
          date: this.editFormData.date,
          time: this.editFormData.time,
          people: this.editFormData.people,
          status: this.editFormData.status
        };
        
        this.closeEditModal();
        this.applyFilters();
      }
    }
  }
  
  closeEditModal(): void {
    this.showEditModal = false;
    this.editingReservation = null;
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'cancelled': return 'status-cancelled';
      case 'completed': return 'status-completed';
      default: return '';
    }
  }
  
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}
