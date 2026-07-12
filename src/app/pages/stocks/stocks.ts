import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService, StockDto } from '../../services/stocks.service';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stocks.html',
  styleUrl: './stocks.scss',
})
export class Stocks implements OnInit {
  stocks: StockDto[] = [];
  showModal = false;
  isEditMode = false;
  current: StockDto = this.empty();
  toDelete: StockDto | null = null;
  showDeleteConfirm = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private service: StockService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.service.getAll().subscribe({
      next: (data: StockDto[]) => {
        this.stocks = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Impossible de charger les stocks.';
        this.cdr.detectChanges();
      },
    });
  }

  empty(): StockDto {
    return { quantite: 0, quantiteMinimale: 0, quantiteMaximale: 0, emplacement: '', articleId: 0, entrepotId: 0 };
  }

  openAdd(): void {
    this.isEditMode = false;
    this.current = this.empty();
    this.showModal = true;
  }

  openEdit(s: StockDto): void {
    this.isEditMode = true;
    this.current = { ...s };
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
        },
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
        },
      });
    }
  }

  confirmDelete(s: StockDto): void {
    this.toDelete = s;
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
        },
      });
    }
  }

  getStatut(s: StockDto): string {
    if (s.quantite === 0) return 'rupture';
    if (s.quantite <= s.quantiteMinimale) return 'critique';
    return 'normal';
  }

  getStatutLabel(s: StockDto): string {
    const statut = this.getStatut(s);
    if (statut === 'rupture') return 'Rupture';
    if (statut === 'critique') return 'Stock bas';
    return 'Normal';
  }
}