export interface Good {
  name: string;
  price: number;
  basePrice: number;
  previousPrice?: number; // Make this optional
  marketSentiment?: {
    trend: 'up' | 'down' | 'stable';
    strength: number;
  };
}

export interface InventoryItem extends Good {
  quantity: number;
}

export interface Inventory {
  [key: string]: {
    quantity: number;
  };
}