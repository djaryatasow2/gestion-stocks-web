import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-previsions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './previsions.html',
  styleUrl: './previsions.scss',
})
export class Previsions implements AfterViewInit {
  @ViewChild('courbeChart') courbeRef!: ElementRef;

  horizon = 30;
  chart: any = null;

  previsions = [
    { article: 'Souris sans fil', entrepot: 'Entrepôt A', stockActuel: 5, consommationMoyenne: 2.5, joursAvantRupture: 2 },
    { article: 'Toner imprimante', entrepot: 'Entrepôt A', stockActuel: 8, consommationMoyenne: 1.2, joursAvantRupture: 7 },
    { article: 'Câble HDMI', entrepot: 'Entrepôt C', stockActuel: 12, consommationMoyenne: 1.5, joursAvantRupture: 8 },
    { article: 'Chaise de bureau', entrepot: 'Entrepôt B', stockActuel: 20, consommationMoyenne: 0.8, joursAvantRupture: 25 },
  ];

  donneesParHorizon: { [key: number]: number[] } = {
    7: [90, 85, 78, 82, 75, 70, 68],
    30: [65, 72, 58, 80, 74, 90, 85, 78, 82, 75, 70, 68, 72, 80, 85, 90, 88, 76, 70, 65, 72, 80, 85, 78, 74, 68, 72, 76, 80, 85],
    90: [65, 72, 58, 80, 74, 90, 85, 78, 82, 75, 70, 68, 72, 80, 85, 90, 88, 76, 70, 65, 72, 80, 85, 78, 74, 68, 72, 76, 80, 85, 88, 90, 85, 82, 78, 75, 70, 68, 65, 70, 75, 80, 85, 88, 90, 85, 80, 75, 70, 65, 68, 72, 76, 80, 85, 88, 90, 85, 80, 75, 70, 65, 68, 72, 76, 80, 85, 88, 90, 85, 80, 75, 70, 65, 68, 72, 76, 80, 85, 88, 90, 85, 80, 75, 70, 65, 68, 72, 76, 80],
  };

  ngAfterViewInit(): void {
    setTimeout(() => this.creerCourbe(), 300);
  }

  getLabels(): string[] {
    const n = this.donneesParHorizon[this.horizon].length;
    return Array.from({ length: n }, (_, i) => `J${i + 1}`);
  }

  creerCourbe(): void {
    if (!this.courbeRef) return;
    if (this.chart) { this.chart.destroy(); }

    this.chart = new Chart(this.courbeRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.getLabels(),
        datasets: [
          {
            label: 'Consommation réelle',
            data: this.donneesParHorizon[this.horizon],
            borderColor: '#7a1f2b',
            backgroundColor: 'rgba(122, 31, 43, 0.08)',
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: '#7a1f2b',
          },
          {
            label: 'Prévision',
            data: this.donneesParHorizon[this.horizon].map(v => Math.round(v * 0.95)),
            borderColor: '#b8924a',
            backgroundColor: 'transparent',
            borderDash: [6, 3],
            tension: 0.4,
            pointRadius: 0,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        },
        scales: {
          y: { beginAtZero: false, grid: { color: '#f4f0e9' } },
          x: { grid: { display: false }, ticks: { maxTicksLimit: 10 } }
        }
      }
    });
  }

  changerHorizon(h: number): void {
    this.horizon = h;
    setTimeout(() => this.creerCourbe(), 100);
  }

  getUrgenceClass(jours: number): string {
    if (jours <= 3) return 'critique';
    if (jours <= 10) return 'attention';
    return 'normal';
  }
}