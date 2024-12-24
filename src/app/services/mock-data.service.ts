import { Injectable } from '@angular/core';
import { Portfolio } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  getMockPortfolios(): Portfolio[] {
    return [
      {
        id: '1',
        name: 'Growth Portfolio',
        investments: [
          {
            id: '1',
            name: 'Apple Inc.',
            type: 'stock',
            quantity: 50,
            purchasePrice: 150.00,
            currentPrice: 175.50,
            purchaseDate: new Date('2023-01-15')
          },
          {
            id: '2',
            name: 'Bitcoin',
            type: 'crypto',
            quantity: 1.5,
            purchasePrice: 30000.00,
            currentPrice: 35000.00,
            purchaseDate: new Date('2023-03-20')
          }
        ],
        totalValue: 61275.00,
        lastUpdated: new Date()
      },
      {
        id: '2',
        name: 'Conservative Portfolio',
        investments: [
          {
            id: '3',
            name: 'US Treasury Bond',
            type: 'bond',
            quantity: 100,
            purchasePrice: 1000.00,
            currentPrice: 1020.00,
            purchaseDate: new Date('2023-02-10')
          },
          {
            id: '4',
            name: 'Vanguard Total Market ETF',
            type: 'mutual-fund',
            quantity: 75,
            purchasePrice: 200.00,
            currentPrice: 210.00,
            purchaseDate: new Date('2023-04-05')
          }
        ],
        totalValue: 117750.00,
        lastUpdated: new Date()
      }
    ];
  }
}