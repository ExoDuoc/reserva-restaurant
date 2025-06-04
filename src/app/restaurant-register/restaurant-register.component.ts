import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Schedule {
  day: string;
  open: boolean;
  openTime: string;
  closeTime: string;
}

@Component({
  selector: 'app-restaurant-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './restaurant-register.component.html',
  styleUrls: ['./restaurant-register.component.scss']
})
export class RestaurantRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  logoPreview: string | null = null;
  weekDays: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  scheduleForm!: FormGroup;
  formSubmitted = false;
  
  // Opciones para selects
  cuisineTypes: string[] = [
    'Comida Chilena Tradicional',
    'Mariscos y Pescados (cocina costera)',
    'Comida Internacional',
    'Parrilladas y Carnes a la brasa',
    'Vegetariana / Vegana',
    'Italiana',
    'Mexicana',
    'Japonesa'
  ];
  
  priceRanges: {value: string, label: string}[] = [
    {value: 'economic', label: 'Económico'},
    {value: 'moderate', label: 'Moderado'},
    {value: 'expensive', label: 'Premium'}
  ];
  
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.initForm();
    this.initScheduleForm();
  }
  
  initForm(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[+0-9\\s]+')]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      cuisine: ['', [Validators.required]],
      priceRange: ['moderate', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      contactName: ['', [Validators.required]],
      contactEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }
  
  initScheduleForm(): void {
    const scheduleControls: {[key: string]: any} = {};
    
    this.weekDays.forEach(day => {
      scheduleControls[`${day}_open`] = [true];
      scheduleControls[`${day}_openTime`] = ['10:00'];
      scheduleControls[`${day}_closeTime`] = ['22:00'];
    });
    
    // Por defecto, domingo cerrado
    scheduleControls['Domingo_open'] = [false];
    
    this.scheduleForm = this.fb.group(scheduleControls);
  }
  
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    if (password && confirmPassword && password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    
    return null;
  }
  
  onLogoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    
    if (file) {
      // Validamos que sea una imagen
      if (!file.type.includes('image')) {
        alert('Por favor, selecciona un archivo de imagen válido.');
        return;
      }
      
      // Tamaño máximo 2MB
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen no debe superar los 2MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  
  resetLogoPreview(): void {
    this.logoPreview = null;
    // También resetear el input file
    const fileInput = document.getElementById('logo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
  
  onSubmit(): void {
    this.formSubmitted = true;
    
    if (this.registerForm.valid && this.scheduleForm.valid) {
      // Combinar la información del formulario principal y el horario
      const formData = {
        ...this.registerForm.value,
        logo: this.logoPreview,
        schedule: this.getScheduleData()
      };
      
      console.log('Restaurant registration data:', formData);
      
      // Aquí se enviarían los datos al backend
      // Por ahora, simulamos un registro exitoso
      setTimeout(() => {
        alert('¡Registro exitoso! Serás redirigido al panel de administración.');
        this.router.navigate(['/admin']);
      }, 1000);
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }
  
  getScheduleData(): Schedule[] {
    return this.weekDays.map(day => {
      return {
        day,
        open: this.scheduleForm.get(`${day}_open`)?.value,
        openTime: this.scheduleForm.get(`${day}_openTime`)?.value,
        closeTime: this.scheduleForm.get(`${day}_closeTime`)?.value
      };
    });
  }
  
  // Utilidad para marcar todos los campos como touched para mostrar validaciones
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
  
  // Getters para validaciones
  get nameInvalid() { return this.registerForm.get('name')?.invalid && this.registerForm.get('name')?.touched; }
  get emailInvalid() { return this.registerForm.get('email')?.invalid && this.registerForm.get('email')?.touched; }
  get phoneInvalid() { return this.registerForm.get('phone')?.invalid && this.registerForm.get('phone')?.touched; }
  get addressInvalid() { return this.registerForm.get('address')?.invalid && this.registerForm.get('address')?.touched; }
  get cityInvalid() { return this.registerForm.get('city')?.invalid && this.registerForm.get('city')?.touched; }
  get zipCodeInvalid() { return this.registerForm.get('zipCode')?.invalid && this.registerForm.get('zipCode')?.touched; }
  get cuisineInvalid() { return this.registerForm.get('cuisine')?.invalid && this.registerForm.get('cuisine')?.touched; }
  get descriptionInvalid() { return this.registerForm.get('description')?.invalid && this.registerForm.get('description')?.touched; }
  get contactNameInvalid() { return this.registerForm.get('contactName')?.invalid && this.registerForm.get('contactName')?.touched; }
  get contactEmailInvalid() { return this.registerForm.get('contactEmail')?.invalid && this.registerForm.get('contactEmail')?.touched; }
  get passwordInvalid() { return this.registerForm.get('password')?.invalid && this.registerForm.get('password')?.touched; }
  get confirmPasswordInvalid() { return this.registerForm.get('confirmPassword')?.invalid && this.registerForm.get('confirmPassword')?.touched; }
  get passwordMismatch() { return this.registerForm.get('confirmPassword')?.hasError('mismatch') && this.registerForm.get('confirmPassword')?.touched; }
}
