/**
 * Calculate interest paid per month on a debt
 */
export const calculateMonthlyInterest = (balance: number, annualRate: number): number => {
  return (balance * annualRate) / 12;
};

/**
 * Calculate interest saved by paying off debt early
 */
export const calculateInterestSaved = (balance: number, rate: number, months: number): number => {
  let remaining = balance;
  let totalInterest = 0;

  for (let i = 0; i < months; i++) {
    const interest = calculateMonthlyInterest(remaining, rate);
    totalInterest += interest;
    remaining -= balance / months; // Simplified; adjust as needed
  }

  return totalInterest;
};

/**
 * Calculate future value with compound interest
 */
export const calculateCompoundGrowth = (
  principal: number,
  annualRate: number,
  years: number
): number => {
  return principal * Math.pow(1 + annualRate, years);
};

interface DebtItem {
  balance: number;
  [key: string]: unknown;
}

/**
 * Snowball method: sort debts by smallest balance first
 */
export const sortDebtsBySnowball = (debts: DebtItem[]): DebtItem[] => {
  return [...debts].sort((a, b) => a.balance - b.balance);
};
