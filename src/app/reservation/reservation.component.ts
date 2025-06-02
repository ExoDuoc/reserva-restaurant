import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  reservationForm: FormGroup;
  restaurant: Restaurant | null = null;
  availableHours: string[] = [];
  selectedDate: Date = new Date();
  minDate = new Date();
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 2));
  showConfirmation = false;
  personOptions = Array.from({length: 10}, (_, i) => i + 1);
  formSubmitted = false;
  
  // Para mostrar los días disponibles (demo - todos excepto domingos)
  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;
    const day = date.getDay();
    // Excluir domingo (0)
    return day !== 0;
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.reservationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      date: [this.selectedDate, Validators.required],
      time: ['', Validators.required],
      people: [2, Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtener el id del restaurante de los parámetros de la ruta
    const restaurantId = this.route.snapshot.paramMap.get('id');
    
    if (restaurantId) {
      // En un escenario real, obtendríamos el restaurante de un servicio
      // Por ahora simulamos con datos de ejemplo
      this.getRestaurantData(Number(restaurantId));
    } else {
      this.router.navigate(['/buscar']);
    }
  }
  
  getRestaurantData(id: number): void {
    // Simulación de obtención de datos - En un caso real, usaríamos un servicio
    const mockRestaurants: Restaurant[] = [
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
    
    this.restaurant = mockRestaurants.find(r => r.id === id) || null;
    
    if (this.restaurant) {
      this.availableHours = [...this.restaurant.availableHours];
    }
  }
  
  onDateChange(event: any): void {
    // En un caso real, podríamos consultar la disponibilidad de horas para la fecha seleccionada
    // Aquí simplemente usamos las horas predefinidas del restaurante
    if (this.restaurant) {
      this.availableHours = [...this.restaurant.availableHours];
      
      // Simulamos que algunos horarios ya no están disponibles en ciertos días
      const dayOfWeek = event.value.getDay();
      if (dayOfWeek === 5 || dayOfWeek === 6) { // Viernes o sábado
        // Removemos algunos horarios para simular menor disponibilidad
        this.availableHours = this.availableHours.filter((_, index) => index % 2 === 0);
      }
    }
  }
  
  submitReservation(): void {
    this.formSubmitted = true;
    
    if (this.reservationForm.valid && this.restaurant) {
      // En un caso real, enviaríamos los datos a un servicio
      console.log('Reserva realizada:', {
        restaurant: this.restaurant.name,
        ...this.reservationForm.value
      });
      
      this.showConfirmation = true;
      
      // Resetear el formulario después de 5 segundos y redirigir
      setTimeout(() => {
        this.showConfirmation = false;
        this.formSubmitted = false;
        this.reservationForm.reset({
          date: new Date(),
          people: 2
        });
        this.router.navigate(['/']);
      }, 5000);
    }
  }
  
  get nameControl() { return this.reservationForm.get('name'); }
  get emailControl() { return this.reservationForm.get('email'); }
  get dateControl() { return this.reservationForm.get('date'); }
  get timeControl() { return this.reservationForm.get('time'); }
  get peopleControl() { return this.reservationForm.get('people'); }
}
