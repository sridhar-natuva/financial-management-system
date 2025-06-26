import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { Portfolio, Investment } from '../../models/portfolio.model';
import { DatePipe, DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    NgClass,
    DecimalPipe,
    TitleCasePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  portfolioService = inject(PortfolioService);
  portfolios = this.portfolioService.getPortfolios();

  userName = 'Sridhar'; // In a real app, get from user profile

  totalPortfolioValue = computed(() =>
    this.portfolios().reduce((sum, p) => sum + p.totalValue, 0)
  );

  // Mock: 2.5% growth in last 24h
  growthPercent = 2.5;

  // Asset allocation by type
  assetAllocation = computed(() => {
    const allocation: Record<string, number> = {};
    let total = 0;
    this.portfolios().forEach(portfolio => {
      portfolio.investments.forEach(inv => {
        const value = inv.quantity * inv.currentPrice;
        allocation[inv.type] = (allocation[inv.type] || 0) + value;
        total += value;
      });
    });
    return Object.entries(allocation).map(([type, value]) => ({
      type,
      percent: total ? Math.round((value / total) * 100) : 0
    }));
  });

  // Top holdings for each portfolio (top 2 by value)
  getTopHoldings(portfolio: Portfolio): { name: string; value: number; type: string }[] {
    return [...portfolio.investments]
      .sort((a, b) => (b.quantity * b.currentPrice) - (a.quantity * a.currentPrice))
      .slice(0, 2)
      .map(inv => ({
        name: inv.name,
        value: inv.quantity * inv.currentPrice,
        type: inv.type
      }));
  }

  onAddInvestment() {
    // Placeholder for add investment action
    alert('Add Investment clicked!');
  }

  onViewHistory() {
    // Placeholder for view history action
    alert('View History clicked!');
  }
}