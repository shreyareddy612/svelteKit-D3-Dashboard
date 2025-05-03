export const config = $state({
    barChart: {
        containerWidth: 360,
        containerHeight: 400,
        margin: {top: 25, right: 20, bottom: 20, left: 40},
    },
    scatterPlot: {
        containerWidth: 800,
        containerHeight: 400,
        margin: {top: 25, right: 20, bottom: 20, left: 35},
        tooltipPadding: 15,
    },
    regionChart: {
        containerWidth: 700,
        containerHeight: 400,
        margin: { top: 30, right: 20, bottom: 50, left: 100 }
      }
});

export const tooltip = $state({
    title: '',
    region: '',
    distance: '',
    time: '',
    difficulty: '',
    season: '',
});