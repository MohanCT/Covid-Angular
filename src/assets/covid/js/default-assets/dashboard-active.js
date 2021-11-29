var options = {
    chart: {
        height: 330,
        type: "bar",
        stacked: !0,
        toolbar: {
            show: !1
        },
        zoom: {
            enabled: !0
        }
    },
    plotOptions: {
        bar: {
            horizontal: !1,
            columnWidth: "15%",
            endingShape: "rounded"
        }
    },
    dataLabels: {
        enabled: !1
    },
    series: [{
        data: [178, 155, 115, 185, 148, 196, 180, 181, 150, 140, 180, 160]
        }],
    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    },
    colors: ["#2231f6"],
    legend: {
        position: "bottom"
    },
    fill: {
        opacity: 1
    }
};
(chart = new ApexCharts(document.querySelector("#apex-stacked-bar-chart"), options)).render();

// Apex Donut chart start
var options = {
    chart: {
        height: 190,
        type: "donut"
    },
    stroke: {
        colors: ['rgba(0,0,0,0)']
    },
    colors: ["#2231f6", "#F5385A", "#0acf97"],
    legend: {
        position: 'top',
        horizontalAlign: 'center'
    },
    dataLabels: {
        enabled: false
    },
    series: [56, 48, 42],
    labels: ["Cases", "Deaths", "Recovered"]
};

var chart = new ApexCharts(document.querySelector("#apexdonutchart"), options);

chart.render();
// Apex Donut chart end