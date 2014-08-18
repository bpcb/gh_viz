// // create base map
var path = d3.geo.path()

var settings = {
    'width': 1000,
    'height': 1000
}

var radius = d3.scale.sqrt()
    .domain([0, 1e6])
    .range([0, 15]);

svg = d3.select('body')
    .append('svg')
    .attr('id', 'svg-1')
    .attr('width', 1000)
    .attr('height', 1000)
    
svg.append("path")
    .datum(topojson.feature(shape, shape.objects.states))
    .attr("class", "border border--state")
    .attr('fill', 'gray')
    .attr("d", path);
    
var get_pop = function(id) {
    var filtered = data.filter(function(d) { return d.fips == id })
    var pop = filtered.map(function(d) { return d.pop })
    return pop[0]
}
    
svg.append("g")
    .attr("class", "bubble")
    .selectAll("circle")
    .data(topojson.feature(shape, shape.objects.counties).features)
    .enter().append("circle")
    .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
    .attr("r", function(d) { return radius(get_pop(d.id)); });
    
var legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(" + (settings.width - 50) + "," + (settings.height - 20) + ")")
  .selectAll("g")
    .data([1e6, 3e6, 6e6])
  .enter().append("g");

legend.append("circle")
    .attr("cy", function(d) { return -radius(d); })
    .attr("r", radius);

legend.append("text")
    .attr("y", function(d) { return -2 * radius(d); })
    .attr("dy", "1.3em")
    .text(d3.format(".1s"));