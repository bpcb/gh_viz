// Width and height settings
// Create a variable "mySvg" that is a selection of the svg with the id "my-svg"
var mySvg = d3.select('body').append('svg').attr('id', 'my-svg')
    .attr('width', 1000).attr('height', 800)

var settings = {
  width:10, 
  height:300, 
  interval:20
}

// Write a function that will assign all styles/attributes to your 'rect' elements
 var assignRect = function(rect) {
    rect.attr('height', function(d){return d.yr2006})
        .attr('width', settings.width)
        .attr('x', function(d,i){return settings.interval*i})
        .attr('y',function(d){return 300-d.yr2006})
        .attr('style', "fill:blue")
}

/*Write a function that will assign all styles/attributes to your y-label text elements
These are the numbers that appear at the top of each bar
 be sure to assign the appropriate classes
*/
var assignYLabel = function(YLabel) {
  YLabel.attr('x',function(d,i){return settings.interval*i+7.5})
      .attr('y', function(d){return 800-d.yr2006})
      .attr('class', 'y-label')
      .attr('fill', 'white')
      .text(function(d){return d.yr2006})
}

/*Write a function that will assign all styles/attributes to your x-label text elements: 
These are the horizontal labels below the bars
 be sure to assign the appropriate classes
*/  
var assignXLabel = function(XLabel) {
  XLabel.text(function(d){return d.state})
      .attr('x',function(d,i){return (settings.interval*i + 2.5)})
      .attr('y', 320)
      .attr('class', 'x-label')
      .attr('fill', 'black')
      .attr('transform', 'translate(settings.width, settings.height)')
      .attr('transform', 'rotate(90)')
      .style('text-anchor', 'end')
}

// Define a variable "rects" as the selection of all 'rect' elements within your "mySvg" variable with your data bound to it
var rects = mySvg.selectAll('rect')

// Enter your "rects" variable elements and append a rectangle element for each data element
// Use D3's ".call" functionality to pass each element to the rectangle function you wrote above
rects.data(data)
    .enter()
    .append('rect')
    .call(assignRect)

  
// Define a variable "labels" as the selection of all elements of class "y-label" within your "mySvg" variable with your data bound to it
var labels = mySvg.selectAll('.y-label')

  // Enter your "labels" variable elements and append a text element for each data element
labels.data(data)
    .enter()
    .append('text')
    .call(assignYLabel)


 // Define a variable "xLabels" as the selection of all elements with the class "x-labels"
var xlabels = mySvg.selectAll('.x-label')

labels.data(data)
    .enter()
    .append('text')
    .call(assignXLabel)

  /* Write a function "update" that does the following:
    - Selects all 'rect' elements and binds data2 as the data
    - Transitions the 'rect' elements to their new position using .call
    - Selects all 'text' elements and binds data2 as the data
    - Transitions the 'rect' elements to their new position using .call
  */
var update = function(){
  var rects = mySvg.selectAll('rect')
  
  rects.data(data)
    .transition()
    .duration(500)
    .call(assignRect)
  
  var YLabels = mySvg.selectAll('.y-label')
  
  YLabels.data()
    .transition()
    .duration(500)
    .call(assignYLabel)
}

  // Run your update function
update()