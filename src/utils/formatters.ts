// Formatter utility for consistent SSR/client rendering
// Uses explicit 'es-ES' locale to prevent hydration mismatches

const DEFAULT_LOCALE = 'es-ES';

// Exchange rate EUR to USD (approximate, for display purposes)
const EUR_TO_USD = 1.08;

export const formatCurrency = (value: number, currency = 'EUR'): string => {
    return new Intl.NumberFormat(DEFAULT_LOCALE, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(value);
};

// NEW: Format value in both EUR and USD
export const formatDualCurrency = (valueEUR: number): string => {
    const eur = formatCurrency(valueEUR, 'EUR');
    const usd = formatCurrency(valueEUR * EUR_TO_USD, 'USD');
    return `${eur} (${usd})`;
};

// NEW: Format value showing USD with EUR equivalent
export const formatDualCurrencyFromUSD = (valueUSD: number): string => {
    const usd = formatCurrency(valueUSD, 'USD');
    const eur = formatCurrency(valueUSD / EUR_TO_USD, 'EUR');
    return `${usd} (~${eur})`;
};

export const formatNumber = (value: number): string => {
    return new Intl.NumberFormat(DEFAULT_LOCALE, {
        maximumFractionDigits: 0,
    }).format(value);
};

export const formatCompact = (value: number): string => {
    return new Intl.NumberFormat(DEFAULT_LOCALE, {
        notation: 'compact',
        maximumFractionDigits: 1,
    }).format(value);
};

export const formatPercent = (value: number): string => {
    return new Intl.NumberFormat(DEFAULT_LOCALE, {
        style: 'percent',
        maximumFractionDigits: 1,
    }).format(value / 100);
};
