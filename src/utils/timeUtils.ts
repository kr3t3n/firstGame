export const calculateTurnLength = (year: number): number => {
  if (year <= 1850) return 365; // 1 year
  if (year <= 1900) return 183; // 6 months
  if (year <= 1950) return 91; // 3 months
  if (year <= 2000) return 30; // 1 month
  return 7; // 1 week
};

export const advanceTime = (currentDate: Date): Date => {
  if (!(currentDate instanceof Date) || isNaN(currentDate.getTime())) {
    return new Date(1800, 0, 1); // Return a default date if the input is invalid
  }

  const newDate = new Date(currentDate.getTime());
  const currentYear = newDate.getFullYear();

  if (currentYear < 1850) {
    newDate.setFullYear(newDate.getFullYear() + 1);
  } else if (currentYear < 1900) {
    newDate.setMonth(newDate.getMonth() + 6);
  } else if (currentYear < 1950) {
    newDate.setMonth(newDate.getMonth() + 3);
  } else if (currentYear < 2000) {
    newDate.setMonth(newDate.getMonth() + 1);
  } else {
    newDate.setDate(newDate.getDate() + 7);
  }

  return newDate;
};

export const formatDate = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();

  return `${month} ${day}, ${year}`;
};