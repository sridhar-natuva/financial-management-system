import { Component, input } from '@angular/core';
import { Portfolio } from '../../shared/models/portfolio.model';
import { CurrencyConverterPipe } from '../../shared/pipes/currency-converter.pipe';
import { CardComponent, StatComponent } from '../../shared/ui';

@Component({
  selector: 'app-portfolio-detail',
  imports: [CurrencyConverterPipe, CardComponent, StatComponent],
  template: `
    <app-card class="portfolio-card">
      <h3>{{ portfolio().name }}</h3>
      <div class="portfolio-stats">
        <app-stat label="Total Value">
          {{ portfolio().totalValue | currencyConverter }}
        </app-stat>
        <app-stat label="Investments">
          {{ portfolio().investments.length }}
        </app-stat>
      </div>
      <div class="investments">
        <h4>Holdings</h4>
        @for (investment of portfolio().investments; track investment.id) {
          <div class="investment-item">
            <span>{{ investment.name }}</span>
            <span>{{ investment.quantity * investment.currentPrice | currencyConverter }}</span>
          </div>
        }
      </div>
    </app-card>
  `,
  styles: [`
    .portfolio-card {
      h3 {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 1.5rem 0;
        color: #2c3e50;
        border-bottom: 2px solid #f0f2f5;
        padding-bottom: 1rem;
      }
    }

    .portfolio-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 12px;
    }

    .investments {
      margin-top: 2rem;

      h4 {
        font-size: 1.1rem;
        font-weight: 700;
        color: #2c3e50;
        margin: 0 0 1.2rem 0;
        padding-bottom: 0.75rem;
        border-bottom: 2px solid #f0f2f5;
      }
    }

    .investment-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid #f0f2f5;
      transition: background-color 0.2s ease, padding-left 0.2s ease;

      &:hover {
        background-color: #f8f9fa;
        padding-left: 0.5rem;
        border-radius: 8px;
      }

      &:last-child {
        border-bottom: none;
      }

      span:first-child {
        font-weight: 600;
        color: #2c3e50;
        font-size: 1rem;
      }

      span:last-child {
        font-weight: 700;
        color: #2c3e50;
        font-size: 1.1rem;
      }
    }

    @media (max-width: 768px) {
      .portfolio-stats {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        padding: 1rem;
      }
    }
  `]
})
export class PortfolioDetailComponent {
  portfolio = input.required<Portfolio>();
}
