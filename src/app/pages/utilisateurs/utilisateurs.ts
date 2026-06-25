import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Utilisateur {
  id: number;
  nom: string;
  email: string;
  role: 'Administrateur' | 'Gestionnaire Stock' | 'Responsable Entrepôt';
  entreprise: string;
  actif: boolean;
}

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './utilisateurs.html',
  styleUrl: './utilisateurs.scss',
})
export class Utilisateurs {
  utilisateurs: Utilisateur[] = [
    { id: 1, nom: 'Djaryata Sow', email: 'djaryata@smartms.mr', role: 'Gestionnaire Stock', entreprise: 'SMART MS SA', actif: true },
    { id: 2, nom: 'Ahmed Vall', email: 'ahmed@smartms.mr', role: 'Responsable Entrepôt', entreprise: 'SMART MS SA', actif: true },
    { id: 3, nom: 'Fatima Mint', email: 'fatima@smartms.mr', role: 'Administrateur', entreprise: 'SMART MS SA', actif: true },
  ];

  roles = ['Administrateur', 'Gestionnaire Stock', 'Responsable Entrepôt'];

  showModal = false;
  isEditMode = false;
  currentUtilisateur: Utilisateur = this.empty();
  utilisateurToDelete: Utilisateur | null = null;
  showDeleteConfirm = false;

  empty(): Utilisateur {
    return { id: 0, nom: '', email: '', role: 'Gestionnaire Stock', entreprise: '', actif: true };
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentUtilisateur = this.empty();
    this.showModal = true;
  }

  openEditModal(u: Utilisateur) {
    this.isEditMode = true;
    this.currentUtilisateur = { ...u };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveUtilisateur() {
    if (this.isEditMode) {
      const i = this.utilisateurs.findIndex(u => u.id === this.currentUtilisateur.id);
      if (i !== -1) this.utilisateurs[i] = { ...this.currentUtilisateur };
    } else {
      const newId = Math.max(0, ...this.utilisateurs.map(u => u.id)) + 1;
      this.utilisateurs.push({ ...this.currentUtilisateur, id: newId });
    }
    this.closeModal();
  }

  confirmDelete(u: Utilisateur) {
    this.utilisateurToDelete = u;
    this.showDeleteConfirm = true;
  }

  cancelDelete() {
    this.utilisateurToDelete = null;
    this.showDeleteConfirm = false;
  }

  deleteUtilisateur() {
    if (this.utilisateurToDelete) {
      this.utilisateurs = this.utilisateurs.filter(u => u.id !== this.utilisateurToDelete!.id);
    }
    this.cancelDelete();
  }
}