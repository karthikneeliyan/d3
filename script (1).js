<div id="bar_chart"></div> 
  <script>
    <#assign chartData=allRepsEntryList >
    var data = ${chartData};

    data.forEach(function(d) {
      d.value = +d.value;
    });

    var margin = {
        top: 50,
        right: 50,
        bottom: 100,
        left: 80
      },
      width = 400 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    var x = d3.scaleBand()
      .domain(data.map(function(d) {
        return d.name
      }))
      .range([0, width]);

    var y1 = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) {
        return d.val1
      })])
      .range([height, 0]);

    var y2 = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) {
        return d.val2
      })])
      .range([height, 0]);

    var y3 = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) {
        return d.val3
      })])
      .range([height, 0]);

    var svg = d3.select("#bar_chart")
      .data(data)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xAxis = d3.axisBottom(x)
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Add the Y Axis
    svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y1).ticks(8))
    .append("text")                          
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "end")
      .text("Number Lost");

   var tooltip = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0)
    .style("font-size", "14px") 
    .style("font-weight", "bold")                             
    .style("background-color", "#fff")
    .style("border", "1px solid #ff3366")   
    .style("padding", "2px 7px 2px 7px")                            
	.style("z-index", "10");

    var rects = svg.selectAll('rect')
      .data(data);

    //********* Bar Chart 1 ****************
    var newRects1 = rects.enter();

    newRects1.append('rect')
      .attr('x', function(d, i) {
        return x(d.name);
      })
      .attr('y', function(d, i) {
        return y1(d.val1);
      })
      .attr('height', function(d, i) {
        return height - y1(d.val1)
      })
      .attr('opacity', 0.85)
      .attr("class", "bar")
      .attr('width', 40)
      .attr("transform", "translate(" + 27 + ",0)")
      .style('fill', 'darkcyan')
      .style('stroke', 'gray')
      .attr('class', 'bar')
      
       .on("mouseover", function(d) {      
    tooltip.transition().duration(200).style("opacity", .9);      
    tooltip.html(d.val1 + " Leads Lost From Unqualified")  
      .style("left", (d3.event.pageX) + "px")     
      .style("top", (d3.event.pageY - 28) + "px");    
  })                  
  .on("mouseout", function(d) {       
    tooltip.transition().duration(500).style("opacity", 0);   
  });                           

    //********* Bar Chart 2 ****************
    var newRects2 = rects.enter();

    newRects2.append('rect')
      .attr('x', function(d, i) {
        return x(d.name);
      })
      .attr('y', function(d, i) {
        return y1(d.val2);
      })
      .attr('height', function(d, i) {
        return height - y1(d.val2)
      })
      .attr('opacity', 0.85)
      .attr('width', 40)
      .attr("transform", "translate(" + 37 + ",0)")
      .style('fill', 'white')
      .style('stroke', 'gray')
      .attr('class', 'bar')
                                
       .on("mouseover", function(d) {      
    tooltip.transition().duration(200).style("opacity", .9);      
    tooltip.html(d.val2 + " Leads Lost From Qualified")  
      .style("left", (d3.event.pageX) + "px")     
      .style("top", (d3.event.pageY - 28) + "px");    
  })                  
  .on("mouseout", function(d) {       
    tooltip.transition().duration(500).style("opacity", 0);   
  });  
                                
    //********* Bar Chart 3 ****************
    var newRects3 = rects.enter();

    newRects3.append('rect')
      .attr('x', function(d, i) {
        return x(d.name);
      })
      .attr('y', function(d, i) {
        return y1(d.val3);
      })
      .attr('height', function(d, i) {
        return height - y1(d.val3)
      })
      .attr('width', 40)
      .attr('opacity', 0.95)
      .attr("transform", "translate(" + 47 + ",0)")
      .style('fill', 'darkorange')
      .style('stroke', 'gray')
      .attr('class', 'bar')
                                
       .on("mouseover", function(d) {      
    tooltip.transition().duration(200).style("opacity", .9);      
    tooltip.html(d.val3 + " Leads Lost From Quoted")  
      .style("left", (d3.event.pageX) + "px")     
      .style("top", (d3.event.pageY - 28) + "px");    
  })                  
  .on("mouseout", function(d) {       
    tooltip.transition().duration(500).style("opacity", 0);   
  });  
                                                              
    d3.selectAll("g");
                                  
  </script>