import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleService, Article } from '../../services/article.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles implements OnInit {
  articles: Article[] = [];
  searchTerm = '';
  showModal = false;
  isEditMode = false;
  currentArticle: Article = this.empty();
  articleToDelete: Article | null = null;
  showDeleteConfirm = false;
  isLoading = false;
  errorMessage = '';

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.chargerArticles();
  }

  chargerArticles(): void {
    this.isLoading = true;
    this.articleService.getAll().subscribe({
      next: (data) => {
        this.articles = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Impossible de charger les articles.';
      }
    });
  }

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

  openAddModal() {
    this.isEditMode = false;
    this.currentArticle = this.empty();
    this.showModal = true;
  }

  openEditModal(a: Article) {
    this.isEditMode = true;
    this.currentArticle = { ...a };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.errorMessage = '';
  }

  saveArticle() {
    if (this.isEditMode) {
      this.articleService.update(this.currentArticle.id, this.currentArticle).subscribe({
        next: () => {
          this.chargerArticles();
          this.closeModal();
        },
        error: () => {
          const i = this.articles.findIndex(a => a.id === this.currentArticle.id);
          if (i !== -1) this.articles[i] = { ...this.currentArticle };
          this.closeModal();
        }
      });
    } else {
      this.articleService.create(this.currentArticle).subscribe({
        next: () => {
          this.chargerArticles();
          this.closeModal();
        },
        error: () => {
          const newId = Math.max(0, ...this.articles.map(a => a.id)) + 1;
          this.articles.push({ ...this.currentArticle, id: newId });
          this.closeModal();
        }
      });
    }
  }

  confirmDelete(a: Article) {
    this.articleToDelete = a;
    this.showDeleteConfirm = true;
  }

  cancelDelete() {
    this.articleToDelete = null;
    this.showDeleteConfirm = false;
  }

  deleteArticle() {
    if (this.articleToDelete) {
      this.articleService.delete(this.articleToDelete.id).subscribe({
        next: () => this.chargerArticles(),
        error: () => {
          this.articles = this.articles.filter(a => a.id !== this.articleToDelete!.id);
        }
      });
    }
    this.cancelDelete();
  }
}