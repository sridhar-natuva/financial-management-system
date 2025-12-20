import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CurrencyService, CurrencyCode } from '../../../services/currency.service';
import { BaseTabComponent } from './base-tab.component';

@Component({
  selector: 'app-preferences-tab',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './preferences-tab.component.html',
  styleUrl: './preferences-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreferencesTabComponent extends BaseTabComponent {
  tabKey = 'preferences';
  tabLabel = 'Preferences';

  currencyService = inject(CurrencyService);
  selectedCurrency = this.currencyService.getSelectedCurrency();
  currencies = this.currencyService.currencies;

  onCurrencyChange(currency: CurrencyCode) {
    this.currencyService.setCurrency(currency);
  }
}
