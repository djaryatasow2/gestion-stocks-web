import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntrepotService, EntrepotDto } from '../../services/entrepot.service';

@Component({
  selector: 'app-entrepots',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entrepots.html',
  styleUrl: './entrepots.scss',
})
export class Entrepots implements OnInit {
  entrepots: EntrepotDto[] = [];
  showModal = false;
  isEditMode = false;
  current: EntrepotDto = this.empty();
  toDelete: EntrepotDto | null = null;
  showDeleteConfirm = false;
  isLoading = false;
  errorMessage = '';

  constructor(private service: EntrepotService) {}

  ngOnInit(): void { this.charger(); }

  charger(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.service.getAll().subscribe({
      next: (data) => { this.entrepots = data; this.isLoading = false; },
      error: () => { this.isLoading = false; this.errorMessage = 'Impossible de charger les entrepôts.'; }
    });
  }

  empty(): EntrepotDto {
    return { nom: '', adresse: '', code: '', capaciteMax: 0, actif: true, entrepriseId: 0 };
  }

  openAdd(): void { this.isEditMode = false; this.current = this.empty(); this.showModal = true; }
  openEdit(e: EntrepotDto): void { this.isEditMode = true; this.current = { ...e }; this.showModal = true; }
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

  confirmDelete(e: EntrepotDto): void { this.toDelete = e; this.showDeleteConfirm = true; }
  cancelDelete(): void { this.toDelete = null; this.showDeleteConfirm = false; }

  delete(): void {
    if (this.toDelete?.id) {
      this.service.delete(this.toDelete.id).subscribe({
        next: () => { this.charger(); this.cancelDelete(); },
        error: () => { this.errorMessage = 'Erreur lors de la suppression.'; }
      });
    }
  }
}