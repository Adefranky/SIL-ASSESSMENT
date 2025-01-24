import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {
  todayDate: string;

  ngAfterViewInit() {
    this.createBarChart();
    this.createPieChart();
  }

  constructor() {
    this.todayDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  createBarChart() {
    new Chart("barChart", {
      type: 'bar',
      data: {
        labels: ['Total Albums', 'Viewed Albums', 'Edited'],
        datasets: [{
          label: 'Album Statistics',
          data: [10, 10, 8],
          backgroundColor: ['#4CAF50', '#FF9800', '#2196F3'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  createPieChart() {
    new Chart("pieChart", {
      type: 'pie',
      data: {
        labels: ['Total Albums', 'Viewed Albums', 'Edited'],
        datasets: [{
          data: [10, 10, 8],
          backgroundColor: ['#4CAF50', '#FF9800', '#2196F3']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
