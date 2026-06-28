import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  showNotifications = false;
  notifications: any[] = [];

  constructor(public authService: AuthService) {}

  get initiales(): string {
    const nom = this.authService.getNom();
    if (!nom) return 'US';
    return nom.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  logout(): void {
    this.authService.logout();
  }
}