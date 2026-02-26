export type TransactionType = 'expense' | 'income';
 
export interface Transaction {
  id: string;
  type: TransactionType;
  category: string;
  description?: string;
  amount: number;
  date: string; // ISO string
}