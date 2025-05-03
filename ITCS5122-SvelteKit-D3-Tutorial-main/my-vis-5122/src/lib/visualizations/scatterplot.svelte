<script>

    /**
        * Assignment name: Inclass Svelte + D3
        * First name: Shreya
        * Last name: Juka Reddy
        * Student ID: 801391084
    */

    import * as d3 from 'd3';

    import { config, tooltip } from '$lib/state/state.svelte';
    let { data, xLabel, yLabel, colorScale } = $props();


    
    const containerWidth = $derived(
        config.scatterPlot.containerWidth
    );
    const containerHeight = $derived(
        config.scatterPlot.containerHeight
    );
    const margin = $derived(
        config.scatterPlot.margin
    );

    const width = $derived(
        containerWidth - margin.left - margin.right
    );
    const height = $derived(
        containerHeight - margin.top - margin.bottom
    );

    const xValue = d => d.distance;
    const yValue = d => d.time;
    const colorValue = d => d.difficulty;

    const xScale = $derived(
        d3.scaleLinear()
            .domain([0, d3.max(data, xValue)])
            .range([0,width])
    );

    const yScale = $derived(
        d3.scaleLinear()
            .domain([0, d3.max(data, yValue)])
            .range([height,0])
    );

    const xAxis = $derived(
  d3.axisBottom(xScale)
    .ticks(6)
    .tickSize(-height - 10)
    .tickPadding(10)
    .tickFormat(d => d + ' km')
);

const yAxis = $derived(
  d3.axisLeft(yScale)
    .ticks(6)
    .tickSize(-width - 10)
    .tickPadding(10)
);

let gx;
let gy;

$effect(() => {
  d3.select(gx)
  .call(xAxis);
  d3.select(gy)
  .call(yAxis);
});






function handleHover(_event, _trail, _region, _distance, _time, _difficulty, _season) {
    tooltip.title = _trail;
    tooltip.region = _region;
    tooltip.distance = _distance;
    tooltip.time = _time;
    tooltip.difficulty = _difficulty;
    tooltip.season = _season;
  
    d3.select('#tooltip')
      .style('display', 'block')
      .style('left', (_event.pageX + 10) + 'px')
.style('top', (_event.pageY - 40) + 'px');

  }






  function handleMouseOut() {
  tooltip.title = '';
  tooltip.region = '';
  tooltip.distance = '';
  tooltip.time = '';
  tooltip.difficulty = '';
  tooltip.season = '';

  d3.select('#tooltip')
    .style('display', 'none');
}


</script>

<svg id="scatterplot" 
width={containerWidth} 
height={containerHeight}>
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <g class="axis x-axis"
         transform={`translate(0, ${height})`}
         bind:this={gx}>
      </g>
      <g class="axis y-axis"
         bind:this={gy}>
      </g>
      <g>
        {#each data as d, i}
          <circle class="point"
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r="5"
            fill={colorScale(colorValue(d))}
            onmouseenter={e => handleHover(e, d.trail, d.region, d.distance, d.time, d.difficulty, d.season)}
            onmouseout={handleMouseOut}
          />
        {/each}
      </g> 
      <g>
        <text class="label axis-title"
          x={width + 10}
          y={height - 15}
          dy=".35em"
          text-anchor="end"
        >
          {xLabel}
        </text>     
        <text class="label axis-title"
          x={-margin.left / 2}
          y={margin.top / 2}
          dy=".35em"
          text-anchor="middle"
        >
          {yLabel}
        </text>
      </g>           
    </g>
  </svg>

  <style>
    .point:hover {
stroke: #333
    }

    .axis-title{
        font-size: 13px;
        fill: #888;
    }
  </style>
  