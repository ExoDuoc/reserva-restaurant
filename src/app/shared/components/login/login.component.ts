import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent {
  @Output() close = new EventEmitter<void>();
  
  loginForm: FormGroup;
  userTypes = [
    { value: 'client', label: '', description: 'Quiero reservar una mesa' },
    { value: 'restaurant', label: '', description: 'Quiero administrar mis reservas' }
  ];
  selectedUserType: string = 'client';
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  selectUserType(type: string): void {
    this.selectedUserType = type;
    this.errorMessage = '';
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const { email, password, rememberMe } = this.loginForm.value;

    this.authService.login(email, password, this.selectedUserType as 'client' | 'restaurant')
      .pipe(
        catchError(error => {
          console.error('Login error:', error);
          this.errorMessage = error.error?.message || 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(user => {
        if (user) {
          // Store remember me preference
          if (rememberMe) {
            // You might want to implement "remember me" functionality here
            // For example, storing a longer-lived token
          }
          
          // Navigate based on user type
          const redirectUrl = user.type === 'client' ? '/cliente' : '/restaurante';
          this.router.navigate([redirectUrl]);
          this.onClose(); // Close the modal after successful login
        }
      });
  }

  onClose(): void {
    this.close.emit();
  }
}
