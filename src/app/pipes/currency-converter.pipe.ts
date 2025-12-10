import { Pipe, PipeTransform, inject } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Pipe({
  name: 'currencyConverter',
  standalone: true,
  pure: false // Make it impure to react to currency changes
})
export class CurrencyConverterPipe implements PipeTransform {
  private currencyService = inject(CurrencyService);

  transform(value: number | null | undefined, digitsInfo: string = '1.0-2'): string {
    if (value == null || isNaN(value)) {
      return '—';
    }

    const currentCurrency = this.currencyService.getSelectedCurrency()();
    const currency = this.currencyService.getCurrentCurrency();

    // Convert value
    const convertedValue = this.currencyService.convert(value);

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

    // Build result with currency symbol
    return `${currency.symbol}${formattedValue}`;
  }
}

