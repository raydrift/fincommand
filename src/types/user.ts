export interface User {
  id: string;
  email: string;
  createdAt: Date;
}

export interface FinancialSettings {
  userId: string;
  currentBalance: number;
  safetyBuffer: number; // Minimum cash on hand
  hasOnboarded: boolean;
  updatedAt: Date;
}
