import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

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
    // { path: 'analystics', component: DashboardComponent }

];
