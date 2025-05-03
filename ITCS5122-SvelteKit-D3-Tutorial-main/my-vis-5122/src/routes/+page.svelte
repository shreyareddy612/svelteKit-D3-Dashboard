<script>

   /**
        * Assignment name: Inclass Svelte + D3
        * First name: Shreya
        * Last name: Juka Reddy
        * Student ID: 801391084
    */
import * as d3 from 'd3';
    // declare weekdays array
    let weekdays = [
            "Sunday", 
            "Monday", 
            "Tuesday", 
            "Wednesday", 
            "Thursday", 
            "Friday", 
            "Saturday"
    ];

    // declare course object
    const course = {id: 'ITCS 4122', name: 'Visual Analytics', students: 76};

    // declare courses (array of objects)
    let courses = [
        {id: 'ITCS 4122', name: 'Visual Analytics', students: 76},
        {id: 'ITCS 4156', name: 'ML', students: 60},
        {id: 'ITCS 2181', name: 'Computer Organization', students: 120}
    ];

    let circles = $state(
        [
            {r: 30, cx: 100, cy: 100, color: 'limegreen'},
            {r: 40, cx: 200, cy: 100, color: 'red'},
            {r: 50, cx: 300, cy: 100, color: 'yellow'},
            {r: 60, cx: 400, cy: 100, color: 'grey'},
            {r: 70, cx: 500, cy: 100, color: 'lavender'},
            {r: 80, cx: 600, cy: 100, color: 'skyblue'}
        ]
    );

    let chartFreq = $state(
        [
            {letter: "A", frequency: 0.08167},
            {letter: "B", frequency: 0.01492},
            {letter: "C", frequency: 0.02782},
            {letter: "D", frequency: 0.04253},
            {letter: "E", frequency: 0.12702},
            {letter: "F", frequency: 0.02288},
            {letter: "G", frequency: 0.02015},
            {letter: "H", frequency: 0.06094},
            {letter: "I", frequency: 0.06966},
            {letter: "J", frequency: 0.00153},
            {letter: "K", frequency: 0.00772},
            {letter: "L", frequency: 0.04025},
            {letter: "M", frequency: 0.02406},
            {letter: "N", frequency: 0.06749},
            {letter: "O", frequency: 0.07507},
            {letter: "P", frequency: 0.01929},
            {letter: "Q", frequency: 0.00095},
            {letter: "R", frequency: 0.05987},
            {letter: "S", frequency: 0.06327},
            {letter: "T", frequency: 0.09056},
            {letter: "U", frequency: 0.02758},
            {letter: "V", frequency: 0.00978},
            {letter: "W", frequency: 0.0236},
            {letter: "X", frequency: 0.0015},
            {letter: "Y", frequency: 0.01974},
            {letter: "Z", frequency: 0.00074}
        ]
    );

    const margin = {top: 50, right: 30, bottom: 30, left: 60},
        width = 960 - margin.left - margin.right, 
        height = 400 - margin.top - margin.bottom;

    const max = $derived(
        d3.max(chartFreq, d => d.frequency)
    );
    const min = $derived(
        d3.min(chartFreq, d => d.frequency)
    );
    const extent = $derived(
        d3.extent(chartFreq, d => d.frequency)
    );

    $inspect(min);

    const sortFreq = $derived(
        d3.sort(chartFreq, (a, b) => d3.descending(a.frequency, b.frequency))
    );

    const charScale = $derived(
        d3.scaleBand()
            .domain(sortFreq.map(d => d.letter))
            .range([0, 400])
            .padding(0.05)
    );

    const yScale = $derived(
        d3.scaleLinear()
            .domain([0, d3.max(sortFreq, d => d.frequency)])
            .range([height, 0])
            .nice()
    );

    const colorScale = $derived(
        d3.scaleOrdinal()
            .domain(sortFreq.map(d => d.letter))
            .range(d3.schemeCategory10)
    );

    const xAxis = $derived(
        d3.axisBottom(charScale)
            .ticks(5)
            .tickSizeOuter(0)
    );

    const yAxis = $derived(
        d3.axisLeft(yScale)
            .ticks(6)
            .tickSizeOuter(0)
            .tickFormat(d => d3.format('.0%')(d))
    );

    let gx;
    let gy;

    $effect(() => {
        d3.select('h2')
            .style('color', 'blue')
            .style('font-size', '2em')
            .text('Hello, Svelte with D3!');

        d3.selectAll('.label')
            .style('color', 'white');

        d3.select(gx)
            .call(xAxis);
        d3.select(gy)
            .call(yAxis);
    });

</script>

<div class="grid grid-cols-6 mx-auto px-4 py-8 gap-4 font-display">
    <div class="col-span-3 flex">
        {#each weekdays as day}
            <div class="bg-blue-100 p-4 rounded-lg shadow-md">
                <h2 class="label text-xl font-bold">{day}</h2>
            </div>
        {/each}
    </div>
    <div class="col-span-3 flex">
        <div class="bg-white p-4 rounded-lg shadow-md">
            <h2 class="text-xl font-bold">Courses</h2>
            <ul>
                {#each courses as course}
                    <li class="border rounded-lg p-2 mb-2"
                        class:font-semibold={course.id === 'ITCS 4122'}
                        class:text-purple-500={course.students > 100}
                    >
                        <p>Course name: {course.name}</p>
                        <p>Course ID: {course.id}</p>
                        <p>Number of students: {course.students}</p>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
    <div class="col-span-3 p-4 rounded-lg shadow-md">
        <h2 class="text-xl font-bold">SVG Shapes</h2>
        <svg id="scatterplot" width="700" height="400">
            <rect x="0" 
                y="0" 
                width="50" 
                height="50" 
                fill="blue" 
            />
            <ellipse cx="145" 
                cy="25" 
                rx="15" 
                ry="25" 
                fill="purple" 
            />
            <line x1="185"
                y1="5"
                x2="230"
                y2="40"
                stroke="black"
                stroke-width="2"
            />
            {#each circles as circle}
                <circle cx={circle.cx} 
                    cy={circle.cy} 
                    r={circle.r} 
                    fill={circle.color}
                    stroke="black"
                    stroke-width="2"
                />
            {/each}
        </svg>
    </div>
    <div class="col-span-3 p-4 rounded-lg shadow-md">
        <svg id="barchart"
            width
            height>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <g class="axis x-axis" 
                        transform={`translate(0, ${height})`}
                        bind:this={gx}>
                    </g>
                    <g class="axis-y-axis"
                        bind:this={gy}>
                    </g>
                    <g>
                        {#each sortFreq as d, i}
                            <rect class="bar"
                                x={charScale(d.letter)}
                                y={yScale(d.frequency)}
                                width={charScale.bandwidth()}
                                height={height - yScale(d.frequency)}
                                fill={colorScale(d.letter)}
                                stroke="black"
                            />
                        {/each}
                    </g>
                    <g>
                        <text class="label y-label"
                            x={-60}
                            y={-5}
                            text-anchor="start">
                            Frequency (%)
                        </text>
                    </g>
                </g>
        </svg>
    </div>
</div> 

<!-- <div class="container mx-auto px-4 py-8 font-display">
    <h1 class="text-3xl font-bold text-center mb-4">
        Welcome to SvelteKit + D3.js Tutorial
    </h1>
    <h2 class="text-xl font-semibold text-center mb-6">
        Hello, Data Visualization World!
    </h2>
    <p class="text-center mb-8">
        This tutorial will guide you through creating interactive visualizations using 
        the power of SvelteKit and D3.js.
    </p>
</div> -->