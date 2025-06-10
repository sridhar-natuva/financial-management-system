import { Injectable, signal } from '@angular/core';
import { Portfolio, Investment } from '../models/portfolio.model';
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
}