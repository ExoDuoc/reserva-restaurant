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
  // Días de la semana
  weekDays = [
    { id: 'lunes', name: 'Lunes' },
    { id: 'martes', name: 'Martes' },
    { id: 'miercoles', name: 'Miércoles' },
    { id: 'jueves', name: 'Jueves' },
    { id: 'viernes', name: 'Viernes' },
    { id: 'sabado', name: 'Sábado' },
    { id: 'domingo', name: 'Domingo' }
  ];

  // Horarios predefinidos para los selects
  hours: string[] = [];
  minutes = ['00', '15', '30', '45'];

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

  // Propiedades para manejar los horarios
  showDinnerTime = false;
  
  // Archivos seleccionados
  logoFile: File | null = null;
  featuredImageFile: File | null = null;
  logoPreview: string | ArrayBuffer | null = null;
  featuredImagePreview: string | ArrayBuffer | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.initializeForm();
    this.initializeHours();
  }

  ngOnInit(): void {
    // Cualquier inicialización adicional puede ir aquí
  }

  // Inicializa el array de horas (00:00 a 23:45)
  private initializeHours(): void {
    for (let h = 0; h < 24; h++) {
      for (let m of this.minutes) {
        this.hours.push(`${h.toString().padStart(2, '0')}:${m}`);
      }
    }
  }

  // Manejar la selección de archivos
  onFileSelected(event: Event, type: 'logo' | 'featured'): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (type === 'logo') {
        this.logoFile = file;
        this.logoPreview = reader.result;
      } else {
        this.featuredImageFile = file;
        this.featuredImagePreview = reader.result;
      }
    };

    reader.readAsDataURL(file);
  }

  // Verificar si las contraseñas coinciden
  passwordsMatch(): boolean {
    const password = this.restaurantForm?.get('accountInfo')?.get('password')?.value;
    const confirmPassword = this.restaurantForm?.get('accountInfo')?.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  private initializeForm(): void {
    // Crear FormGroup para los días de la semana
    const daysGroup = this.formBuilder.group({});
    this.weekDays.forEach(day => {
      daysGroup.addControl(day.id, new FormControl(false));
    });

    this.restaurantForm = this.formBuilder.group({
      // Información Básica del Restaurante
      restaurantInfo: this.formBuilder.group({
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
      }),


      // Horarios
      scheduleInfo: this.formBuilder.group({
        daysOpen: daysGroup,
        hasLunchService: [true],
        lunchStart: ['12:00'],
        lunchEnd: ['16:00'],
        hasDinnerService: [false],
        dinnerStart: ['19:00'],
        dinnerEnd: ['23:00']
      }),

      // Información de la Cuenta
      accountInfo: this.formBuilder.group({
        representativeName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$')
        ]),
        confirmPassword: new FormControl('', [
          Validators.required
        ])
      }, { validators: this.passwordMatchValidator })
    });

    // Mostrar/ocultar campos de cena según corresponda
    this.restaurantForm.get('hasDinnerService')?.valueChanges.subscribe(hasDinner => {
      this.showDinnerTime = hasDinner;
      const dinnerStart = this.restaurantForm.get('dinnerStart');
      const dinnerEnd = this.restaurantForm.get('dinnerEnd');

      if (hasDinner) {
        dinnerStart?.enable();
        dinnerEnd?.enable();
      } else {
        dinnerStart?.disable();
        dinnerEnd?.disable();
      }
    });
  }

  // Convenience getter for easy access to form fields
  get formControls() {
    return this.restaurantForm.controls;
  }

  // Getter para los controles de días
  get daysGroup() {
    return (this.restaurantForm.get('scheduleInfo.daysOpen') as FormGroup).controls;
  }

  // Validador personalizado para contraseñas
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Verifica si al menos un día está seleccionado
  hasSelectedDays(): boolean {
    const days = this.restaurantForm.get('scheduleInfo.daysOpen')?.value;
    return days ? Object.values(days).some(day => day === true) : false;
  }

  // Obtener el FormGroup de información del restaurante
  get restaurantInfo() {
    return this.restaurantForm.get('restaurantInfo') as FormGroup;
  }

  // Obtener el FormGroup de horarios
  get scheduleInfo() {
    return this.restaurantForm.get('scheduleInfo') as FormGroup;
  }

  // Obtener el FormGroup de información de la cuenta
  get accountInfo() {
    return this.restaurantForm.get('accountInfo') as FormGroup;
  }

  /**
   * Maneja el evento de cancelación del formulario
   */
  onCancel(): void {
    if (confirm('¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.')) {
      this.router.navigate(['/']);
    }
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    console.log('Iniciando envío del formulario');
    this.submitted = true;

    // Validar que al menos un día esté seleccionado
    if (!this.hasSelectedDays()) {
      this.restaurantForm.get('daysOpen')?.setErrors({ required: true });
    }

    // Detener aquí si el formulario es inválido
    if (this.restaurantForm.invalid) {
      // Marcar todos los controles como tocados para mostrar mensajes de error
      Object.values(this.restaurantForm.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(c => c.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
      return;
    }

    this.loading = true;

    // Preparar datos para enviar
    const formValue = {
      ...this.restaurantForm.value,
      daysOpen: Object.entries(this.restaurantForm.value.daysOpen)
        .filter(([_, value]) => value === true)
        .map(([key]) => key)
    };

    // Simular envío del formulario
    console.log('Formulario enviado:', formValue);
    this.loading = false;
    this.submitted = false;
    this.router.navigate(['/registro-exitoso']);
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
