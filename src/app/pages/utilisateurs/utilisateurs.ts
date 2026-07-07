import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilisateurService, UserDto } from '../../services/utilisateur.service';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './utilisateurs.html',
  styleUrl: './utilisateurs.scss',
})
export class Utilisateurs implements OnInit {
  utilisateurs: UserDto[] = [];
  roles = ['ADMIN', 'GESTIONNAIRE_STOCK', 'RESPONSABLE_ENTREPOT', 'MOBILE'];
  showModal = false;
  isEditMode = false;
  current: UserDto = this.empty();
  toDelete: UserDto | null = null;
  showDeleteConfirm = false;
  isLoading = false;
  errorMessage = '';

  constructor(private service: UtilisateurService) {}

  ngOnInit(): void { this.charger(); }

  charger(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.service.getAll().subscribe({
      next: (data) => { this.utilisateurs = data; this.isLoading = false; },
      error: () => { this.isLoading = false; this.errorMessage = 'Impossible de charger les utilisateurs.'; }
    });
  }

  empty(): UserDto {
    return { username: '', password: '', email: '', nom: '', prenom: '', role: 'GESTIONNAIRE_STOCK', active: true, entrepriseId: 0 };
  }

  openAdd(): void { this.isEditMode = false; this.current = this.empty(); this.showModal = true; }
  openEdit(u: UserDto): void { this.isEditMode = true; this.current = { ...u }; this.showModal = true; }
  closeModal(): void { this.showModal = false; }

  save(): void {
    if (this.isEditMode && this.current.id) {
      this.service.update(this.current.id, this.current).subscribe({
        next: () => { this.charger(); this.closeModal(); },
        error: () => { this.errorMessage = 'Erreur lors de la modification.'; }
      });
    } else {
      this.service.create(this.current).subscribe({
        next: () => { this.charger(); this.closeModal(); },
        error: () => { this.errorMessage = 'Erreur lors de la création.'; }
      });
    }
  }

  confirmDelete(u: UserDto): void { this.toDelete = u; this.showDeleteConfirm = true; }
  cancelDelete(): void { this.toDelete = null; this.showDeleteConfirm = false; }

  delete(): void {
    if (this.toDelete?.id) {
      this.service.delete(this.toDelete.id).subscribe({
        next: () => { this.charger(); this.cancelDelete(); },
        error: () => { this.errorMessage = 'Erreur lors de la suppression.'; }
      });
    }
  }

  getRoleLabel(role: string): string {
    if (role === 'ADMIN') return 'Administrateur';
    if (role === 'GESTIONNAIRE_STOCK') return 'Gestionnaire Stock';
    if (role === 'RESPONSABLE_ENTREPOT') return 'Responsable Entrepôt';
    if (role === 'MOBILE') return 'Mobile';
    return role;
  }
}