import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { PortfolioMetricsComponent } from './portfolio-metrics/portfolio-metrics.component';
import { PortfolioListComponent } from '../portfolio-list/portfolio-list.component';
import { InvestmentFormComponent } from '../investment-form/investment-form.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    PortfolioMetricsComponent,
    PortfolioListComponent,
    InvestmentFormComponent
  ],
  template: `
    <div class="dashboard">
      <app-portfolio-metrics [portfolios]="portfolios()" />
      <button (click)="addInvestmentFormDialogRef.showModal()">Add Investment</button>
      <div class="dashboard-content">
        <app-portfolio-list />
        <dialog #addInvestmentFormDialogRef>
          <app-investment-form (newInvestmentDetails)="addInvestment($event)" />
        </dialog>
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
  dialogRef = viewChild<ElementRef<HTMLDialogElement>>('addInvestmentFormDialogRef');
  portfolioService: PortfolioService = inject(PortfolioService);
  portfolios = inject(PortfolioService).getPortfolios();
  addInvestment(newInvestmentDetails: any): void {
    this.portfolioService.addInvestment(newInvestmentDetails.portfolioId, newInvestmentDetails.investment);
    this.dialogRef()?.nativeElement.close();
  }
}