'use client';

import { useEffect, useState } from 'react';
import { COUNTRIES } from '@/data/countries';
import { motion } from 'framer-motion';

export default function DemographicsSection() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <section className="demographics-section glass-panel">
                <div className="tax-calculator-loading">Cargando datos demográficos...</div>
            </section>
        );
    }

    // Find max dependency for scaling
    const maxDependency = Math.max(...COUNTRIES.map(c => c.population.dependencyRateTotal));

    return (
        <section className="demographics-section glass-panel">
            <div className="demographics-header">
                <h2 className="demographics-title">
                    <span>👥</span>
                    Estructura Demográfica
                </h2>
                <p className="demographics-subtitle">
                    Comparativa de envejecimiento y ratio de dependencia (personas inactivas por cada 100 activas)
                </p>
            </div>

            <div className="demographics-grid">
                {COUNTRIES.map((country) => {
                    const dependencyPercent = (country.population.dependencyRateTotal / maxDependency) * 100;

                    return (
                        <div key={country.id} className="demographics-card">
                            <div className="demographics-card-header">
                                <span className="demographics-flag">{country.flag}</span>
                                <span className="demographics-name">{country.name}</span>
                            </div>

                            <div className="demographics-stats">
                                {/* Median Age */}
                                <div className="demographics-stat">
                                    <div className="demographics-stat-icon">🎂</div>
                                    <div className="demographics-stat-content">
                                        <span className="demographics-stat-value">{country.population.medianAge}</span>
                                        <span className="demographics-stat-label">Edad Media</span>
                                    </div>
                                </div>

                                {/* Dependency Ratio */}
                                <div className="demographics-stat">
                                    <div className="demographics-stat-icon">📊</div>
                                    <div className="demographics-stat-content">
                                        <span className="demographics-stat-value">{country.population.dependencyRateTotal}%</span>
                                        <span className="demographics-stat-label">Tasa Dependencia</span>
                                    </div>
                                </div>
                            </div>

                            {/* Visual Dependency Bar */}
                            <div className="demographics-bar-container">
                                <div className="demographics-bar-label">Carga sobre activos</div>
                                <div className="demographics-bar-track">
                                    <motion.div
                                        className="demographics-bar-fill"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${dependencyPercent}%` }}
                                        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                                        style={{
                                            background: country.population.dependencyRateTotal > 50
                                                ? 'linear-gradient(90deg, #ef4444, #f87171)'
                                                : 'linear-gradient(90deg, #22c55e, #4ade80)',
                                        }}
                                    />
                                </div>
                                <div className="demographics-bar-insight">
                                    {country.population.dependencyRateTotal > 50
                                        ? '⚠️ Alta presión sobre el sistema'
                                        : '✅ Ratio sostenible'}
                                </div>
                            </div>

                            {/* Source */}
                            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.75rem', textAlign: 'right' }}>
                                Fuente: {country.population.source}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="demographics-insight-box">
                <div className="demographics-insight-icon">💡</div>
                <div className="demographics-insight-content">
                    <strong>Conclusión:</strong> España tiene el mayor envejecimiento (edad media 45.6 años) y una tasa de dependencia total del 53.7%,
                    lo que genera presión significativa sobre el sistema de pensiones. Estonia, con un 58.6%, tiene el ratio más alto de los tres,
                    indicando un reto demográfico aún mayor. Andorra mantiene el ratio más bajo (~38.6%) gracias a su atractivo para profesionales activos.
                </div>
            </div>
        </section>
    );
}
