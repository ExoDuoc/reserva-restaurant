import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash, faUser, faLock, faEnvelope, faUtensils, faUserTie } from '@fortawesome/free-solid-svg-icons';

// Interfaz para el objeto de usuario
interface User {
  id: string;
  email: string;
  type: 'client' | 'restaurant';
  name: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    FontAwesomeModule
  ]
})
export class LoginComponent implements OnInit {
  // Iconos
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faUser = faUser;
  faLock = faLock;
  faEnvelope = faEnvelope;
  faUtensils = faUtensils;
  faUserTie = faUserTie;

  // Tipos de usuario disponibles
  userTypes: { 
    value: 'client' | 'restaurant', 
    label: string, 
    icon: string, 
    description: string 
  }[] = [
    { 
      value: 'client' as const, 
      label: 'Cliente', 
      icon: 'person',
      description: 'Busca y reserva en tus restaurantes favoritos'
    },
    { 
      value: 'restaurant' as const, 
      label: 'Restaurante', 
      icon: 'shop',
      description: 'Administra tu negocio y recibe reservas'
    }
  ];

  // Estado del formulario
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  hidePassword = true;
  errorMessage: string | null = null;
  selectedUserType: 'client' | 'restaurant' = 'client';
  isLoading = false; // Agregada propiedad faltante
  
  @Output() close = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });

    // Verificar si hay credenciales guardadas
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      try {
        const { email, rememberMe } = JSON.parse(rememberedUser);
        if (email) {
          this.loginForm.patchValue({ email, rememberMe });
        }
      } catch (e) {
        console.error('Error al cargar credenciales guardadas:', e);
      }
    }
  }

  ngOnInit(): void {
    // Verificar si hay un usuario autenticado
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      if (userData.type === 'client') {
        this.router.navigate(['/client/dashboard']);
      } else {
        this.router.navigate(['/restaurant/dashboard']);
      }
    }
  }

  // Getters para acceder a los controles del formulario
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  // Método para manejar el cierre del modal (si se usa como modal)
  onClose(): void {
    this.close.emit();
  }

  // Método para iniciar sesión con Google
  loginWithGoogle(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    // Simulación de autenticación con Google
    setTimeout(() => {
      this.isLoading = false;
      const user = {
        id: 'google-123',
        email: 'usuario@google.com',
        type: this.selectedUserType,
        name: 'Usuario Google'
      };
      this.handleLoginSuccess(user);
    }, 1000);
  }

  // Método para iniciar sesión con Facebook
  loginWithFacebook(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    // Simulación de autenticación con Facebook
    setTimeout(() => {
      this.isLoading = false;
      const user = {
        id: 'facebook-123',
        email: 'usuario@facebook.com',
        type: this.selectedUserType,
        name: 'Usuario Facebook'
      };
      this.handleLoginSuccess(user);
    }, 1000);
  }

  selectUserType(type: 'client' | 'restaurant'): void {
    this.selectedUserType = type;
    this.errorMessage = null; // Limpiar mensajes de error al cambiar el tipo
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = null;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { email, password, rememberMe } = this.loginForm.value;
    const userType = this.selectedUserType;

    // Lógica de autenticación simulada
    // En una aplicación real, esto se haría a través de un servicio de autenticación
    setTimeout(() => {
      this.isLoading = false;
      
      // Simulación de autenticación exitosa
      if (email && password) {
        const user = {
          id: '1',
          email,
          type: userType,
          name: userType === 'client' ? 'Cliente Ejemplo' : 'Restaurante Ejemplo'
        };
        
        // Almacenar preferencia de recordar usuario
        if (rememberMe) {
          localStorage.setItem('rememberedUser', JSON.stringify({ email, rememberMe }));
        } else {
          localStorage.removeItem('rememberedUser');
        }
        
        this.handleLoginSuccess(user);
      } else {
        this.errorMessage = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
      }
    }, 1000);
  }

  // Método para manejar inicio de sesión exitoso
  private handleLoginSuccess(user: User): void {
    // Guardar usuario en localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Navegar según el tipo de usuario
    if (user.type === 'client') {
      this.router.navigate(['/client/dashboard']);
    } else {
      this.router.navigate(['/restaurant/dashboard']);
    }
    
    // Cerrar el modal si está abierto
    this.close.emit();
  }

  // Código comentado que muestra cómo sería con un servicio de autenticación real
  /*
  private loginWithService(email: string, password: string, rememberMe: boolean): void {
    this.authService.login(email, password, this.selectedUserType)
      .pipe(
        catchError(error => {
          return this.handleLoginError(error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(user => {
        if (user) {
          // Almacenar preferencia de recordar usuario
          if (rememberMe) {
            localStorage.setItem('rememberedUser', JSON.stringify({ email, rememberMe }));
          } else {
            localStorage.removeItem('rememberedUser');
          }
          
          this.handleLoginSuccess(user);
        }
      });
  }
  */
  
  // Método para manejar errores de autenticación
  private handleLoginError(error: any): any {
    console.error('Error de autenticación:', error);
    this.isLoading = false;
    this.errorMessage = error?.error?.message || 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
    return of(null);
  }
}
