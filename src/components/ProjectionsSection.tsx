'use client';

import { useEffect, useState } from 'react';
import { COUNTRIES } from '@/data/countries';
import { motion } from 'framer-motion';

export default function ProjectionsSection() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <section id="projections" className="projections-section glass-panel">
                <div className="tax-calculator-loading">Cargando proyecciones...</div>
            </section>
        );
    }

    return (
        <section id="projections" className="projections-section glass-panel">
            <div className="projections-header">
                <h2 className="projections-title">
                    <span>🔮</span>
                    Proyecciones 2050
                </h2>
                <p className="projections-subtitle">
                    Cómo evolucionarán la demografía, las pensiones y la estructura poblacional según los modelos actuales
                </p>
            </div>

            <div className="projections-grid">
                {COUNTRIES.map((country, index) => (
                    <motion.div
                        key={country.id}
                        className="projection-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 }}
                        style={{ '--card-color': `var(--color-${country.id.toLowerCase()})` } as React.CSSProperties}
                    >
                        <div className="projection-card-header">
                            <span className="projection-flag">{country.flag}</span>
                            <h3 className="projection-country">{country.name}</h3>
                        </div>

                        {/* Median Age Comparison */}
                        <div className="projection-metric">
                            <div className="projection-metric-header">
                                <span className="projection-metric-icon">🎂</span>
                                <span className="projection-metric-label">Edad Media</span>
                            </div>
                            <div className="projection-comparison">
                                <div className="projection-now">
                                    <span className="projection-value-small">{country.population.medianAge}</span>
                                    <span className="projection-label">2026</span>
                                </div>
                                <div className="projection-arrow">→</div>
                                <div className="projection-future">
                                    <span className="projection-value-large">{country.projections2050.medianAge}</span>
                                    <span className="projection-label">2050</span>
                                </div>
                                <div className="projection-change negative">
                                    +{(country.projections2050.medianAge - country.population.medianAge).toFixed(1)} años
                                </div>
                            </div>
                        </div>

                        {/* Population Change */}
                        <div className="projection-metric">
                            <div className="projection-metric-header">
                                <span className="projection-metric-icon">👥</span>
                                <span className="projection-metric-label">Cambio Poblacional</span>
                            </div>
                            <div className="projection-single">
                                <span className={`projection-value-large ${country.projections2050.populationChange >= 0 ? 'positive' : 'negative'}`}>
                                    {country.projections2050.populationChange >= 0 ? '+' : ''}{country.projections2050.populationChange}%
                                </span>
                                <span className="projection-detail">
                                    {country.projections2050.populationChange < 0 ? 'Pérdida de población' : 'Crecimiento esperado'}
                                </span>
                            </div>
                        </div>

                        {/* Retirement Age */}
                        <div className="projection-metric">
                            <div className="projection-metric-header">
                                <span className="projection-metric-icon">🏖️</span>
                                <span className="projection-metric-label">Edad de Jubilación</span>
                            </div>
                            <div className="projection-comparison">
                                <div className="projection-now">
                                    <span className="projection-value-small">{country.retirement.currentAge}</span>
                                    <span className="projection-label">2026</span>
                                </div>
                                <div className="projection-arrow">→</div>
                                <div className="projection-future">
                                    <span className="projection-value-large">{country.projections2050.retirementAge}</span>
                                    <span className="projection-label">2050</span>
                                </div>
                                <div className="projection-change negative">
                                    +{(country.projections2050.retirementAge - country.retirement.currentAge).toFixed(1)} años
                                </div>
                            </div>
                        </div>

                        {/* Source */}
                        <div className="projection-source">
                            Fuente: {country.projections2050.source}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="projections-insight">
                <div className="projections-insight-icon">⚠️</div>
                <div className="projections-insight-content">
                    <strong>Alerta demográfica:</strong> España enfrenta el mayor envejecimiento con una edad media proyectada de 52.8 años en 2050
                    y una posible pérdida del 11% de su población. Esto implica una presión sin precedentes sobre el sistema de pensiones,
                    con proyecciones que sitúan la edad de jubilación efectiva en torno a los 72 años si no hay reformas estructurales significativas.
                </div>
            </div>
        </section>
    );
}
