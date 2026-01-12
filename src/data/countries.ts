export interface CountryData {
  id: 'ES' | 'AD' | 'EE';
  name: string;
  flag: string; // Emoji for simplicity
  gdpPerCapita: {
    nominal: number;
    ppp: number;
  };
  population: {
    total: number;
    medianAge: number;
    dependencyRate: number; // %
  };
  tax: {
    incomeTaxMax: number; // %
    corporateTax: number; // %
    vat: number; // %
    socialSecurityEmployee: number; // %
    socialSecurityEmployer: number; // %
  };
  spending: {
    health: number; // % GDP
    education: number; // % GDP
    pensions: number; // % GDP (approx)
  };
}

export const COUNTRIES: CountryData[] = [
  {
    id: 'ES',
    name: 'España',
    flag: '🇪🇸',
    gdpPerCapita: {
      nominal: 35326,
      ppp: 56877,
    },
    population: {
      total: 48592909, // 2024 est
      medianAge: 45.6,
      dependencyRate: 53.3,
    },
    tax: {
      incomeTaxMax: 47,
      corporateTax: 25,
      vat: 21,
      socialSecurityEmployee: 6.47,
      socialSecurityEmployer: 30.48,
    },
    spending: {
      health: 7.0,
      education: 4.3,
      pensions: 12.0, // Aprox % PIB (muy alto en presupuesto)
    },
  },
  {
    id: 'AD',
    name: 'Andorra',
    flag: '🇦🇩',
    gdpPerCapita: {
      nominal: 49303,
      ppp: 74939,
    },
    population: {
      total: 85101, // 2024 est
      medianAge: 43.5,
      dependencyRate: 38.6,
    },
    tax: {
      incomeTaxMax: 10,
      corporateTax: 10,
      vat: 4.5, // IGI
      socialSecurityEmployee: 6.5,
      socialSecurityEmployer: 15.5,
    },
    spending: {
      health: 5.6,
      education: 1.9,
      pensions: 4.7,
    },
  },
  {
    id: 'EE',
    name: 'Estonia',
    flag: '🇪🇪',
    gdpPerCapita: {
      nominal: 20046,
      ppp: 49321,
    },
    population: {
      total: 1374681, // 2024 est
      medianAge: 42.3,
      dependencyRate: 59.1,
    },
    tax: {
      incomeTaxMax: 20, // 22% en 2025, ponemos 20 por ahora o nota
      corporateTax: 20, // 0% on retained earnings
      vat: 22,
      socialSecurityEmployee: 1.6, // Unemployment mainly
      socialSecurityEmployer: 33.0,
    },
    spending: {
      health: 6.9,
      education: 4.5,
      pensions: 8.0, // Estimación basada en gasto social
    },
  },
];
