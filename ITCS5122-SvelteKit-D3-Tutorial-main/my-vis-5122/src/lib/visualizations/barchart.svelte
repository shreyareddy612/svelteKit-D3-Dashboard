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
  import { dragDisable } from 'd3';
  
    let { data, yLabel, colorScale, difficultyFilter, filterData } = $props();
  
    const containerWidth = $derived(config.barChart.containerWidth);
    const containerHeight = $derived(config.barChart.containerHeight);
    const margin = $derived(config.barChart.margin);
  
    const width = $derived(containerWidth - margin.left - margin.right);
    const height = $derived(containerHeight - margin.top - margin.bottom);
  
    const xValue = d => d.key;
    const yValue = d => d.count;
    const colorValue = d => d.key;
  
    const aggregatedData = $derived.by(() => {
      const aggregatedDataMap = d3.rollups(data, v => v.length, d => d.difficulty);
      const orderedKeys = ['Easy', 'Intermediate', 'Difficult'];
      let formattedData = Array.from(aggregatedDataMap, ([key, count]) => ({ key, count }));
      formattedData = formattedData.sort((a, b) =>
        orderedKeys.indexOf(a.key) - orderedKeys.indexOf(b.key)
      );
      return formattedData;
    });
  
    const xScale = $derived(
      d3.scaleBand()
        .domain(aggregatedData.map(xValue))
        .range([0, width])
        .paddingInner(0.2)
    );
  
    const yScale = $derived(
      d3.scaleLinear()
        .domain([0, d3.max(aggregatedData, yValue)])
        .range([height, 0])
    );
  
    const xAxis = $derived(
      d3.axisBottom(xScale)
        .tickSizeOuter(0)
    );
  
    const yAxis = $derived(
      d3.axisLeft(yScale)
        .ticks(6)
        .tickSizeOuter(0)
    );
  
    let gx;
    let gy;
  
    $effect(() => {
      d3.select(gx).call(xAxis);
      d3.select(gy).call(yAxis);
      formatAxes();
    });
  </script>
  
  <svg id="barchart" width={containerWidth} height={containerHeight}>
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <g class="axis x-axis" transform={`translate(0, ${height})`} bind:this={gx}></g>
      <g class="axis y-axis" bind:this={gy}></g>
  
      <g>
        {#each aggregatedData as d, i}
          <rect
            class="bar"
            class:active={difficultyFilter.includes(d.key)}
            x={xScale(xValue(d))}
            y={yScale(yValue(d))}
            width={xScale.bandwidth()}
            height={height - yScale(yValue(d))}
            fill={colorScale(colorValue(d))}
            onclick={ e => filterData(d.key) }
          />
        {/each}
      </g>
  
      <g>
        <text
          class="label axis-title"
          x={margin.left / 2}
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
    .bar {
      shape-rendering: crispEdges;
    }
  
    .bar:hover {
      stroke: #777;
    }

    .bar.active {
        stroke: #333
    }
  
    .axis-title {
      font-size: 13px;
      fill: #888;
    }
  </style>
  