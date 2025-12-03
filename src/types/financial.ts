export interface Debt {
  id: string;
  userId: string;
  name: string;
  balance: number;
  rate: number; // APR as decimal (0.05 = 5%)
  minPayment: number;
  createdAt: Date;
}

export interface RecurringTransaction {
  id: string;
  userId: string;
  date: number; // Day of month (1-31)
  amount: number;
  type: 'income' | 'expense';
  label: string;
  isRecurring: boolean;
  createdAt: Date;
}

export interface ProjectedBalance {
  date: Date;
  balance: number;
  isRedDay: boolean; // Flag if below safety buffer
}

export interface CashFlowProjection {
  dailyBalances: ProjectedBalance[];
  minBalance: number;
  minBalanceDate: Date;
  dangerDays: number[];
}
