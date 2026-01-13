'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { calculateTax, TaxResult } from '@/utils/taxCalculations';
import { COUNTRIES, CountryData } from '@/data/countries';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import { motion, AnimatePresence } from 'framer-motion';
import * as d3 from 'd3';

// Color mapping for countries
const COUNTRY_COLORS: Record<string, { primary: string; secondary: string; glow: string }> = {
    ES: { primary: '#ef4444', secondary: '#dc2626', glow: 'rgba(239, 68, 68, 0.3)' },
    AD: { primary: '#eab308', secondary: '#ca8a04', glow: 'rgba(234, 179, 8, 0.3)' },
    EE: { primary: '#3b82f6', secondary: '#2563eb', glow: 'rgba(59, 130, 246, 0.3)' },
};

// Wealth Simulator Helper
function calculateCompoundWealth(monthlySavings: number, years: number, rate: number = 0.05) {
    const data = [];
    let balance = 0;
    for (let year = 1; year <= years; year++) {
        for (let m = 0; m < 12; m++) {
            balance = (balance + monthlySavings) * (1 + rate / 12);
        }
        data.push({ year, value: balance });
    }
    return data;
}

interface BreakdownBarProps {
    result: TaxResult;
    country: CountryData;
    maxEmployerCost: number;
}

function BreakdownBar({ result, country, maxEmployerCost }: BreakdownBarProps) {
    const colors = COUNTRY_COLORS[country.id];
    const barHeight = 280;

    // Calculate heights relative to max employer cost
    const scale = (value: number) => (value / maxEmployerCost) * barHeight;

    const netHeight = scale(result.netSalary);
    const irpfHeight = scale(result.breakdown.irpf);
    const ssEmployeeHeight = scale(result.breakdown.ssEmployee);
    const ssEmployerHeight = scale(result.breakdown.ssEmployer);

    return (
        <div className="tax-card">
            <div className="tax-card-header" style={{ borderColor: colors.primary }}>
                <span className="tax-card-flag">{country.flag}</span>
                <div>
                    <h3 className="tax-card-country">{country.name}</h3>
                    <span className="tax-card-id">{country.id}</span>
                </div>
            </div>

            {/* Stacked Bar Chart */}
            <div className="tax-bar-container">
                <div className="tax-bar-wrapper">
                    {/* Employer SS */}
                    <motion.div
                        layout
                        initial={{ height: 0 }}
                        animate={{ height: ssEmployerHeight }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                        className="tax-bar-segment tax-bar-ss-employer"
                        style={{ backgroundColor: `${colors.primary}33`, borderColor: `${colors.primary}66` }}
                    >
                        <span className="tax-bar-label">SS Empresa</span>
                        <span className="tax-bar-value">{formatCurrency(result.breakdown.ssEmployer)}</span>
                    </motion.div>

                    {/* Employee SS */}
                    <motion.div
                        layout
                        initial={{ height: 0 }}
                        animate={{ height: ssEmployeeHeight }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.05 }}
                        className="tax-bar-segment tax-bar-ss-employee"
                    >
                        <span className="tax-bar-label">SS Empleado</span>
                        <span className="tax-bar-value">{formatCurrency(result.breakdown.ssEmployee)}</span>
                    </motion.div>

                    {/* IRPF */}
                    <motion.div
                        layout
                        initial={{ height: 0 }}
                        animate={{ height: irpfHeight }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.1 }}
                        className="tax-bar-segment tax-bar-irpf"
                    >
                        <span className="tax-bar-label">IRPF</span>
                        <span className="tax-bar-value">{formatCurrency(result.breakdown.irpf)}</span>
                    </motion.div>

                    {/* Net Salary */}
                    <motion.div
                        layout
                        initial={{ height: 0 }}
                        animate={{ height: netHeight }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.15 }}
                        className="tax-bar-segment tax-bar-net"
                        style={{
                            backgroundColor: `${colors.primary}`,
                            boxShadow: `0 0 30px ${colors.glow}`
                        }}
                    >
                        <span className="tax-bar-label-large">Neto</span>
                        <span className="tax-bar-value-large">{formatCurrency(result.netSalary)}</span>
                    </motion.div>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="tax-summary">
                <div className="tax-summary-row">
                    <span className="tax-summary-label">Coste Total Empresa</span>
                    <span className="tax-summary-value">{formatCurrency(result.employerCost)}</span>
                </div>
                <div className="tax-summary-row tax-summary-highlight">
                    <span className="tax-summary-label">Neto Mensual (12 pagas)</span>
                    <span className="tax-summary-value-highlight">
                        {formatCurrency(result.netSalary / 12)}
                    </span>
                </div>
                <div className="tax-summary-row tax-summary-negative">
                    <span className="tax-summary-label">Total Impuestos</span>
                    <span className="tax-summary-value-negative">{formatCurrency(result.totalTax)}</span>
                </div>
                <div className="tax-summary-row source-row" style={{ marginTop: '0.5rem', fontSize: '0.65rem', color: '#6b7280' }}>
                    Fuente: {country.tax.source}
                </div>
            </div>
        </div>
    );
}

// Wealth Chart Component (Inner)
function WealthChart({ savingsMonthly, countryName }: { savingsMonthly: number, countryName: string }) {
    const chartRef = useRef<SVGSVGElement>(null);
    const years = 20;
    const data = calculateCompoundWealth(savingsMonthly, years, 0.05); // 5% return
    const conservative = calculateCompoundWealth(savingsMonthly, years, 0.02); // 2% return

    useEffect(() => {
        if (!chartRef.current) return;
        const svg = d3.select(chartRef.current);
        svg.selectAll('*').remove();

        const width = 300;
        const height = 150;
        const margin = { top: 10, right: 10, bottom: 20, left: 40 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const g = svg.attr('width', width).attr('height', height).append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear().domain([0, years]).range([0, innerWidth]);
        const y = d3.scaleLinear().domain([0, data[data.length - 1].value]).range([innerHeight, 0]);

        // Area
        const area = d3.area<{ year: number, value: number }>()
            .x(d => x(d.year))
            .y0(innerHeight)
            .y1(d => y(d.value))
            .curve(d3.curveMonotoneX);

        g.append('path')
            .datum(data)
            .attr('fill', 'rgba(34, 197, 94, 0.2)')
            .attr('d', area);

        // Line
        const line = d3.line<{ year: number, value: number }>()
            .x(d => x(d.year))
            .y(d => y(d.value))
            .curve(d3.curveMonotoneX);

        g.append('path')
            .datum(data)
            .attr('stroke', '#22c55e')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('d', line);

        // Axis
        g.append('g').attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(x).ticks(5).tickSize(0).tickPadding(5))
            .select('.domain').remove();

        g.append('text')
            .attr('x', innerWidth)
            .attr('y', innerHeight - 5)
            .attr('text-anchor', 'end')
            .attr('fill', '#fff')
            .style('font-size', '10px')
            .text(`${formatNumber(data[data.length - 1].value)} €`);

    }, [savingsMonthly]);

    return (
        <div className="wealth-chart-wrapper">
            <h4 className="wealth-title">Proyección a 20 años (Interés Compuesto 5%)</h4>
            <svg ref={chartRef} style={{ width: '100%', height: '150px' }}></svg>
            <p className="wealth-note">Si inviertes el ahorro fiscal mensual en un fondo indexado.</p>
        </div>
    );
}

export default function TaxCalculator() {
    const [salary, setSalary] = useState(35000);
    const [isClient, setIsClient] = useState(false);
    const [showWealth, setShowWealth] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setIsClient(true);
    }, []);

    const results = useMemo(() => calculateTax(salary), [salary]);
    const maxEmployerCost = Math.max(...results.map((r) => r.employerCost));

    // Pre-calculate
    const bestNet = results.reduce((a, b) => (a.netSalary > b.netSalary ? a : b));
    const worstNet = results.reduce((a, b) => (a.netSalary < b.netSalary ? a : b));
    const netDifferenceYearly = bestNet.netSalary - worstNet.netSalary;
    const netDifferenceMonthly = netDifferenceYearly / 12;

    if (!isClient) {
        return (
            <section className="tax-calculator-section">
                <div className="tax-calculator-loading">Cargando calculadora...</div>
            </section>
        );
    }

    return (
        <section className="tax-calculator-section glass-panel">
            <div className="tax-calculator-header">
                <h2 className="tax-calculator-title">
                    <span className="tax-calculator-icon">💰</span>
                    Calculadora de Realidad Fiscal
                </h2>
                <p className="tax-calculator-subtitle">
                    Compara el coste real de un empleado y lo que queda en su bolsillo
                </p>
            </div>

            {/* Salary Slider */}
            <div className="tax-slider-container">
                <div className="tax-slider-labels">
                    <span className="tax-slider-min">15.000 €</span>
                    <div className="tax-slider-current">
                        <span className="tax-slider-label">Salario Bruto Anual</span>
                        <motion.span
                            key={salary}
                            initial={{ scale: 1.1, color: '#60a5fa' }}
                            animate={{ scale: 1, color: '#ffffff' }}
                            className="tax-slider-value"
                        >
                            {formatCurrency(salary)}
                        </motion.span>
                    </div>
                    <span className="tax-slider-max">150.000 €</span>
                </div>

                <div className="tax-slider-track-container">
                    <input
                        type="range"
                        min="15000"
                        max="150000"
                        step="1000"
                        value={salary}
                        onChange={(e) => setSalary(Number(e.target.value))}
                        className="tax-slider-input"
                    />
                    <div
                        className="tax-slider-fill"
                        style={{ width: `${((salary - 15000) / (150000 - 15000)) * 100}%` }}
                    />
                </div>

                {/* Quick presets */}
                <div className="tax-slider-presets">
                    {[20000, 30000, 50000, 75000, 100000].map((preset) => (
                        <button
                            key={preset}
                            onClick={() => setSalary(preset)}
                            className={`tax-slider-preset ${salary === preset ? 'active' : ''}`}
                        >
                            {formatCurrency(preset)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Insight Banner & Wealth Simulator Toggle */}
            <motion.div
                key={`${bestNet.countryId}-${netDifferenceYearly}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="tax-insight-wrapper"
            >
                <div className="tax-insight-banner">
                    <span className="tax-insight-icon">💡</span>
                    <span className="tax-insight-text">
                        Con {formatCurrency(salary)}, ganarías <strong className="tax-insight-highlight">{formatCurrency(netDifferenceYearly)}</strong> más al año
                        en <strong>{COUNTRIES.find(c => c.id === bestNet.countryId)?.name}</strong>.
                    </span>
                    <button
                        className="wealth-toggle-btn"
                        onClick={() => setShowWealth(!showWealth)}
                    >
                        {showWealth ? 'Ocultar Proyección' : 'Ver a Futuro 🚀'}
                    </button>
                </div>

                <AnimatePresence>
                    {showWealth && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="wealth-simulator-container"
                        >
                            <WealthChart
                                savingsMonthly={netDifferenceMonthly}
                                countryName={COUNTRIES.find(c => c.id === bestNet.countryId)?.name || ''}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Bar Charts Grid */}
            <div className="tax-cards-grid">
                <AnimatePresence mode="wait">
                    {results.map((result) => {
                        const country = COUNTRIES.find((c) => c.id === result.countryId)!;
                        return (
                            <BreakdownBar
                                key={result.countryId}
                                result={result}
                                country={country}
                                maxEmployerCost={maxEmployerCost}
                            />
                        );
                    })}
                </AnimatePresence>
            </div>

            <p className="tax-disclaimer">
                * Cálculos aproximados basados en tipos generales 2024. No incluye deducciones específicas. Fuente: AEAT / Govern d'Andorra / EMTA.
            </p>
        </section>
    );
}
