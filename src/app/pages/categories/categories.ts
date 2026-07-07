import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategorieService, CategorieDto } from '../../services/categorie.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories implements OnInit {
  categories: CategorieDto[] = [];
  showModal = false;
  isEditMode = false;
  current: CategorieDto = this.empty();
  toDelete: CategorieDto | null = null;
  showDeleteConfirm = false;
  isLoading = false;
  errorMessage = '';

  constructor(private service: CategorieService) {}

  ngOnInit(): void { this.charger(); }

  charger(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.service.getAll().subscribe({
      next: (data) => { this.categories = data; this.isLoading = false; },
      error: () => { this.isLoading = false; this.errorMessage = 'Impossible de charger les catégories.'; }
    });
  }

  empty(): CategorieDto {
    return { nom: '', description: '', categorieParentId: null };
  }

  openAdd(): void { this.isEditMode = false; this.current = this.empty(); this.showModal = true; }
  openEdit(c: CategorieDto): void { this.isEditMode = true; this.current = { ...c }; this.showModal = true; }
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

  confirmDelete(c: CategorieDto): void { this.toDelete = c; this.showDeleteConfirm = true; }
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