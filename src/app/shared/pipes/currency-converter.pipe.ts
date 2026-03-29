import { Pipe, PipeTransform, inject } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Pipe({
  name: 'currencyConverter',
  standalone: true,
  pure: true // ✅ Make pipe pure - only runs when inputs change
})
export class CurrencyConverterPipe implements PipeTransform {
  private currencyService = inject(CurrencyService);

  // Cache currency data to avoid repeated signal reads
  private cachedCurrency: string = '';
  private cachedRate: number = 1;
  private cachedSymbol: string = '$';

  transform(value: number | null | undefined, digitsInfo: string = '1.0-2'): string {
    if (value == null || isNaN(value)) {
      return '—';
    }

    const currentCurrency = this.currencyService.getSelectedCurrency()();

    // Update cache if currency changed
    if (currentCurrency !== this.cachedCurrency) {
      this.cachedCurrency = currentCurrency;
      this.cachedRate = this.currencyService.getExchangeRate(currentCurrency);
      const currency = this.currencyService.getCurrentCurrency();
      this.cachedSymbol = currency.symbol;
    }

    // Convert value using cached rate
    const convertedValue = value * this.cachedRate;

    // Parse digits info (format: "minIntegerDigits.minFractionDigits-maxFractionDigits")
    const parts = digitsInfo.split('.');
    const fractionParts = parts[1]?.split('-') || ['0', '2'];
    const minFractionDigits = parseInt(fractionParts[0] || '0');
    const maxFractionDigits = parseInt(fractionParts[1] || '2');

    // Format the value
    const formattedValue = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: maxFractionDigits
    }).format(convertedValue);

    // Build result with cached currency symbol
    return `${this.cachedSymbol}${formattedValue}`;
  }
}
