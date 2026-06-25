import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  selectedRole: string = 'Gestionnaire Stock';

  roles = ['Administrateur', 'Gestionnaire Stock', 'Responsable Entrepôt'];

  constructor(private router: Router, private authService: AuthService) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  onSubmit(): void {
  this.errorMessage = '';
  if (!this.email || !this.password) {
    this.errorMessage = 'Veuillez remplir tous les champs.';
    return;
  }
  this.isLoading = true;
  this.authService.login(this.email, this.password).subscribe({
    next: () => {
      this.isLoading = false;
      this.router.navigate(['/dashboard']);
    },
    error: () => {
      this.isLoading = false;
      // Simulation temporaire jusqu'au backend
      localStorage.setItem('token', 'fake-token-temp');
      localStorage.setItem('role', 'GESTIONNAIRE');
      localStorage.setItem('nom', this.email.split('@')[0]);
      localStorage.setItem('email', this.email);
      this.router.navigate(['/dashboard']);
    }
  });
}}
 