var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    
// List of states that will be displayed; default is national trend.
var states = ['NATIONAL']

// Formatting data into a list of objects, one for each state
var nest = d3.nest().key(function(d) { return d.loc })
var nestedData = nest.entries(data)

// Function to filter data down to only states that are in the list to display.
var filterData = function(d) {
    var filtered = d.filter(function(x) { return states.indexOf(x.key) > -1 })
    return filtered
}

// Function that evaluates the maximum count observed in any displayed state
var maxVal = function(d) {
    var max = 0
    for (i = 0; i < d.length; i++) {
        var max_iter = d3.max(d[i].values, function(x) { return x.cases_avg; })
        if (max_iter > max) {
            var max = max_iter
        }
    }   
    return max
}

// Axes
var x = d3.scale.linear()
    .range([0, width]);
x.domain([1953,1973]);

var y = d3.scale.linear()
    .range([height, 0]);
y.domain([0, maxVal(filterData(nestedData))]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.format('d'));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
    
var line = d3.svg.line()
    .interpolate('cardinal')
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.cases_avg); })
    
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

svg.append('line')
  .attr('x1', x(1963))
  .attr('x2', x(1963))
  .attr('y1', y(0))
  .attr('y2', y(maxVal(filterData(nestedData)))) 
  .attr('stroke', 'black')

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Number of measles cases observed");
  
svg.append('svg:image')
  .attr('x', x(1963) + 2)
  .attr('y', y(maxVal(filterData(nestedData))))
  .attr('width', 60)
  .attr('height', 72)
  .attr('xlink:href', 'data/syringe.png')

svg.append('text')
  .attr('x', x(1963) + 2)
  .attr('y', y(maxVal(filterData(nestedData))))
  .attr('dy', '.35em')
  .text('1963: introduction of measles vaccine')

svg.selectAll('path')
    .data(filterData(nestedData), function(d) { return d.key })
    .enter()
    .append('path')
    .attr('class', 'line')
    .attr('d', function(d) { return line(d.values) })
    .attr('stroke-dasharray', 
    
    
// states = ['ALABAMA', 'MONTANA']
    
// // svg.selectAll('path')
    // // .data(filterData(nestedData), function(d) { return d.key })
    // // .attr('class', 'line')
    // // .attr('d', function(d) { return line(d.values) })

// // svg.selectAll('path').exit().remove()

// // lines.exit().remove()