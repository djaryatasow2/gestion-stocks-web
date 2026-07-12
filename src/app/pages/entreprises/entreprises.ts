import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntrepriseService, EntrepriseDto } from '../../services/entreprise.service';

@Component({
  selector: 'app-entreprises',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entreprises.html',
  styleUrl: './entreprises.scss',
})
export class Entreprises implements OnInit {
  entreprises: EntrepriseDto[] = [];
  showModal = false;
  isEditMode = false;
  current: EntrepriseDto = this.empty();
  toDelete: EntrepriseDto | null = null;
  showDeleteConfirm = false;
  isLoading = false;
  isSaving = false;
  isDeleting = false;
  errorMessage = '';

  constructor(
    private service: EntrepriseService,
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
        this.entreprises = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.status === 401
          ? 'Session expirée. Veuillez vous reconnecter.'
          : 'Impossible de charger les entreprises.';
        this.cdr.detectChanges();
      },
    });
  }

  empty(): EntrepriseDto {
    return { nom: '', adresse: '', telephone: '', email: '', siret: '' };
  }

  openAdd(): void {
    this.isEditMode = false;
    this.current = this.empty();
    this.errorMessage = '';
    this.showModal = true;
  }

  openEdit(e: EntrepriseDto): void {
    this.isEditMode = true;
    this.current = { ...e };
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  save(): void {
    if (!this.current.nom?.trim()) {
      this.errorMessage = 'Le nom de l\'entreprise est requis.';
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
          this.cdr.detectChanges();
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
          this.cdr.detectChanges();
        },
        error: () => {
          this.isSaving = false;
          this.errorMessage = 'Erreur lors de la création.';
          this.cdr.detectChanges();
        },
      });
    }
  }

  confirmDelete(e: EntrepriseDto): void {
    this.toDelete = e;
    this.showDeleteConfirm = true;
  }

  cancelDelete(): void {
    this.toDelete = null;
    this.showDeleteConfirm = false;
  }

  delete(): void {
    if (!this.toDelete?.id) {
      return;
    }
    this.isDeleting = true;
    this.errorMessage = '';
    this.service.delete(this.toDelete.id).subscribe({
      next: () => {
        this.isDeleting = false;
        this.charger();
        this.cancelDelete();
        this.cdr.detectChanges();
      },
      error: () => {
        this.isDeleting = false;
        this.errorMessage = 'Erreur lors de la suppression.';
        this.cancelDelete();
        this.cdr.detectChanges();
      },
    });
  }
}