<script>

    /**
         * Assignment name: Inclass Svelte + D3
         * First name: Shreya
         * Last name: Juka Reddy
         * Student ID: 801391084
     */
 
     import * as d3 from 'd3';
     import { onMount } from 'svelte';
     import Barchart from '$lib/visualizations/barchart.svelte';
     import Scatterplot from '$lib/visualizations/scatterplot.svelte';
     import Tooltip from '$lib/components/tooltip.svelte';
     import Regionchart from '$lib/visualizations/regionchart.svelte';

   
     let data = $state([]);
     let difficultyFilter = $state([]);
     let filteredData = $derived.by(() => {
       if (difficultyFilter.length === 0) {
           return data;
       } else {
           return data.filter(d => difficultyFilter.includes(d.difficulty));
       }
     });
 
     function filterData(_difficulty) {
       const isActive = difficultyFilter.includes(_difficulty);
       if (isActive) {
           difficultyFilter = difficultyFilter.filter(d => d !== _difficulty);
       } else {
           difficultyFilter.push(_difficulty);
       }
     }
   
     onMount(async () => {
       const _data = await d3.csv('/data/vancouver_trails.csv');
       _data.forEach(d => {
         d.time = +d.time;
         d.distance = +d.distance;
       });
       data = _data;
     });
   
     const colorScale = $state(
       d3.scaleOrdinal()
         .range(['#d3eecd', '#7bc77e', '#2a8d46'])
         .domain(['Easy', 'Intermediate', 'Difficult'])
     );
 </script>
 
 <style>
   .dashboard-title {
    font-size: 1.8rem;
    font-weight: bold;
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 0.25rem;
    color: #2a2a2a;
  }

  .data-source {
    font-size: 0.85rem;
    text-align: center;
    color: #666;
    margin-bottom: 1rem;
  }
 
   .card {
     border: 1.5px solid #e5e7eb;
     border-radius: 12px;
     background-color: white;
     padding: 1.5rem;
     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
   }
 
   .source {
     margin-top: 1rem;
     font-size: 0.875rem;
     color: #555;
     text-align: left;
   }
 </style>
 
 <div class="w-full">
   <h1 class="dashboard-title">Vancouver Trails Analysis: Distance, Duration & Difficulty</h1>
   <p class="data-source">Data Source: <a href="https://vancouvertrails.com/trails/" target="_blank">vancouvertrails.com</a></p>
  
 
   <div class="flex h-screen w-full p-6 font-display rounded-xl">

     <div class="bg-white grid grid-cols-6 mx-auto px-4 py-8 gap-4 w-full">
       
 
       <div class="col-span-4 row-span-3 card">
         {#if filteredData.length > 0 }
           <Scatterplot data={filteredData}
             xLabel="Distance"
             yLabel="Hours"
             {colorScale}
           />
         {/if}
       </div>
 
       <div class="col-span-2 row-span-3 card">
         {#if data.length > 0}
           <Barchart {data} yLabel="Trails" {colorScale} {difficultyFilter} {filterData} />
         {/if}
       </div>


<div class="col-span-6 rounded-xl shadow-md p-8">
    {#if data.length > 0}
      <Regionchart {data} {colorScale} />
    {/if}
  </div>
 
     
     </div>
   </div>
 
   <Tooltip/>
 </div>
 