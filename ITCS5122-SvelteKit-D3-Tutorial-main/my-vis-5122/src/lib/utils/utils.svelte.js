import * as d3 from 'd3';

export function formatAxes() {
    d3.selectAll('.axis')
        .selectAll('line')
            .style('fill', 'none')
            .style('stroke', '#ddd')
            .style('shape-rendering', 'crispEdges');
    d3.selectAll('.axis')
        .selectAll('text')
            .style('font-size', '13px')
            .style('fill', '#6b6b6b');
    d3.selectAll('.y-axis')
        .select('.tick:first-child')
            .select('line')
            .style('stroke', '#b1b1b1');
    d3.selectAll('.y-axis')
        .select('.tick:first-child')
            .select('text')
            .style('display', 'none');
    d3.selectAll('.x-axis')
        .select('.tick:first-child')
            .select('text')
            .style('display', 'none');
    d3.selectAll('.axis')
        .selectAll('path')
        .style('display', 'none');
}