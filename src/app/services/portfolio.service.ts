import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Portfolio, Investment } from '../models/portfolio.model';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private portfolios: Portfolio[] = [];
  private portfoliosSubject = new BehaviorSubject<Portfolio[]>([]);

  constructor(private mockDataService: MockDataService) {
    // Initialize with mock data
    this.portfolios = this.mockDataService.getMockPortfolios();
    this.portfoliosSubject.next(this.portfolios);
  }

  getPortfolios(): Observable<Portfolio[]> {
    return this.portfoliosSubject.asObservable();
  }

  addInvestment(portfolioId: string, investment: Investment): void {
    const portfolio = this.portfolios.find(p => p.id === portfolioId);
    if (portfolio) {
      portfolio.investments.push(investment);
      portfolio.totalValue = this.calculatePortfolioValue(portfolio);
      portfolio.lastUpdated = new Date();
      this.portfoliosSubject.next([...this.portfolios]);
    }
  }

  private calculatePortfolioValue(portfolio: Portfolio): number {
    return portfolio.investments.reduce(
      (total, inv) => total + (inv.quantity * inv.currentPrice),
      0
    );
  }
}