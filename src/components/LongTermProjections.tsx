'use client';

import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { COUNTRIES } from '@/data/countries';
import { motion } from 'framer-motion';

export default function LongTermProjections() {
    const chartRef = useRef<SVGSVGElement>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!chartRef.current || !isClient) return;

        const svg = d3.select(chartRef.current);
        svg.selectAll('*').remove();

        const margin = { top: 40, right: 60, bottom: 50, left: 60 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const g = svg
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Prepare Data: Normalize to 100 base index for comparison
        const years = [2026, 2050, 2075];
        const data = COUNTRIES.map(c => {
            const basePop = c.population.total;
            return {
                id: c.id,
                name: c.name,
                color: `var(--color-${c.id.toLowerCase()})`,
                values: [
                    { year: 2026, value: 100 },
                    { year: 2050, value: (c.population.total * (1 + c.projections2050.populationChange / 100)) / basePop * 100 },
                    { year: 2075, value: c.projections2075.population / basePop * 100 },
                ]
            };
        });

        // Scales
        const x = d3.scaleLinear().domain([2026, 2075]).range([0, width]);
        const y = d3.scaleLinear().domain([50, 110]).range([height, 0]);

        // Grid
        const xAxis = d3.axisBottom(x).ticks(3).tickFormat(d3.format('d'));
        const yAxis = d3.axisLeft(y).ticks(5);

        g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(xAxis)
            .attr('class', 'axis')
            .selectAll('text')
            .attr('fill', '#a1a1aa')
            .style('font-size', '12px');

        g.append('g')
            .call(yAxis)
            .attr('class', 'axis')
            .selectAll('text')
            .attr('fill', '#a1a1aa');

        g.selectAll('.domain, .tick line').attr('stroke', '#3f3f46');

        // Add Labels
        g.append('text')
            .attr('x', width / 2)
            .attr('y', height + 40)
            .attr('fill', '#a1a1aa')
            .attr('text-anchor', 'middle')
            .text('Año de Proyección');

        g.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -45)
            .attr('x', -height / 2)
            .attr('fill', '#a1a1aa')
            .attr('text-anchor', 'middle')
            .text('Índice Poblacional (Base 100 = 2026)');

        // Line Generator
        const line = d3.line<{ year: number; value: number }>()
            .x(d => x(d.year))
            .y(d => y(d.value))
            .curve(d3.curveMonotoneX);

        // Draw Lines
        data.forEach((country) => {
            const path = g.append('path')
                .datum(country.values)
                .attr('fill', 'none')
                .attr('stroke', country.color)
                .attr('stroke-width', 3)
                .attr('d', line);

            // Animation
            const totalLength = path.node()?.getTotalLength() || 0;
            path
                .attr('stroke-dasharray', totalLength + ' ' + totalLength)
                .attr('stroke-dashoffset', totalLength)
                .transition()
                .duration(2000)
                .ease(d3.easeCubicOut)
                .attr('stroke-dashoffset', 0);

            // Draw circles for data points
            g.selectAll(`.dot-${country.id}`)
                .data(country.values)
                .enter()
                .append('circle')
                .attr('cx', d => x(d.year))
                .attr('cy', d => y(d.value))
                .attr('r', 0)
                .attr('fill', country.color)
                .attr('stroke', '#000')
                .attr('stroke-width', 2)
                .transition()
                .delay((d, i) => i * 600)
                .duration(500)
                .attr('r', 5);

            // Add Country Label at the end
            g.append('text')
                .attr('x', x(2075) + 10)
                .attr('y', y(country.values[2].value))
                .attr('fill', country.color)
                .attr('alignment-baseline', 'middle')
                .style('font-size', '12px')
                .style('font-weight', 'bold')
                .text(country.name)
                .attr('opacity', 0)
                .transition()
                .delay(2000)
                .duration(500)
                .attr('opacity', 1);
        });

    }, [isClient]);

    if (!isClient) return <div className="loading">Cargando proyecciones 2075...</div>;

    return (
        <section className="long-term-section glass-panel">
            <div className="long-term-header">
                <h2 className="long-term-title">
                    <span>🚀</span>
                    Futuro 2075
                </h2>
                <p className="long-term-subtitle">
                    Proyección del declive poblacional y tendencias de deuda a largo plazo.
                </p>
            </div>

            <div className="long-term-chart-container">
                <svg ref={chartRef} className="long-term-chart"></svg>
            </div>

            <div className="long-term-grid">
                {COUNTRIES.map(country => (
                    <motion.div
                        key={country.id}
                        className="long-term-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        style={{ borderTop: `3px solid var(--color-${country.id.toLowerCase()})` }}
                    >
                        <div className="long-term-card-header">
                            <span className="long-term-flag">{country.flag}</span>
                            <span className="long-term-name">{country.name}</span>
                        </div>

                        <div className="long-term-stat">
                            <span className="long-term-label">Población 2075</span>
                            <span className="long-term-value">
                                {(country.projections2075.population / 1000000).toFixed(2)}M
                            </span>
                            <span className={`long-term-trend ${country.projections2075.populationTrend.toLowerCase()}`}>
                                {country.projections2075.populationTrend === 'Decline' ? '📉 Declive' : '📈 Crecimiento'}
                            </span>
                        </div>

                        <div className="long-term-stat">
                            <span className="long-term-label">Tendencia Deuda</span>
                            <span className={`long-term-value-text ${country.projections2075.debtTrend === 'Rising' ? 'negative' : 'positive'}`}>
                                {country.projections2075.debtTrend === 'Rising' ? '⬆️ Al alza' : '➡️ Estable'}
                            </span>
                        </div>

                        <div className="long-term-source">
                            Fuente: {country.projections2075.source}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="long-term-insight">
                <p>
                    <strong>Nota Científica:</strong> Las proyecciones a 2075 muestran un <strong>invierno demográfico</strong> severo en el sur de Europa.
                    España podría perder más del 20% de su población actual, lo que dispararía la deuda per cápita si no aumenta la productividad.
                    Estonia y Andorra enfrentan retos similares de sostenibilidad a muy largo plazo.
                </p>
            </div>
        </section>
    );
}
