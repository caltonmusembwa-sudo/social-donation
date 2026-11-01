import { CurrencyCode, CurrencyConfig } from '../types/donation';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rateFromUSD: 1.0,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rateFromUSD: 0.92,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    rateFromUSD: 0.79,
  },
  KES: {
    code: 'KES',
    symbol: 'KSh',
    name: 'Kenyan Shilling',
    rateFromUSD: 130.0,
  },
  CAD: {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Canadian Dollar',
    rateFromUSD: 1.38,
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    rateFromUSD: 1.54,
  },
};

export function formatCurrency(amountUSD: number, currencyCode: CurrencyCode = 'USD'): string {
  const config = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = amountUSD * config.rateFromUSD;
  
  if (config.code === 'KES') {
    return `${config.symbol} ${Math.round(converted).toLocaleString()}`;
  }
  
  return `${config.symbol}${Math.round(converted).toLocaleString()}`;
}

export function convertFromUSD(amountUSD: number, currencyCode: CurrencyCode = 'USD'): number {
  const config = CURRENCIES[currencyCode] || CURRENCIES.USD;
  return Math.round(amountUSD * config.rateFromUSD);
}

export function convertToUSD(amountLocal: number, currencyCode: CurrencyCode = 'USD'): number {
  const config = CURRENCIES[currencyCode] || CURRENCIES.USD;
  return amountLocal / config.rateFromUSD;
}
