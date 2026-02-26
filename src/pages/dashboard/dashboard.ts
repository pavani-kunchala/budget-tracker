import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
import { BudgetService } from '../../services/budget.service';
import { Transaction } from '../../models/transaction.model';
 
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

 
@Component({
  standalone: true,
  selector: 'page-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardPage implements AfterViewInit {
 
  // Filters
  fromDate = '';
  toDate = '';
 
  // Data
  items: Transaction[] = [];
  totals = { income: 0, expense: 0, balance: 0 };
 
  // Charts ref
  @ViewChild('doughnutChart') doughnutChart!: ElementRef;
  @ViewChild('lineChart') lineChart!: ElementRef;
  @ViewChild('barChart') barChart!: ElementRef;
 
  constructor(private bs: BudgetService ){
  this.refresh();
}
 
  // Refresh all items
  refresh() {
    this.items = this.bs.getAll();
    this.totals = this.bs.totals();
  }
 
  // Apply filter
  filter() {
    const all = this.bs.getAll();
 
    const from = this.fromDate ? new Date(this.fromDate) : null;
    const to = this.toDate ? new Date(this.toDate) : null;
 
    this.items = all.filter(it => {
      const d = new Date(it.date);
 
      if (from && d < from) return false;
      if (to && d > to) return false;
 
      return true;
    });
  }
 
  // Expense grouped by category
  categoryList() {
    const cats: Record<string, number> = {};
 
    this.items
      .filter(i => i.type === 'expense')
      .forEach(i => {
        cats[i.category] = (cats[i.category] || 0) + i.amount;
      });
 
    return Object.entries(cats).map(([category, amount]) => ({
      category,
      total: amount
    }));
  }
 
  // Expense grouped by month
  monthList() {
    const months: Record<string, number> = {};
 
    this.items
      .filter(i => i.type === 'expense')
      .forEach(i => {
        const d = new Date(i.date);
        const key = d.toLocaleString(undefined, { month: 'short' });
 
        months[key] = (months[key] || 0) + i.amount;
      });
 
    return Object.entries(months).map(([month, total]) => ({
      month,
      total
    }));
  }
 
  // Angular lifecycle
  ngAfterViewInit() {
    this.loadDoughnutChart();
    this.loadLineChart();
    this.loadBarChart();
  }
 
  // ===========================
  //        CHARTS
  // ===========================
 
  // Income vs Expense
  loadDoughnutChart() {
    new Chart(this.doughnutChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Income', 'Expense'],
        datasets: [
          {
            data: [this.totals.income, this.totals.expense],
            backgroundColor: [
              'rgba(0,255,150,0.9)',
              'rgba(255,0,130,0.9)'
            ]
          }
        ]
      }
    });
  }
 
  // Month-wise expense
  loadLineChart() {
    const summary = this.monthList();
 
    new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: summary.map((m: any) => m.month),
        datasets: [
          {
            label: 'Monthly Expense',
            data: summary.map((m: any) => m.total),
            borderColor: 'cyan',
            borderWidth: 3
          }
        ]
      }
    });
  }
 
  // Category-wise expense
  loadBarChart() {
    const summary = this.categoryList();
 
    new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: summary.map((c: any) => c.category),
        datasets: [
          {
            label: 'Category Expense',
            data: summary.map((c: any) => c.total),
            backgroundColor: 'rgba(0, 200, 255, 0.8)'
          }
        ]
      }
    });
  }
}