import { Component } from '@angular/core';

interface MenuItem {
  title: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-admin-layout',
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
