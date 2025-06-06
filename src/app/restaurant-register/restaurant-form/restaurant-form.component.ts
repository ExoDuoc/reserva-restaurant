import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.scss']
})
export class RestaurantFormComponent implements OnInit {
  restaurantForm!: FormGroup;
  submitted = false;
  loading = false;

  // Opciones para los select
  categories = [
    'Chilena',
    'Parrilladas',
    'Vegana',
    'Italiana',
    'China',
    'Japonesa',
    'Mexicana',
    'Comida Rápida',
    'Mariscos',
    'Otro'
  ];

  locations = [
    'Providencia',
    'Las Condes',
    'Ñuñoa',
    'Santiago Centro',
    'Vitacura',
    'La Reina',
    'Maipú',
    'La Florida',
    'Puente Alto',
    'Otra comuna'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    // Cualquier inicialización adicional puede ir aquí
  }

  private initializeForm(): void {
    this.restaurantForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(100)
      ]),
      category: new FormControl('', Validators.required),
      description: new FormControl('', [
        Validators.required, 
        Validators.minLength(20), 
        Validators.maxLength(500)
      ]),
      address: new FormControl('', [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(200)
      ]),
      location: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.required, 
        Validators.pattern('^[0-9+\-\s()]*$')
      ]),
      email: new FormControl('', [
        Validators.required, 
        Validators.email
      ]),
      capacity: new FormControl('', [
        Validators.required, 
        Validators.min(1), 
        Validators.max(1000)
      ])
    });
  }

  // Convenience getter for easy access to form fields
  get formControls() { 
    return this.restaurantForm.controls; 
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    console.log('Iniciando envío del formulario');
    this.submitted = true;

    // Marcar todos los controles como tocados para mostrar los mensajes de error
    this.markFormGroupTouched(this.restaurantForm);

    // Detener si el formulario es inválido
    if (this.restaurantForm.invalid) {
      console.warn('Formulario inválido', this.getFormValidationErrors());
      this.scrollToFirstInvalidControl();
      return;
    }

    this.loading = true;
    
    // Aquí iría la lógica para enviar los datos al servidor
    console.log('Datos del formulario a enviar:', this.restaurantForm.value);
    
    // Simulamos un envío al servidor
    setTimeout(() => {
      this.loading = false;
      
      // Mostrar mensaje de éxito
      alert('¡Restaurante registrado exitosamente!');
      
      // Redirigir al inicio después de registrar
      this.router.navigate(['/']);
    }, 1500);
  }

  /**
   * Marca todos los controles de un FormGroup como tocados
   * @param formGroup - El FormGroup a marcar
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  /**
   * Obtiene los errores de validación del formulario
   */
  private getFormValidationErrors(): { [key: string]: any } {
    const result: { [key: string]: any } = {};
    Object.keys(this.formControls).forEach(key => {
      const control = this.formControls[key];
      if (control.errors) {
        result[key] = control.errors;
      }
    });
    return result;
  }

  /**
   * Desplaza la vista al primer control con error
   */
  private scrollToFirstInvalidControl(): void {
    const firstInvalidControl = document.querySelector('.ng-invalid');
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      // Enfocar el primer control inválido
      (firstInvalidControl as HTMLElement).focus();
    }
  }
}
