import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PortfolioListComponent } from './components/portfolio-list/portfolio-list.component';
import { InvestmentFormComponent } from './components/investment-form/investment-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'portfolios', component: InvestmentFormComponent },
    // { path: 'analystics', component: DashboardComponent }

];
