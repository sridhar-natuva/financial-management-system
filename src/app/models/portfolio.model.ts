export interface Investment {
  id: string;
  name: string;
  type: 'stock' | 'bond' | 'crypto' | 'mutual-fund';
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: Date;
}

export interface Portfolio {
  id: string;
  name: string;
  investments: Investment[];
  totalValue: number;
  lastUpdated: Date;
}