import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../../services/budget.service';
import { Transaction } from '../../models/transaction.model';
import { RouterLink } from '@angular/router';
 
@Component({
  standalone: true,
  selector: 'page-income',
  imports: [CommonModule, RouterLink],
  templateUrl: './income.html',
  styleUrls: ['./income.css']
})
export class IncomePage {
  items: Transaction[] = [];
 
  constructor(private bs: BudgetService) {
    this.load();
  }
 
  load() {
    this.items = this.bs.getAll().filter(i => i.type === 'income');
  }
  delete(id: string) {
    if (!confirm('Delete this income?')) return;
    this.bs.remove(id);
    this.load();
  }
}