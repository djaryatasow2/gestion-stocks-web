import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntrepriseService, Entreprise } from '../../services/entreprise.service';

@Component({
  selector: 'app-entreprises',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entreprises.html',
  styleUrl: './entreprises.scss',
})
export class Entreprises implements OnInit {
  entreprises: Entreprise[] = [];
  showModal = false;
  isEditMode = false;
  currentEntreprise: Entreprise = this.empty();
  entrepriseToDelete: Entreprise | null = null;
  showDeleteConfirm = false;
  isLoading = false;

  constructor(private entrepriseService: EntrepriseService) {}

  ngOnInit(): void {
    this.charger();
  }

  charger(): void {
    this.isLoading = true;
    this.entrepriseService.getAll().subscribe({
      next: (data) => { this.entreprises = data; this.isLoading = false; },
      error: () => {
        this.isLoading = false;
        this.entreprises = [
          { id: 1, nom: 'SMART MS SA', secteur: 'Technologie', contact: 'contact@smartms.mr', nombreUtilisateurs: 12, active: true },
          { id: 2, nom: 'Sahel Distribution', secteur: 'Logistique', contact: 'info@saheldist.mr', nombreUtilisateurs: 8, active: true },
          { id: 3, nom: 'Atlantique Trading', secteur: 'Import-Export', contact: 'contact@atlantique.mr', nombreUtilisateurs: 5, active: false },
        ];
      }
    });
  }

  empty(): Entreprise {
    return { id: 0, nom: '', secteur: '', contact: '', nombreUtilisateurs: 0, active: true };
  }

  openAddModal() { this.isEditMode = false; this.currentEntreprise = this.empty(); this.showModal = true; }
  openEditModal(e: Entreprise) { this.isEditMode = true; this.currentEntreprise = { ...e }; this.showModal = true; }
  closeModal() { this.showModal = false; }

  saveEntreprise() {
    if (this.isEditMode) {
      this.entrepriseService.update(this.currentEntreprise.id, this.currentEntreprise).subscribe({
        next: () => { this.charger(); this.closeModal(); },
        error: () => {
          const i = this.entreprises.findIndex(e => e.id === this.currentEntreprise.id);
          if (i !== -1) this.entreprises[i] = { ...this.currentEntreprise };
          this.closeModal();
        }
      });
    } else {
      this.entrepriseService.create(this.currentEntreprise).subscribe({
        next: () => { this.charger(); this.closeModal(); },
        error: () => {
          const newId = Math.max(0, ...this.entreprises.map(e => e.id)) + 1;
          this.entreprises.push({ ...this.currentEntreprise, id: newId, nombreUtilisateurs: 0 });
          this.closeModal();
        }
      });
    }
  }

  confirmDelete(e: Entreprise) { this.entrepriseToDelete = e; this.showDeleteConfirm = true; }
  cancelDelete() { this.entrepriseToDelete = null; this.showDeleteConfirm = false; }

  deleteEntreprise() {
    if (this.entrepriseToDelete) {
      this.entrepriseService.delete(this.entrepriseToDelete.id).subscribe({
        next: () => this.charger(),
        error: () => {
          this.entreprises = this.entreprises.filter(e => e.id !== this.entrepriseToDelete!.id);
        }
      });
    }
    this.cancelDelete();
  }
}