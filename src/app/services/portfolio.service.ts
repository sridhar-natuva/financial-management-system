import { Injectable, signal } from '@angular/core';
import { Portfolio, Investment, NewsItem } from '../models/portfolio.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private portfolios = signal<Portfolio[]>([]);

  constructor(private mockDataService: MockDataService) {
    // Initialize with mock data
    this.portfolios.set(this.mockDataService.getMockPortfolios());
  }

  getPortfolios() {
    return this.portfolios;
  }

  addInvestment(portfolioId: string, investment: Investment): void {
    this.portfolios.update((folios) => {
      const folio = folios.find(p => p.id === portfolioId);
      if (folio) {
        folio.investments = [...folio.investments, investment];
        folio.totalValue = this.calculatePortfolioValue(folio);
        folio.lastUpdated = new Date();
      }
      return [...folios];
    });
  }

  private calculatePortfolioValue(portfolio: Portfolio): number {
    return portfolio.investments.reduce(
      (total, inv) => total + (inv.quantity * inv.currentPrice),
      0
    );
  }

  private newsSignal = signal<NewsItem[]>([
    { id: '1', title: 'Bitcoin reaches new monthly high', timestamp: '2 hours ago', icon: '📈' },
    { id: '2', title: 'Apple announces Q3 earnings beat', timestamp: '4 hours ago', icon: '📱' },
    { id: '3', title: 'Fed maintains interest rates steady', timestamp: '1 day ago', icon: '🏛️' }
  ]);

  getNewsItems() {
    return this.newsSignal.asReadonly();
  }
}