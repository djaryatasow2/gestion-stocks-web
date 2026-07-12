import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  username = '';
  role = '';
  ancienMotDePasse = '';
  nouveauMotDePasse = '';
  confirmationMotDePasse = '';
  message = '';
  messageType = '';

  constructor(private authService: AuthService) {
    this.username = this.authService.getUsername();
    this.role = this.authService.getRole();
  }

  changerMotDePasse(): void {
    if (!this.ancienMotDePasse || !this.nouveauMotDePasse) {
      this.message = 'Veuillez remplir tous les champs.';
      this.messageType = 'erreur';
      return;
    }
    if (this.nouveauMotDePasse !== this.confirmationMotDePasse) {
      this.message = 'Les mots de passe ne correspondent pas.';
      this.messageType = 'erreur';
      return;
    }
    if (this.nouveauMotDePasse.length < 6) {
      this.message = 'Le mot de passe doit contenir au moins 6 caractères.';
      this.messageType = 'erreur';
      return;
    }
    this.message = 'Fonctionnalité non disponible pour le moment.';
    this.messageType = 'erreur';
    setTimeout(() => this.message = '', 3000);
  }

  deconnexion(): void {
    this.authService.logout();
  }

  get initiales(): string {
    if (!this.username) return 'US';
    return this.username.slice(0, 2).toUpperCase();
  }

  getRoleLabel(): string {
    if (this.role === 'ADMIN') return 'Administrateur';
    if (this.role === 'GESTIONNAIRE_STOCK') return 'Gestionnaire de Stock';
    if (this.role === 'RESPONSABLE_ENTREPOT') return 'Responsable Entrepôt';
    if (this.role === 'MOBILE') return 'Utilisateur Mobile';
    return this.role;
  }
}