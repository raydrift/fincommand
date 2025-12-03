/**
 * Validate positive currency amount
 */
export const isValidAmount = (amount: number): boolean => {
  return amount >= 0 && !isNaN(amount);
};

/**
 * Validate APR rate (0-1 range)
 */
export const isValidRate = (rate: number): boolean => {
  return rate >= 0 && rate <= 1;
};

/**
 * Validate day of month (1-31)
 */
export const isValidDayOfMonth = (day: number): boolean => {
  return day >= 1 && day <= 31;
};
