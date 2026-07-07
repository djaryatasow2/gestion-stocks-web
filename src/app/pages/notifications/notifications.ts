import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, NotificationDto } from '../../services/notifications.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss',
})
export class Notifications implements OnInit {
  notifications: NotificationDto[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private service: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void { this.charger(); }

  charger(): void {
    this.isLoading = true;
    this.errorMessage = '';
    const userId = Number(localStorage.getItem('userId')) || 0;
    this.service.getByUser(userId).subscribe({
      next: (data: NotificationDto[]) => { this.notifications = data; this.isLoading = false; },
      error: () => { this.isLoading = false; this.errorMessage = 'Impossible de charger les notifications.'; }
    });
  }

  get nonLues(): NotificationDto[] {
    return this.notifications.filter(n => !n.estLue);
  }

  get lues(): NotificationDto[] {
    return this.notifications.filter(n => n.estLue);
  }

  marquerLue(n: NotificationDto): void {
    if (!n.id) return;
    this.service.marquerLue(n.id).subscribe({
      next: () => { n.estLue = true; },
      error: () => { this.errorMessage = 'Erreur lors de la mise à jour.'; }
    });
  }

  delete(n: NotificationDto): void {
    if (!n.id) return;
    this.service.delete(n.id).subscribe({
      next: () => this.charger(),
      error: () => { this.errorMessage = 'Erreur lors de la suppression.'; }
    });
  }
}