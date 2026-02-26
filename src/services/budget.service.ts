import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
 
@Injectable({ providedIn: 'root' })
export class BudgetService {
  private storageKey = 'angular-budget-data';
 
  private readAll(): Transaction[] {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      // seed sample
      const sample: Transaction[] = [
        { id: this.uid(), type: 'expense', category: 'Gaming Mouse', description: 'Jan-Gaming Mouse', amount: 600, date: new Date().toISOString() },
        { id: this.uid(), type: 'expense', category: 'Gaming Mouse', description: 'Jan-Gaming Mouse', amount: 600, date: new Date().toISOString() },
        { id: this.uid(), type: 'income', category: 'Salary', description: 'Monthly salary', amount: 10000, date: new Date().toISOString() }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(sample));
      return sample;
    }
    try {
      return JSON.parse(raw) as Transaction[];
    } catch {
      return [];
    }
  }
 
  private writeAll(items: Transaction[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
 
  getAll(): Transaction[] {
    return this.readAll().slice().sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }
 
  getById(id: string): Transaction | undefined {
    return this.readAll().find(t => t.id === id);
  }
 
  add(t: Omit<Transaction, 'id'>): Transaction {
    const items = this.readAll();
    const tx = { ...t, id: this.uid() };
    items.push(tx);
    this.writeAll(items);
    return tx;
  }
 
  update(id: string, patch: Partial<Transaction>) {
    const items = this.readAll();
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return false;
    items[idx] = { ...items[idx], ...patch };
    this.writeAll(items);
    return true;
  }
 
  remove(id: string) {
    const items = this.readAll().filter(i => i.id !== id);
    this.writeAll(items);
  }
 
  totals() {
    const items = this.readAll();
    const income = items.filter(i => i.type === 'income').reduce((s, x) => s + x.amount, 0);
    const expense = items.filter(i => i.type === 'expense').reduce((s, x) => s + x.amount, 0);
    const balance = income - expense;
    return { income, expense, balance };
  }
 
  private uid() {
    return Math.random().toString(36).slice(2, 9);
  }
}