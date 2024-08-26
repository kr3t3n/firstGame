export const calculateTurnLength = (year: number): number => {
  if (year <= 1850) return 365; // 1 year
  if (year <= 1900) return 183; // 6 months (approximately)
  if (year <= 1950) return 91;  // 3 months (approximately)
  if (year <= 2000) return 30;  // 1 month
  return 7; // 1 week
};

export const advanceTime = (currentDate: Date): Date => {
  const year = currentDate.getFullYear();
  const turnLength = calculateTurnLength(year);
  const newDate = new Date(currentDate);
  newDate.setDate(newDate.getDate() + turnLength);
  return newDate;
};

export const formatDate = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();

  if (year <= 1850) {
    return `${year}`;
  } else if (year <= 2000) {
    return `${month} ${year}`;
  } else {
    return `${month} ${day}, ${year}`;
  }
};

export const getTurnNumber = (startDate: Date, currentDate: Date): number => {
  let turns = 0;
  let tempDate = new Date(startDate);

  while (tempDate < currentDate) {
    const year = tempDate.getFullYear();
    const turnLength = calculateTurnLength(year);
    tempDate = advanceTime(tempDate);
    turns++;
  }

  return turns;
};

export const getDateAfterTurns = (startDate: Date, turns: number): Date => {
  let tempDate = new Date(startDate);

  for (let i = 0; i < turns; i++) {
    tempDate = advanceTime(tempDate);
  }

  return tempDate;
};