import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventaireService, Inventaire, InventaireSession, LigneInventaire } from '../../services/inventaires.service';

@Component({
  selector: 'app-inventaires',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventaires.html',
  styleUrl: './inventaires.scss',
})
export class Inventaires implements OnInit {
  inventaires: Inventaire[] = [];
  showModal = false;
  isEditMode = false;
  current: Inventaire = this.empty();
  toDelete: Inventaire | null = null;
  showDeleteConfirm = false;
  isLoading = false;
  errorMessage = '';

  showSessionModal = false;
  currentSession: InventaireSession = this.emptySession();
  currentLigne: LigneInventaire = this.emptyLigne();

  constructor(private service: InventaireService) {}

  ngOnInit(): void { this.charger(); }

  charger(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.service.getAll().subscribe({
      next: (data: Inventaire[]) => { this.inventaires = data; this.isLoading = false; },
      error: () => { this.isLoading = false; this.errorMessage = 'Impossible de charger les inventaires.'; }
    });
  }

  empty(): Inventaire {
    return { nom: '', dateDebut: '', dateFin: '', statut: 'EN_COURS', entrepriseId: 0 };
  }

  emptySession(): InventaireSession {
    return { entrepriseId: 0, entrepotId: 0, lignes: [] };
  }

  emptyLigne(): LigneInventaire {
    return { quantitePhysique: 0, quantiteSysteme: 0, ecart: 0, remarques: '', inventaireId: 0, articleId: 0 };
  }

  openAdd(): void { this.isEditMode = false; this.current = this.empty(); this.showModal = true; }
  openEdit(i: Inventaire): void { this.isEditMode = true; this.current = { ...i }; this.showModal = true; }
  closeModal(): void { this.showModal = false; }

  save(): void {
    if (this.isEditMode && this.current.id) {
      this.service.update(this.current.id, this.current).subscribe({
        next: () => { this.charger(); this.closeModal(); },
        error: () => { this.errorMessage = 'Erreur lors de la modification.'; }
      });
    } else {
      this.service.create(this.current).subscribe({
        next: () => { this.charger(); this.closeModal(); },
        error: () => { this.errorMessage = 'Erreur lors de la création.'; }
      });
    }
  }

  confirmDelete(i: Inventaire): void { this.toDelete = i; this.showDeleteConfirm = true; }
  cancelDelete(): void { this.toDelete = null; this.showDeleteConfirm = false; }

  delete(): void {
    if (this.toDelete?.id) {
      this.service.delete(this.toDelete.id).subscribe({
        next: () => { this.charger(); this.cancelDelete(); },
        error: () => { this.errorMessage = 'Erreur lors de la suppression.'; }
      });
    }
  }

  openSession(): void {
    this.currentSession = this.emptySession();
    this.currentLigne = this.emptyLigne();
    this.showSessionModal = true;
  }

  closeSession(): void { this.showSessionModal = false; }

  ajouterLigne(): void {
    this.currentLigne.ecart = this.currentLigne.quantitePhysique - this.currentLigne.quantiteSysteme;
    this.currentSession.lignes.push({ ...this.currentLigne });
    this.currentLigne = this.emptyLigne();
  }

  supprimerLigne(index: number): void {
    this.currentSession.lignes.splice(index, 1);
  }

  soumettreSession(): void {
    if (!this.currentSession.entrepriseId || !this.currentSession.entrepotId) {
      this.errorMessage = 'Veuillez remplir l\'entreprise et l\'entrepôt.';
      return;
    }
    this.service.soumettreSession(this.currentSession).subscribe({
      next: () => { this.charger(); this.closeSession(); },
      error: () => { this.errorMessage = 'Erreur lors de la soumission de la session.'; }
    });
  }
}