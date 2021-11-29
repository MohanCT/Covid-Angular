jQuery('#india').vectorMap({
    map: 'in_mill',
    backgroundColor: '#fff',
    borderColor: '#818181',
    borderOpacity: 0.25,
    borderWidth: 1,
    series: {
        regions: [{
            values: gdpData,
            scale: ['#2231f6'],
            normalizeFunction: 'polynomial'
            }]
    },
    onRegionTipShow: function (e, el, code) {
        el.html(el.html() + ' - ' + gdpData[code] + '');
    },
    color: '#2231f6',
    regionStyle: {
        initial: {
            fill: '#2231f6'
        }
    },
    markerStyle: {
        initial: {
            r: 9,
            'fill': '#fff',
            'fill-opacity': 1,
            'stroke': '#000',
            'stroke-width': 5,
            'stroke-opacity': 0.4
        },
    },
    enableZoom: true,
    hoverColor: '#0a89c1',
    hoverOpacity: null,
    normalizeFunction: 'linear',
    scaleColors: ['#b6d6ff', '#005ace'],
    selectedColor: '#c9dfaf',
    selectedRegions: [],
    showTooltip: true
});