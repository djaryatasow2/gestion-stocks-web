import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(
    private service: CategorieService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.service.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Impossible de charger les catégories.';
        this.cdr.detectChanges();
      }
    });
  }

  empty(): CategorieDto {
    return { nom: '', description: '', categorieParentId: null };
  }

  openAdd(): void {
    this.isEditMode = false;
    this.current = this.empty();
    this.showModal = true;
  }

  openEdit(c: CategorieDto): void {
    this.isEditMode = true;
    this.current = { ...c };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  save(): void {
    if (this.isEditMode && this.current.id) {
      this.service.update(this.current.id, this.current).subscribe({
        next: () => {
          this.charger();
          this.closeModal();
          this.cdr.detectChanges();
        },
        error: () => {
          this.errorMessage = 'Erreur lors de la modification.';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.service.create(this.current).subscribe({
        next: () => {
          this.charger();
          this.closeModal();
          this.cdr.detectChanges();
        },
        error: () => {
          this.errorMessage = 'Erreur lors de la création.';
          this.cdr.detectChanges();
        }
      });
    }
  }

  confirmDelete(c: CategorieDto): void {
    this.toDelete = c;
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.toDelete = null;
    this.showDeleteConfirm = false;
  }

  delete(): void {
    if (this.toDelete?.id) {
      this.service.delete(this.toDelete.id).subscribe({
        next: () => {
          this.charger();
          this.cancelDelete();
          this.cdr.detectChanges();
        },
        error: () => {
          this.errorMessage = 'Erreur lors de la suppression.';
          this.cdr.detectChanges();
        }
      });
    }
  }
}