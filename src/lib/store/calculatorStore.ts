import { create } from 'zustand';

interface CalculatorState {
  lumpSum: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  setLumpSum: (amount: number) => void;
  setMonthlyIncome: (amount: number) => void;
  setMonthlyExpenses: (amount: number) => void;
  reset: () => void;
}

export const useCalculatorStore = create<CalculatorState>((set) => ({
  lumpSum: 0,
  monthlyIncome: 0,
  monthlyExpenses: 0,
  setLumpSum: (amount) => set({ lumpSum: amount }),
  setMonthlyIncome: (amount) => set({ monthlyIncome: amount }),
  setMonthlyExpenses: (amount) => set({ monthlyExpenses: amount }),
  reset: () => set({ lumpSum: 0, monthlyIncome: 0, monthlyExpenses: 0 }),
}));
