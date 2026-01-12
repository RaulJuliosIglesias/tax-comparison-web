import { COUNTRIES } from '@/data/countries';
import { formatCurrency, formatCompact } from '@/utils/formatters';
import TaxCalculator from '@/components/TaxCalculator';
import SpendingChart from '@/components/SpendingChart';
import DemographicsSection from '@/components/DemographicsSection';

export default function Home() {
  return (
    <main className="container">
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
                  Nominal: {formatCurrency(country.gdpPerCapita.nominal, 'USD')}
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
                <p className="kpi-stat-label">Población</p>
                <div className="kpi-stat-value">
                  {formatCompact(country.population.total)}
                </div>
                <p className="kpi-stat-meta">
                  Edad media: {country.population.medianAge} años • Dependencia: {country.population.dependencyRate}%
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Tax Calculator */}
      <TaxCalculator />

      {/* Spending Chart */}
      <SpendingChart />

      {/* Demographics */}
      <DemographicsSection />

      {/* Info Section */}
      <section className="info-section glass-panel">
        <h3 className="info-title text-gradient">¿Por qué esta comparativa?</h3>
        <p className="info-text">
          Analizamos tres modelos europeos distintos: el <strong>estado de bienestar tradicional</strong> de alta presión fiscal (España),
          un <strong>modelo de baja tributación</strong> y alta eficiencia (Andorra), y el <strong>modelo digital nórdico-báltico</strong> (Estonia).
          <br /><br />
          Explora cómo cada sistema gestiona la riqueza, la demografía y los servicios públicos, y descubre
          cuánto impacta realmente en tu bolsillo vivir en uno u otro lugar.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 Comparativa Fiscal · Built with Next.js, D3.js & Framer Motion</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
          Los datos mostrados son aproximaciones basadas en fuentes oficiales y pueden no reflejar situaciones particulares.
        </p>
      </footer>
    </main>
  );
}
