import { Injectable, signal } from '@angular/core';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'JPY' | 'CAD' | 'AUD';

export interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  // Exchange rates relative to USD (base currency)
  private exchangeRates: Record<CurrencyCode, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.0,
    JPY: 149.0,
    CAD: 1.35,
    AUD: 1.52
  };

  // Available currencies
  currencies: Currency[] = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' }
  ];

  // Selected currency signal (default to USD)
  private selectedCurrency = signal<CurrencyCode>('USD');

  // Get selected currency
  getSelectedCurrency() {
    return this.selectedCurrency.asReadonly();
  }

  // Set selected currency
  setCurrency(currency: CurrencyCode): void {
    this.selectedCurrency.set(currency);
    // Store in localStorage for persistence
    localStorage.setItem('selectedCurrency', currency);
  }

  // Get current currency info
  getCurrentCurrency(): Currency {
    const code = this.selectedCurrency();
    return this.currencies.find(c => c.code === code) || this.currencies[0];
  }

  // Convert value from USD to selected currency
  convert(value: number): number {
    const currency = this.selectedCurrency();
    return value * this.exchangeRates[currency];
  }

  // Get exchange rate for a currency
  getExchangeRate(currency: CurrencyCode): number {
    return this.exchangeRates[currency];
  }

  // Update exchange rate (for future API integration)
  updateExchangeRate(currency: CurrencyCode, rate: number): void {
    this.exchangeRates[currency] = rate;
  }

  constructor() {
    // Load saved currency preference from localStorage
    const savedCurrency = localStorage.getItem('selectedCurrency') as CurrencyCode;
    if (savedCurrency && this.currencies.some(c => c.code === savedCurrency)) {
      this.selectedCurrency.set(savedCurrency);
    }
  }
}

