import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Statistic {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  change?: number;
}

interface ReservationStats {
  day: string;
  count: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  restaurantName: string = 'La Parrilla';
  currentMonth: string = 'Junio 2025';
  stats: Statistic[] = [];
  recentReservations: any[] = [];
  weeklyStats: ReservationStats[] = [];
  
  ngOnInit(): void {
    this.initStats();
    this.initRecentReservations();
    this.initWeeklyStats();
  }
  
  initStats(): void {
    this.stats = [
      {
        title: 'Reservas del mes',
        value: 145,
        icon: 'calendar-check',
        color: 'primary',
        change: 12.5
      },
      {
        title: 'Ocupación media',
        value: '78%',
        icon: 'people',
        color: 'success',
        change: 4.2
      },
      {
        title: 'Cancelaciones',
        value: 8,
        icon: 'x-circle',
        color: 'danger',
        change: -2.5
      },
      {
        title: 'Valoración media',
        value: '4.8',
        icon: 'star',
        color: 'warning',
        change: 0.3
      }
    ];
  }
  
  initRecentReservations(): void {
    this.recentReservations = [
      {
        id: 1,
        clientName: 'Carlos Rodríguez',
        date: '2025-06-02',
        time: '20:00',
        people: 4,
        status: 'confirmed'
      },
      {
        id: 2,
        clientName: 'María González',
        date: '2025-06-02',
        time: '13:00',
        people: 2,
        status: 'confirmed'
      },
      {
        id: 3,
        clientName: 'Juan Pérez',
        date: '2025-06-01',
        time: '21:00',
        people: 6,
        status: 'completed'
      },
      {
        id: 4,
        clientName: 'Ana Martínez',
        date: '2025-06-03',
        time: '19:30',
        people: 3,
        status: 'confirmed'
      }
    ];
  }
  
  initWeeklyStats(): void {
    this.weeklyStats = [
      { day: 'Lunes', count: 12 },
      { day: 'Martes', count: 18 },
      { day: 'Miércoles', count: 15 },
      { day: 'Jueves', count: 22 },
      { day: 'Viernes', count: 30 },
      { day: 'Sábado', count: 38 },
      { day: 'Domingo', count: 10 }
    ];
  }
  
  getStatusClass(status: string): string {
    switch(status) {
      case 'confirmed': return 'text-success';
      case 'cancelled': return 'text-danger';
      case 'completed': return 'text-primary';
      default: return '';
    }
  }
  
  getStatusText(status: string): string {
    switch(status) {
      case 'confirmed': return 'Confirmada';
      case 'cancelled': return 'Cancelada';
      case 'completed': return 'Completada';
      default: return status;
    }
  }
  
  getBarHeight(count: number): string {
    const maxCount = Math.max(...this.weeklyStats.map(stat => stat.count));
    const percentage = (count / maxCount) * 100;
    return `${percentage}%`;
  }
}
