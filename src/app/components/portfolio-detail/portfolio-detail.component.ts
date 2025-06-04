import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Portfolio } from '../../models/portfolio.model';

@Component({
  selector: 'app-portfolio-detail',
  imports: [CurrencyPipe],
  template: `
    <div class="portfolio-card">
      <h3>{{ portfolio().name }}</h3>
      <div class="portfolio-stats">
        <div class="stat">
          <span class="label">Total Value:</span>
          <span class="value">{{ portfolio().totalValue | currency }}</span>
        </div>
        <div class="stat">
          <span class="label">Investments:</span>
          <span class="value">{{ portfolio().investments.length }}</span>
        </div>
      </div>
      <div class="investments">
        <h4>Holdings</h4>
        @for (investment of portfolio().investments; track investment.id) {
          <div class="investment-item">
            <span>{{ investment.name }}</span>
            <span>{{ investment.quantity * investment.currentPrice | currency }}</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .portfolio-card {
      background: #d6d6d6;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .portfolio-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin: 15px 0;
    }
    .stat {
      display: flex;
      flex-direction: column;
    }
    .label {
      color: #666;
      font-size: 0.9em;
    }
    .value {
      font-size: 1.2em;
      font-weight: bold;
    }
    .investments {
      margin-top: 20px;
    }
    .investment-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }
  `]
})
export class PortfolioDetailComponent {
  portfolio = input.required<Portfolio>();
}