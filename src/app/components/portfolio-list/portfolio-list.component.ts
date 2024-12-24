import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Portfolio } from '../../models/portfolio.model';
import { PortfolioService } from '../../services/portfolio.service';
import { PortfolioDetailComponent } from '../portfolio-detail/portfolio-detail.component';

@Component({
  selector: 'app-portfolio-list',
  imports: [CommonModule, PortfolioDetailComponent, AsyncPipe],
  template: `
    <div class="portfolio-list">
      <h2>My Portfolios</h2>
      <div class="portfolios">
        @for (portfolio of (portfolios$ | async); track portfolio.id) {
          <app-portfolio-detail [portfolio]="portfolio" />
        }
      </div>
    </div>
  `,
  styles: [`
    .portfolio-list {
      padding: 20px;
    }
    .portfolios {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioListComponent {
  portfolios: Portfolio[] = [];
  portfolios$ = inject(PortfolioService).getPortfolios();
}
