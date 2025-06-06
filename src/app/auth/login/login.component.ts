import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {}

  // Getter para acceder a los controles del formulario
  get f() { return this.loginForm.controls; }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    this.submitted = true;

    // Detener si el formulario es inválido
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    
    // Aquí iría la lógica de autenticación
    console.log('Datos del formulario:', this.loginForm.value);
    
    // Simulación de inicio de sesión exitoso
    setTimeout(() => {
      this.loading = false;
      // Redirigir al dashboard después del inicio de sesión exitoso
      this.router.navigate(['/admin/dashboard']);
    }, 1500);
  }

  // Método para autenticación con Google
  loginWithGoogle() {
    console.log('Iniciando sesión con Google');
    // Implementar lógica de autenticación con Google
  }

  // Método para autenticación con Facebook
  loginWithFacebook() {
    console.log('Iniciando sesión con Facebook');
    // Implementar lógica de autenticación con Facebook
  }
}
