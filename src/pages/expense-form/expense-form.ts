import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../../services/budget.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'page-expense-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-form.html',
  styleUrls: ['./expense-form.css']
})
export class ExpenseFormPage {
  id: string | null = null;
  category = '';
  description = '';
  amount: number | null = null;
  date = '';

  constructor(
    private bs: BudgetService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const snapshotId = this.route.snapshot.paramMap.get('id');
    if (snapshotId) {
      const tx = this.bs.getById(snapshotId);
      if (tx) {
        this.id = tx.id;
        this.category = tx.category;
        this.description = tx.description || '';
        this.amount = tx.amount;
        this.date = tx.date.slice(0, 10);
      }
    } else {
      this.date = new Date().toISOString().slice(0, 10);
    }
  }

  save() {
    if (!this.category || !this.amount) {
      alert('Category and amount required');
      return;
    }
    const payload = {
      type: 'expense' as const,
      category: this.category,
      description: this.description,
      amount: Number(this.amount),
      date: new Date(this.date).toISOString()
    };
    if (this.id) {
      this.bs.update(this.id, payload);
    } else {
      this.bs.add(payload);
    }
    // ✅ Navigate back to dashboard expense list
    this.router.navigate(['/dashboard/expense']);
  }

  cancel() {
    // ✅ Navigate back to dashboard expense list
    this.router.navigate(['/dashboard/expense']);
  }
}
