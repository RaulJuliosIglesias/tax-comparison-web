'use client';

import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { COUNTRIES } from '@/data/countries';

export default function DebtChart() {
    const chartRef = useRef<SVGSVGElement>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!chartRef.current || !isClient) return;

        const svg = d3.select(chartRef.current);
        svg.selectAll('*').remove();

        const width = 400;
        const height = 300;
        const margin = { top: 30, right: 30, bottom: 50, left: 60 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const g = svg
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Data
        const data = COUNTRIES.map(c => ({
            name: c.name,
            debt: c.debt.percentGDP,
            color: `var(--color-${c.id.toLowerCase()})`,
        }));

        // Scales
        const x = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([0, innerWidth])
            .padding(0.4);

        const y = d3.scaleLinear()
            .domain([0, 120])
            .range([innerHeight, 0]);

        // Reference line at 60% (Maastricht)
        g.append('line')
            .attr('x1', 0)
            .attr('x2', innerWidth)
            .attr('y1', y(60))
            .attr('y2', y(60))
            .attr('stroke', '#ef4444')
            .attr('stroke-dasharray', '5,5')
            .attr('opacity', 0.6);

        g.append('text')
            .attr('x', innerWidth)
            .attr('y', y(60) - 5)
            .attr('text-anchor', 'end')
            .attr('fill', '#ef4444')
            .attr('font-size', '10px')
            .text('Límite Maastricht (60%)');

        // Axes
        g.append('g')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('fill', '#a1a1aa')
            .style('font-size', '11px');

        g.append('g')
            .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}%`))
            .selectAll('text')
            .attr('fill', '#a1a1aa')
            .style('font-size', '10px');

        g.selectAll('.domain, .tick line').attr('stroke', '#3f3f46');

        // Bars
        g.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', d => x(d.name)!)
            .attr('y', innerHeight)
            .attr('width', x.bandwidth())
            .attr('height', 0)
            .attr('fill', d => d.color)
            .attr('rx', 4)
            .transition()
            .duration(800)
            .delay((_, i) => i * 150)
            .attr('y', d => y(d.debt))
            .attr('height', d => innerHeight - y(d.debt));

        // Labels
        g.selectAll('.label')
            .data(data)
            .enter()
            .append('text')
            .attr('x', d => x(d.name)! + x.bandwidth() / 2)
            .attr('y', d => y(d.debt) - 8)
            .attr('text-anchor', 'middle')
            .attr('fill', '#fff')
            .attr('font-size', '12px')
            .attr('font-weight', '600')
            .attr('opacity', 0)
            .text(d => `${d.debt}%`)
            .transition()
            .duration(500)
            .delay(800)
            .attr('opacity', 1);

    }, [isClient]);

    if (!isClient) {
        return <div className="debt-chart-loading">Cargando...</div>;
    }

    return (
        <div className="debt-chart-container">
            <h3 className="debt-chart-title">💳 Deuda Pública (% PIB)</h3>
            <svg ref={chartRef}></svg>
            <p className="debt-chart-note">
                España tiene la 5ª mayor deuda de la UE. Estonia mantiene una de las más bajas de Europa.
            </p>
        </div>
    );
}
