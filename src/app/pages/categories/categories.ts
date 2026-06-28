import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategorieService, Categorie } from '../../services/categorie.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories implements OnInit {
  categories: Categorie[] = [];
  showModal = false;
  isEditMode = false;
  currentCategorie: Categorie = this.empty();
  categorieToDelete: Categorie | null = null;
  showDeleteConfirm = false;
  isLoading = false;

  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.isLoading = true;
    this.categorieService.getAll().subscribe({
      next: (data) => { this.categories = data; this.isLoading = false; },
      error: () => {
        this.isLoading = false;
        this.categories = [
          { id: 1, nom: 'Informatique', description: 'Matériel informatique', nombreArticles: 38 },
          { id: 2, nom: 'Mobilier', description: 'Mobilier de bureau', nombreArticles: 15 },
          { id: 3, nom: 'Fournitures', description: 'Fournitures de bureau', nombreArticles: 62 },
        ];
      }
    });
  }

  empty(): Categorie {
    return { id: 0, nom: '', description: '', nombreArticles: 0 };
  }

  openAddModal() { this.isEditMode = false; this.currentCategorie = this.empty(); this.showModal = true; }
  openEditModal(c: Categorie) { this.isEditMode = true; this.currentCategorie = { ...c }; this.showModal = true; }
  closeModal() { this.showModal = false; }

  saveCategorie() {
    if (this.isEditMode) {
      this.categorieService.update(this.currentCategorie.id, this.currentCategorie).subscribe({
        next: () => { this.charger(); this.closeModal(); },
        error: () => {
          const i = this.categories.findIndex(c => c.id === this.currentCategorie.id);
          if (i !== -1) this.categories[i] = { ...this.currentCategorie };
          this.closeModal();
        }
      });
    } else {
      this.categorieService.create(this.currentCategorie).subscribe({
        next: () => { this.charger(); this.closeModal(); },
        error: () => {
          const newId = Math.max(0, ...this.categories.map(c => c.id)) + 1;
          this.categories.push({ ...this.currentCategorie, id: newId, nombreArticles: 0 });
          this.closeModal();
        }
      });
    }
  }

  confirmDelete(c: Categorie) { this.categorieToDelete = c; this.showDeleteConfirm = true; }
  cancelDelete() { this.categorieToDelete = null; this.showDeleteConfirm = false; }

  deleteCategorie() {
    if (this.categorieToDelete) {
      this.categorieService.delete(this.categorieToDelete.id).subscribe({
        next: () => this.charger(),
        error: () => {
          this.categories = this.categories.filter(c => c.id !== this.categorieToDelete!.id);
        }
      });
    }
    this.cancelDelete();
  }
}