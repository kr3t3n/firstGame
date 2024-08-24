export const applyNegotiationEffect = (basePrice: number, skillLevel: number): number => {
  const discount = Math.min(skillLevel * 0.01, 0.3);
  return basePrice * (1 - discount);
};

export const applyLogisticsEffect = (baseCost: number, skillLevel: number): number => {
  const reduction = Math.min(skillLevel * 0.005, 0.4);
  return baseCost * (1 - reduction);
};

export const calculateInventoryCapacity = (logisticsSkill: number): number => {
  return Math.min(100 + logisticsSkill * 2, 300);
};