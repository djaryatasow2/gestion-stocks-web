import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  nom = '';
  email = '';
  role = '';
  ancienMotDePasse = '';
  nouveauMotDePasse = '';
  confirmationMotDePasse = '';
  message = '';
  messageType = '';

  constructor(private authService: AuthService) {
    this.nom = this.authService.getNom();
    this.email = localStorage.getItem('email') || '';
    this.role = this.authService.getRole();
  }

  enregistrerInfos(): void {
    localStorage.setItem('nom', this.nom);
    this.message = 'Informations mises à jour avec succès.';
    this.messageType = 'succes';
    setTimeout(() => this.message = '', 3000);
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
    this.message = 'Mot de passe modifié avec succès.';
    this.messageType = 'succes';
    this.ancienMotDePasse = '';
    this.nouveauMotDePasse = '';
    this.confirmationMotDePasse = '';
    setTimeout(() => this.message = '', 3000);
  }

  get initiales(): string {
    if (!this.nom) return 'US';
    return this.nom.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  }
}