import { Component, input } from '@angular/core';
import { Portfolio } from '../../shared/models/portfolio.model';
import { CurrencyConverterPipe } from '../../shared/pipes/currency-converter.pipe';

@Component({
  selector: 'app-portfolio-detail',
  imports: [CurrencyConverterPipe],
  template: `
    <div class="portfolio-card">
      <h3>{{ portfolio().name }}</h3>
      <div class="portfolio-stats">
        <div class="stat">
          <span class="label">Total Value:</span>
          <span class="value">{{ portfolio().totalValue | currencyConverter }}</span>
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
            <span>{{ investment.quantity * investment.currentPrice | currencyConverter }}</span>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .portfolio-card {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(44, 62, 80, 0.07);
      padding: 2rem 1.5rem;
      transition: box-shadow 0.3s ease, transform 0.2s ease;

      &:hover {
        box-shadow: 0 6px 32px rgba(44, 62, 80, 0.12);
      }

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

    .stat {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .label {
        color: #6c7a89;
        font-size: 0.95rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .value {
        font-size: 1.8rem;
        font-weight: 700;
        color: #2c3e50;
        line-height: 1.2;
      }
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
      .portfolio-card {
        padding: 1.5rem 1rem;
      }

      .portfolio-stats {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        padding: 1rem;
      }

      .stat .value {
        font-size: 1.5rem;
      }
    }
  `]
})
export class PortfolioDetailComponent {
  portfolio = input.required<Portfolio>();
}
