<script>
      /**
         * Assignment name: Inclass Svelte + D3
         * First name: Shreya
         * Last name: Juka Reddy
         * Student ID: 801391084
     */
    import * as d3 from 'd3';
    import { config } from '$lib/state/state.svelte';
    import { formatAxes } from '$lib/utils/utils.svelte';
  
    let { data, colorScale } = $props();
  
    const containerWidth = $derived(config.regionChart.containerWidth);
    const containerHeight = $derived(config.regionChart.containerHeight);
    const margin = $derived(config.regionChart.margin);
  
    const width = $derived(containerWidth - margin.left - margin.right);
    const height = $derived(containerHeight - margin.top - margin.bottom);
  
    const xValue = d => d.count;
    const yValue = d => d.key;
    const colorValue = d => d.key;
  
    const aggregatedData = $derived.by(() => {
      const regionMap = d3.rollups(data, v => v.length, d => d.region);
      let formatted = Array.from(regionMap, ([key, count]) => ({ key, count }));
      return formatted.sort((a, b) => d3.descending(a.count, b.count));
    });
  
    const xScale = $derived(
      d3.scaleLinear()
        .domain([0, d3.max(aggregatedData, xValue)])
        .range([0, width])
    );
  
    const yScale = $derived(
      d3.scaleBand()
        .domain(aggregatedData.map(yValue))
        .range([0, height])
        .padding(0.2)
    );
  
    const xAxis = $derived(d3.axisBottom(xScale).ticks(5).tickSizeOuter(0));
    const yAxis = $derived(d3.axisLeft(yScale).tickSizeOuter(0));
  
    let gx;
    let gy;
  
    $effect(() => {
      d3.select(gx).call(xAxis);
      d3.select(gy).call(yAxis);
      formatAxes();
    });
  </script>
  
  <svg id="regionchart" width={containerWidth} height={containerHeight}>
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <g class="axis x-axis" transform={`translate(0, ${height})`} bind:this={gx}></g>
      <g class="axis y-axis" bind:this={gy}></g>
  
      <g>
        {#each aggregatedData as d}
          <rect
            class="bar"
            y={yScale(yValue(d))}
            width={xScale(xValue(d))}
            height={yScale.bandwidth()}
            fill={colorScale(colorValue(d))}
          />
        {/each}
      </g>
  
      <text class="label axis-title" x={width} y={height + 35} text-anchor="end">
        Trails Count
      </text>
      
      <text
      class="label axis-title"
      x={0}
      y={-20}
      text-anchor="start"
    >
      Region
    </text>
    
      
    </g>
  </svg>
  
  <style>
    .bar:hover {
      stroke: #333;
    }
  
    .axis-title {
      font-size: 13px;
      fill: #888;
    }
  </style>
  