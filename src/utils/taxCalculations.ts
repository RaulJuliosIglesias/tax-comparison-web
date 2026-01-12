import { COUNTRIES } from '@/data/countries';

export interface TaxResult {
    countryId: string;
    grossSalary: number;
    netSalary: number;
    employerCost: number;
    totalTax: number; // Employee Tax + Employer Tax
    employeeTax: number; // IRPF + SS Employee
    employerTax: number; // SS Employer
    breakdown: {
        irpf: number;
        ssEmployee: number;
        ssEmployer: number;
    };
}

export const calculateTax = (grossSalary: number): TaxResult[] => {
    return COUNTRIES.map((country) => {
        let irpf = 0;
        let ssEmployee = 0;
        let ssEmployer = 0;

        // --- Social Security ---
        if (country.id === 'ES') {
            // Spain SS Capped (Base máx aprox 4720€/mes -> 56640€/año)
            const baseCotizacion = Math.min(grossSalary, 56640);
            ssEmployee = baseCotizacion * 0.0647; // 6.47% (4.7 contingencias comunes + 1.55 desempleo + 0.1 formación + MEI)
            ssEmployer = baseCotizacion * 0.3048; // ~30-32% (contingencias + fogasa + desempleo + formación) - simplified
        } else if (country.id === 'AD') {
            // Andorra SS (CASS) - No cap strictly mentioned in prompt, but usually capped at avg salary * factor. 
            // Simplified: Flat rate on gross
            ssEmployee = grossSalary * 0.065;
            ssEmployer = grossSalary * 0.155;
        } else if (country.id === 'EE') {
            // Estonia SS (Social Tax 33% paid by employer mostly)
            // Unemployment: Employee 1.6%, Employer 0.8%
            // Funded Pension: Employee 2% (mandatory for most)
            ssEmployee = grossSalary * (0.016 + 0.02);
            ssEmployer = grossSalary * (0.33 + 0.008);
        }

        // --- IRPF (Income Tax) ---
        const taxableIncome = grossSalary - ssEmployee; // Usually SS is deductible

        if (country.id === 'ES') {
            // Spain Progressive (Simplified State + Regional Avg)
            // 0-12450: 19%
            // 12450-20200: 24%
            // 20200-35200: 30%
            // 35200-60000: 37%
            // 60000-300000: 45%
            // >300000: 47%
            // Personal allowance (Mínimo personal): ~5550€ (Simplified: Deduct from tax or taxable base)
            // Let's use a simplified bracket calculation on taxable base

            const brackets = [
                { limit: 12450, rate: 0.19 },
                { limit: 20200, rate: 0.24 },
                { limit: 35200, rate: 0.30 },
                { limit: 60000, rate: 0.37 },
                { limit: 300000, rate: 0.45 },
                { limit: Infinity, rate: 0.47 },
            ];

            // Simplified personal allowance deduction logic: 
            // Tax is calculated on total, then tax on allowance is subtracted. 
            // Allowance ~5550 tax: 5550 * 0.19 = 1054.5 deduction
            const personalAllowance = 5550;
            let calculatedTax = calculateProgressiveTax(taxableIncome, brackets);
            let allowanceTax = calculateProgressiveTax(personalAllowance, brackets);
            irpf = Math.max(0, calculatedTax - allowanceTax);

        } else if (country.id === 'AD') {
            // Andorra Progressive
            // 0-24000: 0%
            // 24000-40000: 5%
            // >40000: 10%
            const brackets = [
                { limit: 24000, rate: 0.00 },
                { limit: 40000, rate: 0.05 },
                { limit: Infinity, rate: 0.10 },
            ];
            irpf = calculateProgressiveTax(taxableIncome, brackets);

        } else if (country.id === 'EE') {
            // Estonia Flat 20%
            // Basic Exemption (Allowance): ~7848€/year (654/mo) diminishing. 
            // Simplified: If income < 14400, allowance 7848. Diminishes to 0 at 25200.
            let allowance = 7848;
            if (grossSalary > 14400 && grossSalary < 25200) {
                allowance = 7848 - (7848 / 10800) * (grossSalary - 14400);
            } else if (grossSalary >= 25200) {
                allowance = 0;
            }

            const taxableBase = Math.max(0, taxableIncome - allowance);
            irpf = taxableBase * 0.20;
        }

        return {
            countryId: country.id,
            grossSalary,
            netSalary: grossSalary - ssEmployee - irpf,
            employerCost: grossSalary + ssEmployer,
            totalTax: ssEmployee + ssEmployer + irpf,
            employeeTax: ssEmployee + irpf,
            employerTax: ssEmployer,
            breakdown: {
                irpf,
                ssEmployee,
                ssEmployer,
            },
        };
    });
};

function calculateProgressiveTax(income: number, brackets: { limit: number; rate: number }[]) {
    let tax = 0;
    let previousLimit = 0;

    for (const bracket of brackets) {
        if (income > previousLimit) {
            const taxableAmount = Math.min(income, bracket.limit) - previousLimit;
            tax += taxableAmount * bracket.rate;
            previousLimit = bracket.limit;
        } else {
            break;
        }
    }
    return tax;
}
