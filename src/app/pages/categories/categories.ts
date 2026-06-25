import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Categorie {
  id: number;
  nom: string;
  description: string;
  nombreArticles: number;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {
  categories: Categorie[] = [
    { id: 1, nom: 'Informatique', description: 'Matériel et accessoires informatiques', nombreArticles: 38 },
    { id: 2, nom: 'Mobilier', description: 'Mobilier de bureau', nombreArticles: 15 },
    { id: 3, nom: 'Fournitures', description: 'Fournitures de bureau diverses', nombreArticles: 62 },
  ];

  showModal = false;
  isEditMode = false;
  currentCategorie: Categorie = this.empty();
  categorieToDelete: Categorie | null = null;
  showDeleteConfirm = false;

  empty(): Categorie {
    return { id: 0, nom: '', description: '', nombreArticles: 0 };
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentCategorie = this.empty();
    this.showModal = true;
  }

  openEditModal(cat: Categorie) {
    this.isEditMode = true;
    this.currentCategorie = { ...cat };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveCategorie() {
    if (this.isEditMode) {
      const i = this.categories.findIndex(c => c.id === this.currentCategorie.id);
      if (i !== -1) this.categories[i] = { ...this.currentCategorie };
    } else {
      const newId = Math.max(0, ...this.categories.map(c => c.id)) + 1;
      this.categories.push({ ...this.currentCategorie, id: newId, nombreArticles: 0 });
    }
    this.closeModal();
  }

  confirmDelete(cat: Categorie) {
    this.categorieToDelete = cat;
    this.showDeleteConfirm = true;
  }

  cancelDelete() {
    this.categorieToDelete = null;
    this.showDeleteConfirm = false;
  }

  deleteCategorie() {
    if (this.categorieToDelete) {
      this.categories = this.categories.filter(c => c.id !== this.categorieToDelete!.id);
    }
    this.cancelDelete();
  }
}