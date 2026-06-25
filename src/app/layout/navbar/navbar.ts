import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  showNotifications = false;

  constructor(
    public authService: AuthService,
    public notifService: NotificationService
  ) {}

  get initiales(): string {
    const nom = this.authService.getNom();
    if (!nom) return 'US';
    return nom.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.notifService.marquerToutLu();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}