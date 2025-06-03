import { Component, OnInit } from '@angular/core';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface DayAvailability {
  day: string;
  dayNumber: number;
  isOpen: boolean;
  slots: TimeSlot[];
}

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {
  weekdays: DayAvailability[] = [];
  allTimes: string[] = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00'
  ];
  
  capacity: number = 40;
  maxReservationsPerSlot: number = 8;
  currentMonth: string = 'Junio 2025';
  showSuccessAlert: boolean = false;
  showSuccessMessage: boolean = false;
  selectedDay: DayAvailability | null = null;
  editingHours: boolean = false;
  dayConfiguration: { isOpen: boolean } = { isOpen: true };
  regularClosingDays: string[] = ['domingo'];

  ngOnInit(): void {
    this.initializeWeekdays();
    // Inicializar el día seleccionado
    if (this.weekdays.length > 0) {
      this.selectedDay = this.weekdays[0];
    }
  }

  // Método para guardar la configuración general
  saveGeneralSettings(): void {
    // Implementación de guardar configuración
    this.showSuccessMessage = true;
    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  initializeWeekdays(): void {
    const days = [
      { day: 'Lunes', dayNumber: 1, isOpen: true },
      { day: 'Martes', dayNumber: 2, isOpen: true },
      { day: 'Miércoles', dayNumber: 3, isOpen: true },
      { day: 'Jueves', dayNumber: 4, isOpen: true },
      { day: 'Viernes', dayNumber: 5, isOpen: true },
      { day: 'Sábado', dayNumber: 6, isOpen: true },
      { day: 'Domingo', dayNumber: 0, isOpen: false }
    ];

    // Inicializar todos los días con slots estándar
    this.weekdays = days.map(day => {
      return {
        ...day,
        slots: this.getDefaultSlotsForDay(day.dayNumber)
      };
    });
  }

  getDefaultSlotsForDay(dayNumber: number): TimeSlot[] {
    // Para viernes y sábados tenemos horario extendido
    const isWeekend = dayNumber === 5 || dayNumber === 6;
    // Los domingos están cerrados
    const isSunday = dayNumber === 0;
    
    if (isSunday) {
      return this.allTimes.map(time => ({ time, available: false }));
    }

    return this.allTimes.map(time => {
      // Horario de almuerzo: todos los días
      const isLunchTime = time >= '12:00' && time <= '15:00';
      // Horario de cena: todos los días excepto domingo
      const isDinnerTime = time >= '19:00' && time <= '23:00';

      // Horario extendido para viernes y sábados
      const isLateNight = time >= '22:00';
      const available = isLunchTime || (isDinnerTime && (!isLateNight || isWeekend));

      return { time, available };
    });
  }

  toggleDayOpenStatus(day: DayAvailability): void {
    day.isOpen = !day.isOpen;
    
    // Si el día está cerrado, todos los slots están no disponibles
    if (!day.isOpen) {
      day.slots.forEach(slot => {
        slot.available = false;
      });
    } else {
      // Si el día está abierto, restaurar horarios por defecto
      day.slots = this.getDefaultSlotsForDay(day.dayNumber);
    }
  }

  editHours(day: DayAvailability): void {
    this.selectedDay = JSON.parse(JSON.stringify(day)); // Clonar para editar
    this.editingHours = true;
  }

  toggleTimeSlot(slot: TimeSlot): void {
    if (this.selectedDay) {
      slot.available = !slot.available;
    }
  }

  saveHoursChanges(): void {
    if (this.selectedDay) {
      // Encontrar el día correspondiente y actualizar sus slots
      const index = this.weekdays.findIndex(d => d.dayNumber === this.selectedDay!.dayNumber);
      if (index !== -1) {
        this.weekdays[index].slots = [...this.selectedDay.slots];
      }
      this.cancelHoursEdit();
      this.showSuccessAlert = true;
      setTimeout(() => {
        this.showSuccessAlert = false;
      }, 3000);
    }
  }

  cancelHoursEdit(): void {
    this.editingHours = false;
    this.selectedDay = null;
  }

  updateCapacity(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.capacity = parseInt(input.value, 10) || 0;
  }

  updateMaxReservations(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.maxReservationsPerSlot = parseInt(input.value, 10) || 0;
  }

  getDayClass(day: DayAvailability): string {
    if (!day.isOpen) {
      return 'day-closed';
    }
    return 'day-open';
  }

  getAvailableSlotsCount(day: DayAvailability): number {
    return day.slots.filter(slot => slot.available).length;
  }

  getTimeSlotClass(slot: TimeSlot): string {
    return slot.available ? 'time-slot-available' : 'time-slot-unavailable';
  }

  saveAllChanges(): void {
    // En una aplicación real, aquí enviaríamos los cambios al servidor
    this.showSuccessAlert = true;
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 3000);
  }
}
