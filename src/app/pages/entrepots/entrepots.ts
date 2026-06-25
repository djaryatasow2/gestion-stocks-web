import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Entrepot {
  id: number;
  nom: string;
  localisation: string;
  capacite: number;
  occupation: number;
}

@Component({
  selector: 'app-entrepots',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entrepots.html',
  styleUrl: './entrepots.scss',
})
export class Entrepots {
  entrepots: Entrepot[] = [
    { id: 1, nom: 'Entrepôt A', localisation: 'Nouakchott Nord', capacite: 1000, occupation: 420 },
    { id: 2, nom: 'Entrepôt B', localisation: 'Nouakchott Sud', capacite: 800, occupation: 624 },
    { id: 3, nom: 'Entrepôt C', localisation: 'Nouadhibou', capacite: 600, occupation: 180 },
  ];

  showModal = false;
  isEditMode = false;
  currentEntrepot: Entrepot = this.empty();
  entrepotToDelete: Entrepot | null = null;
  showDeleteConfirm = false;

  empty(): Entrepot {
    return { id: 0, nom: '', localisation: '', capacite: 0, occupation: 0 };
  }

  getTauxOccupation(e: Entrepot): number {
    return Math.round((e.occupation / e.capacite) * 100);
  }

  openAddModal() {
    this.isEditMode = false;
    this.currentEntrepot = this.empty();
    this.showModal = true;
  }

  openEditModal(e: Entrepot) {
    this.isEditMode = true;
    this.currentEntrepot = { ...e };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveEntrepot() {
    if (this.isEditMode) {
      const i = this.entrepots.findIndex(e => e.id === this.currentEntrepot.id);
      if (i !== -1) this.entrepots[i] = { ...this.currentEntrepot };
    } else {
      const newId = Math.max(0, ...this.entrepots.map(e => e.id)) + 1;
      this.entrepots.push({ ...this.currentEntrepot, id: newId });
    }
    this.closeModal();
  }

  confirmDelete(e: Entrepot) {
    this.entrepotToDelete = e;
    this.showDeleteConfirm = true;
  }

  cancelDelete() {
    this.entrepotToDelete = null;
    this.showDeleteConfirm = false;
  }

  deleteEntrepot() {
    if (this.entrepotToDelete) {
      this.entrepots = this.entrepots.filter(e => e.id !== this.entrepotToDelete!.id);
    }
    this.cancelDelete();
  }
}