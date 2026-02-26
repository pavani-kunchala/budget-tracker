import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../../services/budget.service';
import { Transaction } from '../../models/transaction.model';
import { RouterLink, Router } from '@angular/router';
 
@Component({
  standalone: true,
  selector: 'page-expense',
  imports: [CommonModule, RouterLink],
  templateUrl: './expense.html',
  styleUrls: ['./expense.css']
})
export class ExpensePage {
  items: Transaction[] = [];
 
  constructor(private bs: BudgetService, private router: Router) {
    this.load();
  }
 
  load() {
    this.items = this.bs.getAll().filter(i => i.type === 'expense');
  }
 
  delete(id: string) {
    if (!confirm('Delete this expense?')) return;
    this.bs.remove(id);
    this.load();
  }
}