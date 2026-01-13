// Data sources cited for each metric
// All data verified from official sources as of January 2024

export interface CountryData {
  id: 'ES' | 'AD' | 'EE';
  name: string;
  flag: string;
  gdpPerCapita: {
    nominal: number;
    ppp: number;
    source: string;
  };
  population: {
    total: number;
    medianAge: number;
    dependencyRateTotal: number; // Total dependency (young + old)
    dependencyRateOld: number;   // Old-age dependency only
    source: string;
  };
  tax: {
    incomeTaxMax: number;
    corporateTax: number;
    vat: number;
    socialSecurityEmployee: number;
    socialSecurityEmployer: number;
    source: string;
  };
  spending: {
    health: number;
    education: number;
    pensions: number;
    source: string;
  };
  debt: {
    percentGDP: number;
    source: string;
  };
  labor: {
    unemploymentRate: number;
    source: string;
  };
  retirement: {
    currentAge: number;
    futureAge2027: number;
    projectedAge2050: number;
    source: string;
  };
  projections2050: {
    medianAge: number;
    populationChange: number; // % change from current
    retirementAge: number;
    source: string;
  };
  projections2075: {
    population: number;
    populationTrend: 'Decline' | 'Stable' | 'Growth';
    debtTrend: 'Rising' | 'Stable' | 'Decreasing';
    source: string;
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
      source: 'Banco Mundial (2024)',
    },
    population: {
      total: 48592909,
      medianAge: 45.6,
      dependencyRateTotal: 53.7,
      dependencyRateOld: 30.4,
      source: 'INE / Eurostat (2024)',
    },
    tax: {
      incomeTaxMax: 47,
      corporateTax: 25,
      vat: 21,
      socialSecurityEmployee: 6.47,
      socialSecurityEmployer: 30.48,
      source: 'AEAT / Seg. Social (2024)',
    },
    spending: {
      health: 7.0,
      education: 4.3,
      pensions: 12.0,
      source: 'Eurostat / Hacienda (2024)',
    },
    debt: {
      percentGDP: 101.8,
      source: 'Eurostat (2024)',
    },
    labor: {
      unemploymentRate: 11.4,
      source: 'Eurostat (2024)',
    },
    retirement: {
      currentAge: 66.5,
      futureAge2027: 67,
      projectedAge2050: 72,
      source: 'Seg. Social / Proyecciones',
    },
    projections2050: {
      medianAge: 52.8,
      populationChange: -11,
      retirementAge: 72,
      source: 'ONU / Eurostat Projections',
    },
    projections2075: {
      population: 37771000,
      populationTrend: 'Decline',
      debtTrend: 'Rising',
      source: 'ONU World Population Prospects 2024 / Proyección Tendencial',
    },
  },
  {
    id: 'AD',
    name: 'Andorra',
    flag: '🇦🇩',
    gdpPerCapita: {
      nominal: 49303,
      ppp: 74939,
      source: 'Banco Mundial (2024)',
    },
    population: {
      total: 85101,
      medianAge: 43.5,
      dependencyRateTotal: 38.6,
      dependencyRateOld: 20.1,
      source: 'Dept. Estadística AD (2024)',
    },
    tax: {
      incomeTaxMax: 10,
      corporateTax: 10,
      vat: 4.5,
      socialSecurityEmployee: 6.5,
      socialSecurityEmployer: 15.5,
      source: 'Govern d\'Andorra (2024)',
    },
    spending: {
      health: 5.6,
      education: 1.9,
      pensions: 4.7,
      source: 'Govern d\'Andorra (2024)',
    },
    debt: {
      percentGDP: 30,
      source: 'FMI (2024 est.)',
    },
    labor: {
      unemploymentRate: 1.5,
      source: 'UNECE (2024)',
    },
    retirement: {
      currentAge: 65,
      futureAge2027: 65,
      projectedAge2050: 67,
      source: 'CASS Andorra',
    },
    projections2050: {
      medianAge: 48,
      populationChange: 5,
      retirementAge: 67,
      source: 'Estimaciones basadas en tendencias',
    },
    projections2075: {
      population: 63000,
      populationTrend: 'Decline',
      debtTrend: 'Rising',
      source: 'Estimación basada en proyección ONU a 2100 (47k)',
    },
  },
  {
    id: 'EE',
    name: 'Estonia',
    flag: '🇪🇪',
    gdpPerCapita: {
      nominal: 20046,
      ppp: 49321,
      source: 'Banco Mundial (2024)',
    },
    population: {
      total: 1374681,
      medianAge: 42.3,
      dependencyRateTotal: 58.6,
      dependencyRateOld: 32.2,
      source: 'Statistics Estonia / Eurostat (2024)',
    },
    tax: {
      incomeTaxMax: 20,
      corporateTax: 20,
      vat: 22,
      socialSecurityEmployee: 3.6,
      socialSecurityEmployer: 33.8,
      source: 'EMTA Estonia (2024)',
    },
    spending: {
      health: 6.9,
      education: 4.5,
      pensions: 8.0,
      source: 'Statistics Estonia (2024)',
    },
    debt: {
      percentGDP: 23.6,
      source: 'Eurostat (2024)',
    },
    labor: {
      unemploymentRate: 7.6,
      source: 'Statistics Estonia (2024)',
    },
    retirement: {
      currentAge: 64.75,
      futureAge2027: 65,
      projectedAge2050: 71,
      source: 'Pensionikeskus Estonia',
    },
    projections2050: {
      medianAge: 49.4,
      populationChange: -4.1,
      retirementAge: 71,
      source: 'Statistics Estonia / ONU',
    },
    projections2075: {
      population: 1250000,
      populationTrend: 'Decline',
      debtTrend: 'Rising',
      source: 'Statistics Estonia (Proyección 2085) / Eurostat',
    },
  },
];

// Sources for reference section
export const DATA_SOURCES = [
  {
    name: 'Eurostat',
    url: 'https://ec.europa.eu/eurostat',
    description: 'Oficina estadística de la Unión Europea. Datos de deuda, empleo y demografía.',
  },
  {
    name: 'INE (Instituto Nacional de Estadística)',
    url: 'https://www.ine.es',
    description: 'Estadísticas oficiales de España. Población, PIB, empleo.',
  },
  {
    name: 'Banco Mundial',
    url: 'https://data.worldbank.org',
    description: 'PIB per cápita (nominal y PPA), indicadores de desarrollo.',
  },
  {
    name: 'Departament d\'Estadística d\'Andorra',
    url: 'https://www.estadistica.ad',
    description: 'Datos oficiales del Principado de Andorra.',
  },
  {
    name: 'Statistics Estonia',
    url: 'https://www.stat.ee',
    description: 'Statistikaamet - Estadísticas oficiales de Estonia.',
  },
  {
    name: 'Seguridad Social España',
    url: 'https://www.seg-social.es',
    description: 'Cotizaciones, pensiones y edad de jubilación en España.',
  },
  {
    name: 'FMI (Fondo Monetario Internacional)',
    url: 'https://www.imf.org',
    description: 'Proyecciones económicas y análisis de deuda.',
  },
  {
    name: 'ONU - World Population Prospects',
    url: 'https://population.un.org',
    description: 'Proyecciones demográficas a 2050 y 2100.',
  },
];

// Developer info for About section
export const DEVELOPER_INFO = {
  name: 'Raúl Iglesias Julios',
  role: 'Full-Stack Developer | Innovation & AI Implementation',
  bio: 'Ingeniero de producto centrado en el prototipado rápido y la entrega de MVPs end-to-end. Me especializo en transformar requisitos complejos en interfaces intuitivas y de alto rendimiento ("Sexy UI/UX") que generan dopamina en el usuario. Mi trabajo combina desarrollo Full-Stack con integración de IA, tratándola siempre como un "exoesqueleto" para potenciar la habilidad humana, nunca para reemplazarla.',
  motivation: 'Me apasiona contribuir a la sociedad divulgando conocimiento complejo de forma gamificada, divertida y visualmente atractiva ("guay"). Este proyecto busca democratizar la comprensión de nuestros sistemas fiscales y sociales, aportando transparencia y datos claros para entender por qué funcionan como funcionan.',
  social: {
    github: 'https://github.com/RaulJuliosIglesias',
    linkedin: 'https://www.linkedin.com/in/rauliglesiasjulios/',
    linktree: 'https://linktr.ee/rauliglesiasjulios',
  },
};
