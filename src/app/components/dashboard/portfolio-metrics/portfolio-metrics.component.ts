import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Portfolio } from '../../../models/portfolio.model';

@Component({
  selector: 'app-portfolio-metrics',
  imports: [CurrencyPipe],
  template: `
    <div class="metrics-container">
      <div class="metric-card">
        <h3>Total Value</h3>
        <p class="value">{{ getTotalValue() | currency }}</p>
      </div>
      <div class="metric-card">
        <h3>Asset Allocation</h3>
        <div class="allocation-list">
          @for (allocation of getAssetAllocation(); track allocation.type) {
            <div class="allocation-item">
              <span>{{ allocation.type }}</span>
              <span>{{ allocation.percentage }}%</span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .metrics-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }
    .metric-card {
      background: #d6d6d6;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .value {
      font-size: 1.5em;
      font-weight: bold;
      color: #2c3e50;
    }
    .allocation-list {
      margin-top: 10px;
    }
    .allocation-item {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioMetricsComponent {
  portfolios = input.required<Portfolio[]>();

  getTotalValue(): number {
    return this.portfolios().reduce((sum, p) => sum + p.totalValue, 0);
  }

  getAssetAllocation(): { type: string; percentage: number }[] {
    const totalValue = this.getTotalValue();
    const allocation: { [key: string]: number } = {};

    this.portfolios().forEach(portfolio => {
      portfolio.investments.forEach(investment => {
        const value = investment.quantity * investment.currentPrice;
        allocation[investment.type] = (allocation[investment.type] || 0) + value;
      });
    });

    return Object.entries(allocation).map(([type, value]) => ({
      type,
      percentage: Math.round((value / totalValue) * 100)
    }));
  }
}