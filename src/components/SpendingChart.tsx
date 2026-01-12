'use client';

import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { COUNTRIES } from '@/data/countries';
import { formatPercent } from '@/utils/formatters';

const CATEGORIES = [
    { key: 'health', label: 'Sanidad', color: '#ef4444' },
    { key: 'education', label: 'Educación', color: '#3b82f6' },
    { key: 'pensions', label: 'Pensiones', color: '#eab308' },
] as const;

export default function SpendingChart() {
    const chartRef = useRef<SVGSVGElement>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!chartRef.current || !isClient) return;

        const svg = d3.select(chartRef.current);
        svg.selectAll('*').remove();

        const margin = { top: 40, right: 30, bottom: 40, left: 50 };
        const width = 700 - margin.left - margin.right;
        const height = 350 - margin.top - margin.bottom;

        const g = svg
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // X Scale (Countries)
        const x0 = d3
            .scaleBand()
            .domain(COUNTRIES.map((c) => c.name))
            .range([0, width])
            .padding(0.3);

        // X1 Scale (Categories within each country)
        const x1 = d3
            .scaleBand()
            .domain(CATEGORIES.map((c) => c.key))
            .range([0, x0.bandwidth()])
            .padding(0.1);

        // Y Scale
        const y = d3.scaleLinear().domain([0, 14]).range([height, 0]);

        // X Axis
        g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x0))
            .selectAll('text')
            .attr('fill', '#a1a1aa')
            .style('font-size', '12px');

        g.selectAll('.domain, .tick line').attr('stroke', '#3f3f46');

        // Y Axis
        g.append('g')
            .call(d3.axisLeft(y).ticks(5).tickFormat((d) => `${d}%`))
            .selectAll('text')
            .attr('fill', '#a1a1aa')
            .style('font-size', '11px');

        // Grid lines
        g.append('g')
            .attr('class', 'grid')
            .call(d3.axisLeft(y).ticks(5).tickSize(-width).tickFormat(() => ''))
            .selectAll('line')
            .attr('stroke', 'rgba(255,255,255,0.05)');

        g.select('.grid .domain').remove();

        // Bars
        const countryGroups = g
            .selectAll('.country-group')
            .data(COUNTRIES)
            .enter()
            .append('g')
            .attr('class', 'country-group')
            .attr('transform', (d) => `translate(${x0(d.name)},0)`);

        countryGroups
            .selectAll('rect')
            .data((country) =>
                CATEGORIES.map((cat) => ({
                    key: cat.key,
                    label: cat.label,
                    color: cat.color,
                    value: country.spending[cat.key as 'health' | 'education' | 'pensions'] as number,
                }))
            )
            .enter()
            .append('rect')
            .attr('x', (d) => x1(d.key) || 0)
            .attr('y', height)
            .attr('width', x1.bandwidth())
            .attr('height', 0)
            .attr('fill', (d) => d.color)
            .attr('rx', 4)
            .attr('opacity', 0.85)
            .transition()
            .duration(800)
            .delay((_, i) => i * 100)
            .attr('y', (d) => y(d.value))
            .attr('height', (d) => height - y(d.value));

        // Value labels on bars
        countryGroups
            .selectAll('.bar-label')
            .data((country) =>
                CATEGORIES.map((cat) => ({
                    key: cat.key,
                    value: country.spending[cat.key as 'health' | 'education' | 'pensions'] as number,
                }))
            )
            .enter()
            .append('text')
            .attr('class', 'bar-label')
            .attr('x', (d) => (x1(d.key) || 0) + x1.bandwidth() / 2)
            .attr('y', (d) => y(d.value) - 6)
            .attr('text-anchor', 'middle')
            .attr('fill', '#fff')
            .attr('font-size', '10px')
            .attr('font-weight', '600')
            .attr('opacity', 0)
            .text((d) => `${d.value}%`)
            .transition()
            .duration(500)
            .delay(800)
            .attr('opacity', 1);

    }, [isClient]);

    if (!isClient) {
        return (
            <section className="spending-chart-section glass-panel">
                <div className="tax-calculator-loading">Cargando gráfico...</div>
            </section>
        );
    }

    return (
        <section className="spending-chart-section glass-panel">
            <div className="spending-header">
                <h2 className="spending-title">
                    <span>📈</span>
                    Gasto Público por Sector
                </h2>
                <p className="spending-subtitle">Porcentaje del PIB destinado a sanidad, educación y pensiones</p>
            </div>

            <div className="spending-chart-container">
                <svg ref={chartRef}></svg>
            </div>

            {/* Legend */}
            <div className="spending-legend">
                {CATEGORIES.map((cat) => (
                    <div key={cat.key} className="spending-legend-item">
                        <span className="spending-legend-color" style={{ backgroundColor: cat.color }}></span>
                        <span className="spending-legend-label">{cat.label}</span>
                    </div>
                ))}
            </div>

            <p className="spending-note">
                * España destina una proporción significativamente mayor de su PIB a pensiones debido a su estructura demográfica envejecida.
            </p>
        </section>
    );
}
