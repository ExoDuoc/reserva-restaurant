import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Importar componentes standalone
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { 
    path: 'registro', 
    component: RegisterComponent 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // Importar componentes standalone
    LoginComponent,
    RegisterComponent
  ],
  exports: [RouterModule]
})
export class AuthModule { }
