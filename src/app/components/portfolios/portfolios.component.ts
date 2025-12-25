import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { Portfolio } from '../../models/portfolio.model';
import { DatePipe, DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';
import { CurrencyConverterPipe } from '../../pipes/currency-converter.pipe';

interface Tab {
  label: string;
  filter: 'all' | 'active' | 'balanced' | 'closed';
}

@Component({
  selector: 'app-portfolios',
  standalone: true,
  templateUrl: './portfolios.component.html',
  styleUrl: './portfolios.component.scss',
  imports: [
    NgClass,
    DatePipe,
    TitleCasePipe,
    CurrencyConverterPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfoliosComponent {
  portfolios = inject(PortfolioService).getPortfolios();

  // Tabs and filtering logic
  tabs: Tab[] = [
    { label: 'All', filter: 'all' },
    { label: 'Active', filter: 'active' },
    { label: 'Balanced', filter: 'balanced' },
    { label: 'Closed', filter: 'closed' }
  ];
  selectedTab = signal<Tab['filter']>('all');

  // For demo, assign types based on name (in real app, use a property)
  getPortfolioType(portfolio: Portfolio): 'active' | 'balanced' | 'closed' | 'high-risk' {
    if (portfolio.name.toLowerCase().includes('conservative')) return 'balanced';
    if (portfolio.name.toLowerCase().includes('retirement')) return 'closed';
    if (portfolio.name.toLowerCase().includes('tech')) return 'high-risk';
    return 'active';
  }

  filteredPortfolios = computed(() => {
    const tab = this.selectedTab();
    if (tab === 'all') return this.portfolios();
    return this.portfolios().filter(p => this.getPortfolioType(p) === tab);
  });

  getTabCount(filter: Tab['filter']): number {
    if (filter === 'all') return this.portfolios().length;
    return this.portfolios().filter(p => this.getPortfolioType(p) === filter).length;
  }

  // For demo: mock return and asset mix
  getReturn(portfolio: Portfolio): { value: number, period: string } {
    if (portfolio.name === 'Growth Portfolio') return { value: 12.5, period: '1Y' };
    if (portfolio.name === 'Conservative Portfolio') return { value: 5.2, period: '1Y' };
    if (portfolio.name === 'Tech Innovators') return { value: -3.1, period: 'YTD' };
    if (portfolio.name === 'Retirement Fund') return { value: 25.7, period: 'Overall' };
    return { value: 0, period: '1Y' };
  }

  getAssetMix(portfolio: Portfolio): { color: string, width: string }[] {
    // For demo, return a static mix
    return [
      { color: '#6c63ff', width: '40%' },
      { color: '#00b894', width: '30%' },
      { color: '#fdcb6e', width: '30%' }
    ];
  }

  onTabSelect(tab: Tab['filter']) {
    this.selectedTab.set(tab);
  }

  onCreatePortfolio() {
    // Placeholder for create portfolio action
    alert('Create New Portfolio clicked!');
  }
}
