// Formatter utility for consistent SSR/client rendering
// Uses explicit 'es-ES' locale to prevent hydration mismatches

const DEFAULT_LOCALE = 'es-ES';

export const formatCurrency = (value: number, currency = 'EUR'): string => {
    return new Intl.NumberFormat(DEFAULT_LOCALE, {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(value);
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
