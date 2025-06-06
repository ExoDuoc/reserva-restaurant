import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  restaurantName: string = 'La Parrilla';
  
  menuItems: MenuItem[] = [
    { title: 'Dashboard', route: '/admin/dashboard', icon: 'speedometer2' },
    { title: 'Reservas', route: '/admin/reservas', icon: 'calendar-check' },
    { title: 'Disponibilidad', route: '/admin/disponibilidad', icon: 'clock' },
    { title: 'Perfil', route: '/admin/perfil', icon: 'person-circle' }
  ];

  isActive(route: string): boolean {
    return window.location.pathname === route;
  }
}
