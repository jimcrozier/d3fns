function closeIt(divIn) {

//<script src="http://d3js.org/d3.v3.min.js"></script>

      function loadjscssfile(filename, filetype) {
                   if (filetype == "js") { //if filename is a external JavaScript file
                      // alert('called');
                       var fileref = document.createElement('script')
                       fileref.setAttribute("type", "text/javascript")
                       fileref.setAttribute("src", filename)
                       alert('called');
                   }
                   else if (filetype == "css") { //if filename is an external CSS file
                       var fileref = document.createElement("link")
                       fileref.setAttribute("rel", "stylesheet")
                       fileref.setAttribute("type", "text/css")
                       fileref.setAttribute("href", filename)
                   }
                   if (typeof fileref != "undefined")
                       document.getElementsByTagName("head")[0].appendChild(fileref)
               }
 
 var w = 960,
      h = 500;

  var vertices = d3.range(100).map(function(d) {
    return [Math.random() * w, Math.random() * h];
  });

  var svg = d3.select("#chart")
    .append("svg:svg")
      .attr("width", w)
      .attr("height", h);
  var paths, points, clips;
  clips = svg.append("svg:g").attr("id", "point-clips");
  points = svg.append("svg:g").attr("id", "points");
  paths = svg.append("svg:g").attr("id", "point-paths");
  
  clips.selectAll("clipPath")
      .data(vertices)
    .enter().append("svg:clipPath")
      .attr("id", function(d, i) { return "clip-"+i;})
    .append("svg:circle")
      .attr('cx', function(d) { return d[0]; })
      .attr('cy', function(d) { return d[1]; })
      .attr('r', 20);

  paths.selectAll("path")
      .data(d3.geom.voronoi(vertices))
    .enter().append("svg:path")
      .attr("d", function(d) { return "M" + d.join(",") + "Z"; })
      .attr("id", function(d,i) { 
        return "path-"+i; })
      .attr("clip-path", function(d,i) { return "url(#clip-"+i+")"; })
      .style("fill", d3.rgb(230, 230, 230))
      .style('fill-opacity', 0.4)
      .style("stroke", d3.rgb(200,200,200));
    
  paths.selectAll("path")
    .on("mouseover", function(d, i) {
      d3.select(this)
        .style('fill', d3.rgb(31, 120, 180));
      svg.select('circle#point-'+i)
        .style('fill', d3.rgb(31, 120, 180))
    })
    .on("mouseout", function(d, i) {
      d3.select(this)
        .style("fill", d3.rgb(230, 230, 230));
      svg.select('circle#point-'+i)
        .style('fill', 'black')
    });

  points.selectAll("circle")
      .data(vertices)
    .enter().append("svg:circle")
      .attr("id", function(d, i) { 
        return "point-"+i; })
      .attr("transform", function(d) { return "translate(" + d + ")"; })
      .attr("r", 2)
      .attr('stroke', 'none');
      
      $(divIn).append('<div id="chart">'+
  '</div>');
      
}      
