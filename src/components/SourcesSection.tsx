'use client';

import { DATA_SOURCES } from '@/data/countries';

export default function SourcesSection() {
    return (
        <section id="sources" className="sources-section glass-panel">
            <div className="sources-header">
                <h2 className="sources-title">
                    <span>📚</span>
                    Fuentes y Referencias
                </h2>
                <p className="sources-subtitle">
                    Todos los datos presentados provienen de fuentes oficiales y verificables
                </p>
            </div>

            <div className="sources-grid">
                {DATA_SOURCES.map((source) => (
                    <a
                        key={source.name}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="source-card"
                    >
                        <div className="source-card-header">
                            <span className="source-icon">🔗</span>
                            <h3 className="source-name">{source.name}</h3>
                        </div>
                        <p className="source-description">{source.description}</p>
                        <span className="source-link">Visitar sitio →</span>
                    </a>
                ))}
            </div>

            <div className="sources-note">
                <div className="sources-note-icon">ℹ️</div>
                <div className="sources-note-content">
                    <strong>Nota metodológica:</strong> Los datos corresponden principalmente al año fiscal 2024 o al último año disponible en cada fuente.
                    Las proyecciones a 2050 se basan en modelos demográficos de Eurostat y Naciones Unidas (ONU World Population Prospects).
                    Los cálculos de impuestos son aproximaciones basadas en tipos generales y pueden variar según situaciones individuales.
                </div>
            </div>
        </section>
    );
}
