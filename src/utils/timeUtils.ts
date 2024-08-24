export const calculateTurnLength = (year: number): number => {
  if (year <= 1850) return 365; // 1 year
  if (year <= 1900) return 183; // 6 months
  if (year <= 1950) return 91; // 3 months
  if (year <= 2000) return 30; // 1 month
  return 7; // 1 week
};

export const advanceTime = (currentDate: Date, days: number): Date => {
  const newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};