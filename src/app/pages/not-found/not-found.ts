import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="text-align:center; padding: 4rem;">
      <h1>404</h1>
      <p>Page non trouvée</p>
      <a routerLink="/dashboard">Retour au tableau de bord</a>
    </div>
  `
})
export class NotFound {}