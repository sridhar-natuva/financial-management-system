import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { PortfolioMetricsComponent } from './portfolio-metrics/portfolio-metrics.component';
import { PortfolioListComponent } from '../portfolio-list/portfolio-list.component';
import { InvestmentFormComponent } from '../investment-form/investment-form.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    PortfolioMetricsComponent,
    PortfolioListComponent,
    InvestmentFormComponent
  ],
  template: `
    <div class="dashboard">
      <app-portfolio-metrics [portfolios]="(portfolios$ | async) ?? []" />
      <div class="dashboard-content">
        <app-portfolio-list />
        <app-investment-form />
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 20px;
    }
    .dashboard-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
      margin-top: 20px;
    }
    @media (max-width: 768px) {
      .dashboard-content {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  portfolios$ = inject(PortfolioService).getPortfolios();
}