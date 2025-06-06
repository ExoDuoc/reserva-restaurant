import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {
  isLoggedIn = false;
  userType: 'client' | 'restaurant' | null = null;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.userType = user?.type || null;
    });
  }

  openLoginModal(): void {
    const modalRef = this.modalService.open(LoginComponent, { 
      centered: true,
      windowClass: 'login-modal',
      backdrop: 'static',
      keyboard: false
    });

    // Handle close event from the component
    const componentInstance = modalRef.componentInstance as LoginComponent;
    componentInstance.close.subscribe(() => {
      modalRef.close();
    });

    // Handle modal dismiss
    modalRef.result.then(
      () => {
        // Modal closed
      },
      () => {
        // Modal dismissed
      }
    );
  }


  logout(): void {
    this.authService.logout();
  }
}
