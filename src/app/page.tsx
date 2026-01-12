import { COUNTRIES } from '@/data/countries';
import { formatCurrency, formatCompact } from '@/utils/formatters';
import Navigation from '@/components/Navigation';
import TaxCalculator from '@/components/TaxCalculator';
import SpendingChart from '@/components/SpendingChart';
import DemographicsSection from '@/components/DemographicsSection';
import DebtChart from '@/components/DebtChart';
import ProjectionsSection from '@/components/ProjectionsSection';
import SourcesSection from '@/components/SourcesSection';
import AboutSection from '@/components/AboutSection';

export default function Home() {
  return (
    <>
      <Navigation />

      <main id="top" className="container">
        {/* Hero Header */}
        <header className="hero-header">
          <div className="hero-badge">
            <span>📊</span>
            <span>Análisis Comparativo 2024</span>
          </div>
          <h1 className="hero-title text-gradient">
            Economía Comparada
          </h1>
          <p className="hero-subtitle">
            Explorando los modelos fiscales y socioeconómicos de tres países europeos con enfoques radicalmente diferentes.
          </p>
          <p className="hero-meta">
            Datos oficiales: Eurostat, INE, Banco Mundial • Actualizado Enero 2024
          </p>
        </header>

        {/* KPI Cards */}
        <section className="kpi-grid">
          {COUNTRIES.map((country) => (
            <article
              key={country.id}
              className="kpi-card glass-panel"
              style={{ '--card-color': `var(--color-${country.id.toLowerCase()})` } as React.CSSProperties}
            >
              <div className="kpi-header">
                <div className="kpi-country">
                  <span className="kpi-flag">{country.flag}</span>
                  <span className="kpi-name">{country.name}</span>
                </div>
                <span className="kpi-tag">{country.id}</span>
              </div>

              <div className="kpi-stats">
                <div className="kpi-stat">
                  <p className="kpi-stat-label">PIB Per Cápita (PPA)</p>
                  <div className="kpi-stat-value">
                    {formatCurrency(country.gdpPerCapita.ppp, 'USD')}
                  </div>
                  <p className="kpi-stat-meta">
                    Fuente: {country.gdpPerCapita.source}
                  </p>
                </div>

                <div className="kpi-stat">
                  <p className="kpi-stat-label">IRPF Máximo</p>
                  <div className="kpi-stat-value negative">
                    {country.tax.incomeTaxMax}%
                  </div>
                  <p className="kpi-stat-meta">
                    IVA: {country.tax.vat}% • Sociedades: {country.tax.corporateTax}%
                  </p>
                </div>

                <div className="kpi-stat">
                  <p className="kpi-stat-label">Desempleo / Deuda</p>
                  <div className="kpi-stat-value negative">
                    {country.labor.unemploymentRate}% / {country.debt.percentGDP}%
                  </div>
                  <p className="kpi-stat-meta">
                    Tasa paro / Deuda (% PIB)
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Tax Calculator */}
        <div id="calculator">
          <TaxCalculator />
        </div>

        {/* Spending & Debt Side by Side */}
        <section id="spending" className="spending-debt-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem', marginBottom: '4rem' }}>
          <SpendingChart />
          <DebtChart />
        </section>

        {/* Demographics */}
        <div id="demographics">
          <DemographicsSection />
        </div>

        {/* Projections 2050 */}
        <ProjectionsSection />

        {/* Sources */}
        <SourcesSection />

        {/* About */}
        <AboutSection />

        {/* Footer */}
        <footer className="footer">
          <p>© 2024 Comparativa Fiscal · Built with Next.js, D3.js & Framer Motion</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
            Los datos mostrados son aproximaciones basadas en fuentes oficiales y pueden no reflejar situaciones particulares.
          </p>
        </footer>
      </main>
    </>
  );
}
