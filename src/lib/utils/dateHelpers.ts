import { addDays, format } from 'date-fns';

/**
 * Get all dates in next 31 days
 */
export const getNext31Days = (startDate: Date = new Date()): Date[] => {
  const dates: Date[] = [];
  for (let i = 0; i < 31; i++) {
    dates.push(addDays(startDate, i));
  }
  return dates;
};

/**
 * Get day of month (1-31)
 */
export const getDayOfMonth = (date: Date): number => {
  return date.getDate();
};

/**
 * Format date as "Dec 2, 2025"
 */
export const formatDateShort = (date: Date): string => {
  return format(date, 'MMM d, yyyy');
};
