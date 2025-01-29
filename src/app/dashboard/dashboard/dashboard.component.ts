import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  todayDate: string;
  barChartInstance: Chart | null = null;
  pieChartInstance: Chart | null = null;

  ngAfterViewInit() {
    this.createBarChart();
    this.createPieChart();
  }

  ngOnDestroy() {
    // Destroy existing charts if any
    if (this.barChartInstance) {
      this.barChartInstance.destroy();
    }
    if (this.pieChartInstance) {
      this.pieChartInstance.destroy();
    }
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
    if (this.barChartInstance) {
      this.barChartInstance.destroy();
    }
    this.barChartInstance = new Chart("barChart", {
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
    if (this.pieChartInstance) {
      this.pieChartInstance.destroy();
    }
    this.pieChartInstance = new Chart("pieChart", {
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
