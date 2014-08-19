var mySvg = d3.select('body').append('svg').attr('id', 'my-svg')
    .attr('width', 1500).attr('height', 1000)
    
var settings = {
  width:10, 
  height:800, 
  interval:20,
  padding:100
}

// Y Scale: 0-2000 cases.
var yScale = d3.scale.linear()
yScale.domain([0, 2000])
yScale.range([settings.height, 0])

var yAxisFunction = d3.svg.axis()
    .scale(yScale)
    .orient('left')
    .ticks(5)
    
var yAxis = d3.select('#my-svg').append('g')
yAxis.attr('class', 'axis').attr('transform', 'translate(' + settings.padding + ',' + settings.padding + ')')
yAxis.call(yAxisFunction)

var drawAxisLabels = function() {
    yAxisLabel = d3.select('#my-svg')
        .append('text')
        .attr('transform', 'translate(' + (settings.padding / 3) + ',' + (settings.height * 2/3) + ') rotate(270)')
        .text('Number of mumps cases observed')
}        

drawAxisLabels()

// X labels 

var translate = function(d,i) {
    return 'translate(' + (settings.padding + 10 + settings.interval*i + 8) + ',' + (820 + settings.padding) + ') rotate(-90)'
}   

var assignXLabel = function(XLabel) {
  XLabel.text(function(d){return d.state})
      .attr('class', 'x-label')
      .attr('fill', 'black')
      .attr('font-size', '55%')
      .attr('transform', translate)
      .style('text-anchor', 'end')
}

 var assignRect = function(rect) {
    rect.attr('height', function(d){return (800 - yScale(d.count))})
        .attr('width', settings.width)
        .attr('x', function(d,i){return (10 + settings.interval*i)})
        .attr('y',function(d){return(yScale(d.count))})
        .attr('style', "fill:blue")
}

data_formatted = {}
data_formatted[2006] = data.map(function(d) { return {state: d.state, count: d.yr2006} })
data_formatted[2007] = data.map(function(d) { return {state: d.state, count: d.yr2007} })
data_formatted[2008] = data.map(function(d) { return {state: d.state, count: d.yr2008} })
data_formatted[2009] = data.map(function(d) { return {state: d.state, count: d.yr2009} })
data_formatted[2010] = data.map(function(d) { return {state: d.state, count: d.yr2010} })
data_formatted[2011] = data.map(function(d) { return {state: d.state, count: d.yr2011} })
data_formatted[2012] = data.map(function(d) { return {state: d.state, count: d.yr2012} })
data_formatted[2013] = data.map(function(d) { return {state: d.state, count: d.yr2013} })
    
var plotG = d3.select('#my-svg').append('g').attr('outline', 'outline-color: black').attr('transform', 'translate(' + settings.padding + ',' + settings.padding + ')')
plotG.selectAll('rect').data(data_formatted[2006]).enter().append('rect').call(assignRect)

var xlabels = mySvg.selectAll('.x-label')
xlabels.data(data_formatted[2006])
    .enter()
    .append('text')
    .call(assignXLabel)
    
var update = function(){
  for (i = 2007; i < 2014; i++) {
      var rects = mySvg.selectAll('rect')
      
      rects.data(data_formatted[i])
        .transition()
        .duration(1000)
        .call(assignRect)
  }
}

  // Run your update function
update()