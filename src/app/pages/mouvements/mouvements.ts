import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MouvementsService, MouvementStockDto } from '../../services/mouvements.service';

@Component({
  selector: 'app-mouvements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mouvements.html',
  styleUrl: './mouvements.scss',
})
export class Mouvements implements OnInit {
  mouvements: MouvementStockDto[] = [];
  showModal = false;
  isLoading = false;
  errorMessage = '';
  current: MouvementStockDto = this.empty();
  typesMouvement = ['ENTREE', 'SORTIE', 'TRANSFERT'];

  constructor(
    private service: MouvementsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.service.getAll().subscribe({
      next: (data: MouvementStockDto[]) => {
        this.mouvements = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Impossible de charger les mouvements.';
        this.cdr.detectChanges();
      }
    });
  }

  empty(): MouvementStockDto {
    return {
      typeMouvement: 'ENTREE',
      quantite: 0,
      reference: '',
      motif: '',
      coutUnitaire: 0,
      prixVente: 0,
      stockId: 0,
      userId: 0
    };
  }

  openModal(): void {
    this.current = this.empty();
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  getTypeLabel(type: string): string {
    if (type === 'ENTREE') return 'Entrée';
    if (type === 'SORTIE') return 'Sortie';
    return 'Transfert';
  }

  save(): void {
    if (!this.current.stockId || !this.current.quantite) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
    this.service.create(this.current).subscribe({
      next: () => {
        this.charger();
        this.closeModal();
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la création du mouvement.';
        this.cdr.detectChanges();
      }
    });
  }

  delete(id: number): void {
    this.service.delete(id).subscribe({
      next: () => {
        this.charger();
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la suppression.';
        this.cdr.detectChanges();
      }
    });
  }
}