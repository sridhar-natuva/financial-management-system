import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { portfolioResolver } from './features/portfolio-detail/portfolio.resolver';
import { SettingsComponent } from './features/settings/settings.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'portfolios',
    loadComponent: () => import('./features/portfolios/portfolios.component').then(m => m.PortfoliosComponent)
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'portfolio/:id',
    loadComponent: () => import('./features/portfolio-detail/portfolio-detail.component').then(m => m.PortfolioDetailComponent),
    resolve: { portfolio: portfolioResolver }
  },
  {
    path: 'history',
    loadComponent: () => import('./features/history/history.component').then(m => m.HistoryComponent)
  }

];
