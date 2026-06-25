import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Article {
  id: number;
  nom: string;
  reference: string;
  categorie: string;
  quantite: number;
  seuilMinimum: number;
  entrepot: string;
}

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles {
  articles: Article[] = [
    { id: 1, nom: 'Ordinateur portable HP', reference: 'REF-001', categorie: 'Informatique', quantite: 25, seuilMinimum: 10, entrepot: 'Entrepôt A' },
    { id: 2, nom: 'Souris sans fil', reference: 'REF-002', categorie: 'Informatique', quantite: 5, seuilMinimum: 15, entrepot: 'Entrepôt A' },
    { id: 3, nom: 'Chaise de bureau', reference: 'REF-003', categorie: 'Mobilier', quantite: 0, seuilMinimum: 5, entrepot: 'Entrepôt B' },
    { id: 4, nom: 'Imprimante Laser', reference: 'REF-004', categorie: 'Informatique', quantite: 12, seuilMinimum: 3, entrepot: 'Entrepôt B' },
  ];

  searchTerm = '';
  showModal = false;
  isEditMode = false;
  currentArticle: Article = this.empty();
  articleToDelete: Article | null = null;
  showDeleteConfirm = false;

  empty(): Article {
    return { id: 0, nom: '', reference: '', categorie: '', quantite: 0, seuilMinimum: 0, entrepot: '' };
  }

  get filteredArticles(): Article[] {
    if (!this.searchTerm) return this.articles;
    const term = this.searchTerm.toLowerCase();
    return this.articles.filter(a =>
      a.nom.toLowerCase().includes(term) ||
      a.reference.toLowerCase().includes(term) ||
      a.categorie.toLowerCase().includes(term)
    );
  }

  getStatut(a: Article): string {
    if (a.quantite === 0) return 'rupture';
    if (a.quantite <= a.seuilMinimum) return 'bas';
    return 'normal';
  }

  getStatutLabel(a: Article): string {
    const s = this.getStatut(a);
    if (s === 'normal') return 'Normal';
    if (s === 'bas') return 'Stock bas';
    return 'Rupture';
  }

  openAddModal() { this.isEditMode = false; this.currentArticle = this.empty(); this.showModal = true; }
  openEditModal(a: Article) { this.isEditMode = true; this.currentArticle = { ...a }; this.showModal = true; }
  closeModal() { this.showModal = false; }

  saveArticle() {
    if (this.isEditMode) {
      const i = this.articles.findIndex(a => a.id === this.currentArticle.id);
      if (i !== -1) this.articles[i] = { ...this.currentArticle };
    } else {
      const newId = Math.max(0, ...this.articles.map(a => a.id)) + 1;
      this.articles.push({ ...this.currentArticle, id: newId });
    }
    this.closeModal();
  }

  confirmDelete(a: Article) { this.articleToDelete = a; this.showDeleteConfirm = true; }
  cancelDelete() { this.articleToDelete = null; this.showDeleteConfirm = false; }

  deleteArticle() {
    if (this.articleToDelete) {
      this.articles = this.articles.filter(a => a.id !== this.articleToDelete!.id);
    }
    this.cancelDelete();
  }
}