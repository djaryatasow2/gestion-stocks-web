import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, AfterViewInit {
  @ViewChild('camembertChart') camembertRef!: ElementRef;
  @ViewChild('barChart') barRef!: ElementRef;

  stats = [
    { label: 'Total articles', value: 245 },
    { label: 'Entrepôts actifs', value: 5 },
    { label: 'Alertes en cours', value: 12 },
    { label: 'Ruptures de stock', value: 3 },
  ];

  alertes = [
    { article: 'Souris sans fil', niveau: 5, seuil: 15, entrepot: 'Entrepôt A' },
    { article: 'Chaise de bureau', niveau: 0, seuil: 5, entrepot: 'Entrepôt B' },
    { article: 'Câble HDMI', niveau: 2, seuil: 10, entrepot: 'Entrepôt C' },
  ];

  repartition = [
    { nom: 'Entrepôt A', pourcentage: 42 },
    { nom: 'Entrepôt B', pourcentage: 28 },
    { nom: 'Entrepôt C', pourcentage: 30 },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('/api/dashboard').subscribe({
      next: (data) => {
        this.stats = [
          { label: 'Total articles', value: data.totalArticles || 245 },
          { label: 'Entrepôts actifs', value: data.totalEntrepots || 5 },
          { label: 'Alertes en cours', value: data.alertesActives || 12 },
          { label: 'Ruptures de stock', value: data.rupturesStock || 3 },
        ];
        this.alertes = data.alertes || this.alertes;
        this.repartition = data.repartitionEntrepots || this.repartition;
      },
      error: () => {}
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.creerCamembert();
      this.creerBarChart();
    }, 300);
  }

  creerCamembert(): void {
    if (!this.camembertRef) return;
    new Chart(this.camembertRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.repartition.map(r => r.nom),
        datasets: [{
          data: this.repartition.map(r => r.pourcentage),
          backgroundColor: ['#7a1f2b', '#b8924a', '#5c1521'],
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  creerBarChart(): void {
    if (!this.barRef) return;
    new Chart(this.barRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [{
          label: 'Mouvements',
          data: [65, 72, 58, 80, 74, 90],
          backgroundColor: '#7a1f2b',
          borderRadius: 4,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: '#f4f0e9' } },
          x: { grid: { display: false } }
        }
      }
    });
  }
}