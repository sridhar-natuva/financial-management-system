import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PortfolioListComponent } from './components/portfolio-list/portfolio-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    {
      path: 'portfolios',
      loadComponent: () => import('./components/portfolios/portfolios.component').then(m => m.PortfoliosComponent)
    },
    // { path: 'analystics', component: DashboardComponent }

];
