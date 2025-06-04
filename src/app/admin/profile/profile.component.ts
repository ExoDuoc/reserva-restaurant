import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface RestaurantProfile {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  cuisine: string;
  priceRange: string;
}

interface AdminProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  password?: string;
  confirmPassword?: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  activeTab: 'restaurant' | 'admin' | 'settings' = 'restaurant';
  restaurantForm!: FormGroup;
  adminForm!: FormGroup;
  settingsForm!: FormGroup;
  showSuccessAlert: boolean = false;
  
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
  
  constructor(private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.initForms();
  }
  
  initForms(): void {
    // Formulario de perfil del restaurante
    this.restaurantForm = this.fb.group({
      name: ['La Parrilla', [Validators.required, Validators.minLength(3)]],
      description: ['Restaurante especializado en carnes a la parrilla con los mejores cortes nacionales e importados. Ambiente acogedor y servicio personalizado.', [Validators.required]],
      address: ['Calle Principal 123, Ciudad', [Validators.required]],
      phone: ['+34 91 123 4567', [Validators.required, Validators.pattern('[+0-9\\s]+')]],
      email: ['info@laparrilla.com', [Validators.required, Validators.email]],
      website: ['www.laparrilla.com', []],
      cuisine: ['Steakhouse', [Validators.required]],
      priceRange: ['moderate', [Validators.required]]
    });
    
    // Formulario de perfil del administrador
    this.adminForm = this.fb.group({
      name: ['Admin Usuario', [Validators.required]],
      email: ['admin@laparrilla.com', [Validators.required, Validators.email]],
      phone: ['+34 91 123 4567', [Validators.pattern('[+0-9\\s]+')]],
      role: ['Gerente', [Validators.required]],
      password: ['', [Validators.minLength(8)]],
      confirmPassword: ['', []]
    }, { validator: this.passwordMatchValidator });
    
    // Formulario de configuración
    this.settingsForm = this.fb.group({
      allowSmsNotifications: [true, []],
      allowEmailNotifications: [true, []],
      autoConfirmReservations: [false, []],
      defaultTimeSlotDuration: [60, [Validators.required, Validators.min(15)]],
      maxDaysInAdvance: [30, [Validators.required, Validators.min(1)]]
    });
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
  
  setActiveTab(tab: 'restaurant' | 'admin' | 'settings'): void {
    this.activeTab = tab;
  }
  
  saveRestaurantProfile(): void {
    if (this.restaurantForm.valid) {
      console.log('Restaurant profile saved:', this.restaurantForm.value);
      this.showSuccessMessage();
    } else {
      this.markFormGroupTouched(this.restaurantForm);
    }
  }
  
  saveAdminProfile(): void {
    if (this.adminForm.valid) {
      console.log('Admin profile saved:', this.adminForm.value);
      this.showSuccessMessage();
    } else {
      this.markFormGroupTouched(this.adminForm);
    }
  }
  
  saveSettings(): void {
    if (this.settingsForm.valid) {
      console.log('Settings saved:', this.settingsForm.value);
      this.showSuccessMessage();
    } else {
      this.markFormGroupTouched(this.settingsForm);
    }
  }
  
  showSuccessMessage(): void {
    this.showSuccessAlert = true;
    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 3000);
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
  
  // Getters para verificación de errores en formularios
  get restaurantNameInvalid() { return this.restaurantForm.get('name')?.invalid && this.restaurantForm.get('name')?.touched; }
  get restaurantEmailInvalid() { return this.restaurantForm.get('email')?.invalid && this.restaurantForm.get('email')?.touched; }
  get adminEmailInvalid() { return this.adminForm.get('email')?.invalid && this.adminForm.get('email')?.touched; }
  get passwordMismatch() { return this.adminForm.get('confirmPassword')?.hasError('mismatch') && this.adminForm.get('confirmPassword')?.touched; }
}
