import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { Portfolio, TopHolding } from '../../models/portfolio.model';
import { DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CurrencyConverterPipe } from '../../pipes/currency-converter.pipe';
import { TooltipDirective, TooltipContentDirective, TooltipTriggerDirective } from '@sridhar_natuva/primitives';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    NgClass,
    TitleCasePipe,
    CurrencyConverterPipe,
    TooltipDirective,
    TooltipContentDirective,
    TooltipTriggerDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  portfolioService = inject(PortfolioService);
  router = inject(Router);
  portfolios = this.portfolioService.getPortfolios();
  newsItems = this.portfolioService.getNewsItems();

  userName = 'Sridhar'; // In a real app, get from user profile
  growthPercent = 2.5; // Mock: 2.5% growth in last 24h

  selectedTimePeriod = signal('1W');
  timePeriods = ['1D', '1W', '1M', '3M', '1Y'];

  totalPortfolioValue = computed(() =>
    this.portfolios().reduce((sum, p) => sum + p.totalValue, 0)
  );


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
      type: this.formatAssetType(type),
      percent: total ? Math.round((value / total) * 100) : 0,
      color: this.getAssetColor(type)
    }));
  });

  getTopHoldings(portfolio: Portfolio): TopHolding[] {
    return [...portfolio.investments]
      .sort((a, b) => (b.quantity * b.currentPrice) - (a.quantity * a.currentPrice))
      .slice(0, 2)
      .map(inv => ({
        name: inv.name,
        value: inv.quantity * inv.currentPrice,
        type: inv.type
      }));
  }

  private formatAssetType(type: string): string {
    const typeMap: Record<string, string> = {
      'stock': 'Stocks',
      'crypto': 'Crypto',
      'bond': 'Bonds',
      'mutual-fund': 'Mutual Funds'
    };
    return typeMap[type] || type;
  }

  private getAssetColor(type: string): string {
    const colorMap: Record<string, string> = {
      'stock': '#3b82f6',
      'crypto': '#8b5cf6',
      'bond': '#10b981',
      'mutual-fund': '#f59e0b'
    };
    return colorMap[type] || '#6b7280';
  }

  onTimePeriodChange(period: string): void {
    this.selectedTimePeriod.set(period);
  }

  onAddInvestment(): void {
    alert('Add Investment clicked!');
  }

  onViewHistory(): void {
    this.router.navigate(['/history']);
  }

  onRebalance(): void {
    alert('Rebalance Portfolio clicked!');
  }

  onViewPortfolio(portfolioId: string): void {
    this.router.navigate(['/portfolio', portfolioId]);
  }
}