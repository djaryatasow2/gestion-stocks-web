import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeuilAlerteService, SeuilAlerteDto } from '../../services/seuil-alerte.service';
import { ArticleService, ArticleDto } from '../../services/article.service';
import { EntrepotService, EntrepotDto } from '../../services/entrepot.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-seuils',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seuils.html',
  styleUrl: './seuils.scss',
})
export class Seuils implements OnInit {
  seuils: SeuilAlerteDto[] = [];
  articles: ArticleDto[] = [];
  entrepots: EntrepotDto[] = [];

  showModal = false;
  isEditMode = false;
  current: SeuilAlerteDto = this.empty();
  toDelete: SeuilAlerteDto | null = null;
  showDeleteConfirm = false;
  isLoading = false;
  isSaving = false;
  isDeleting = false;
  errorMessage = '';

  constructor(
    private service: SeuilAlerteService,
    private articleService: ArticleService,
    private entrepotService: EntrepotService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.charger();
    this.chargerArticles();
    this.chargerEntrepots();
  }

  charger(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.service.getAll().subscribe({
      next: (data) => {
        this.seuils = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Impossible de charger les seuils d\'alerte.';
        this.cdr.detectChanges();
      },
    });
  }

  chargerArticles(): void {
    this.articleService.getAll().subscribe({
      next: (data) => {
        this.articles = data;
        this.cdr.detectChanges();
      },
      error: () => {},
    });
  }

  chargerEntrepots(): void {
    this.entrepotService.getAll().subscribe({
      next: (data) => {
        this.entrepots = data;
        this.cdr.detectChanges();
      },
      error: () => {},
    });
  }

  empty(): SeuilAlerteDto {
    return { seuilMinimum: 0, seuilMaximum: 0, articleId: 0, entrepotId: 0 };
  }

  openAdd(): void {
    this.isEditMode = false;
    this.current = this.empty();
    this.errorMessage = '';
    this.showModal = true;
  }

  openEdit(s: SeuilAlerteDto): void {
    this.isEditMode = true;
    this.current = { ...s };
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.cdr.detectChanges();
  }

  save(): void {
    if (!this.current.articleId || !this.current.entrepotId) {
      this.errorMessage = 'Veuillez sélectionner un article et un entrepôt.';
      return;
    }
    if (this.current.seuilMinimum >= this.current.seuilMaximum) {
      this.errorMessage = 'Le seuil minimum doit être inférieur au seuil maximum.';
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    if (this.isEditMode && this.current.id) {
      this.service.update(this.current.id, this.current).subscribe({
        next: () => {
          this.isSaving = false;
          this.charger();
          this.closeModal();
        },
        error: () => {
          this.isSaving = false;
          this.errorMessage = 'Erreur lors de la modification.';
          this.cdr.detectChanges();
        },
      });
    } else {
      this.service.create(this.current).subscribe({
        next: () => {
          this.isSaving = false;
          this.charger();
          this.closeModal();
        },
        error: () => {
          this.isSaving = false;
          this.errorMessage = 'Erreur lors de la création.';
          this.cdr.detectChanges();
        },
      });
    }
  }

  confirmDelete(s: SeuilAlerteDto): void {
    this.toDelete = s;
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.toDelete = null;
    this.showDeleteConfirm = false;
    this.cdr.detectChanges();
  }

  delete(): void {
    if (!this.toDelete?.id) return;
    this.isDeleting = true;
    this.service.delete(this.toDelete.id).subscribe({
      next: () => {
        this.isDeleting = false;
        this.charger();
        this.cancelDelete();
      },
      error: () => {
        this.isDeleting = false;
        this.errorMessage = 'Erreur lors de la suppression.';
        this.cancelDelete();
      },
    });
  }

  nomArticle(id: number): string {
    return this.articles.find((a) => a.id === id)?.nom || '—';
  }

  nomEntrepot(id: number): string {
    return this.entrepots.find((e) => e.id === id)?.nom || '—';
  }
}