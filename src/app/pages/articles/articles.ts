import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleService, ArticleDto } from '../../services/article.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles implements OnInit {
  articles: ArticleDto[] = [];
  searchTerm = '';
  showModal = false;
  isEditMode = false;
  current: ArticleDto = this.empty();
  toDelete: ArticleDto | null = null;
  showDeleteConfirm = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private service: ArticleService,
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
        this.articles = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Impossible de charger les articles.';
        this.cdr.detectChanges();
      }
    });
  }

  empty(): ArticleDto {
    return { code: '', nom: '', description: '', uniteMesure: '', poids: 0, volume: 0, codeBarre: '', qrCode: '', categorieId: 0, entrepriseId: 0 };
  }

  get filtered(): ArticleDto[] {
    if (!this.searchTerm) return this.articles;
    const term = this.searchTerm.toLowerCase();
    return this.articles.filter(a =>
      a.nom.toLowerCase().includes(term) ||
      a.code.toLowerCase().includes(term) ||
      (a.codeBarre || '').toLowerCase().includes(term)
    );
  }

  openAdd(): void {
    this.isEditMode = false;
    this.current = this.empty();
    this.showModal = true;
  }

  openEdit(a: ArticleDto): void {
    this.isEditMode = true;
    this.current = { ...a };
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

  confirmDelete(a: ArticleDto): void {
    this.toDelete = a;
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