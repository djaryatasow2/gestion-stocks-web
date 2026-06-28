import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilisateurService, Utilisateur } from '../../services/utilisateur.service';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './utilisateurs.html',
  styleUrl: './utilisateurs.scss',
})
export class Utilisateurs implements OnInit {
  utilisateurs: Utilisateur[] = [];
  roles = ['ADMIN', 'GESTIONNAIRE', 'RESPONSABLE'];
  showModal = false;
  isEditMode = false;
  currentUtilisateur: Utilisateur = this.empty();
  utilisateurToDelete: Utilisateur | null = null;
  showDeleteConfirm = false;
  isLoading = false;

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.isLoading = true;
    this.utilisateurService.getAll().subscribe({
      next: (data) => { this.utilisateurs = data; this.isLoading = false; },
      error: () => {
        this.isLoading = false;
        this.utilisateurs = [
          { id: 1, nom: 'Djaryata Sow', email: 'djaryata@smartms.mr', role: 'GESTIONNAIRE', entreprise: 'SMART MS SA', actif: true },
          { id: 2, nom: 'Ahmed Vall', email: 'ahmed@smartms.mr', role: 'RESPONSABLE', entreprise: 'SMART MS SA', actif: true },
          { id: 3, nom: 'Fatima Mint', email: 'admin@smartms.mr', role: 'ADMIN', entreprise: 'SMART MS SA', actif: true },
        ];
      }
    });
  }

  empty(): Utilisateur {
    return { id: 0, nom: '', email: '', role: 'GESTIONNAIRE', entreprise: '', actif: true };
  }

  openAddModal() { this.isEditMode = false; this.currentUtilisateur = this.empty(); this.showModal = true; }
  openEditModal(u: Utilisateur) { this.isEditMode = true; this.currentUtilisateur = { ...u }; this.showModal = true; }
  closeModal() { this.showModal = false; }

  saveUtilisateur() {
    if (this.isEditMode) {
      this.utilisateurService.update(this.currentUtilisateur.id, this.currentUtilisateur).subscribe({
        next: () => { this.charger(); this.closeModal(); },
        error: () => {
          const i = this.utilisateurs.findIndex(u => u.id === this.currentUtilisateur.id);
          if (i !== -1) this.utilisateurs[i] = { ...this.currentUtilisateur };
          this.closeModal();
        }
      });
    } else {
      this.utilisateurService.create(this.currentUtilisateur).subscribe({
        next: () => { this.charger(); this.closeModal(); },
        error: () => {
          const newId = Math.max(0, ...this.utilisateurs.map(u => u.id)) + 1;
          this.utilisateurs.push({ ...this.currentUtilisateur, id: newId });
          this.closeModal();
        }
      });
    }
  }

  confirmDelete(u: Utilisateur) { this.utilisateurToDelete = u; this.showDeleteConfirm = true; }
  cancelDelete() { this.utilisateurToDelete = null; this.showDeleteConfirm = false; }

  deleteUtilisateur() {
    if (this.utilisateurToDelete) {
      this.utilisateurService.delete(this.utilisateurToDelete.id).subscribe({
        next: () => this.charger(),
        error: () => {
          this.utilisateurs = this.utilisateurs.filter(u => u.id !== this.utilisateurToDelete!.id);
        }
      });
    }
    this.cancelDelete();
  }
}