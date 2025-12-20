import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { portfolioResolver } from './components/portfolio-detail/portfolio.resolver';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'portfolios',
    loadComponent: () => import('./components/portfolios/portfolios.component').then(m => m.PortfoliosComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./components/settings/settings.component').then(m => m.SettingsComponent)
  },
  {
    path: 'portfolio/:id',
    loadComponent: () => import('./components/portfolio-detail/portfolio-detail.component').then(m => m.PortfolioDetailComponent),
    resolve: { portfolio: portfolioResolver }
  },
  {
    path: 'history',
    loadComponent: () => import('./components/history/history.component').then(m => m.HistoryComponent)
  }

];
