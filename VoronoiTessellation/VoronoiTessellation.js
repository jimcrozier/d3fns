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
               
         loadjscssfile("/js/D3/d3fns/VoronoiTessellation/VoronoiTessellation.css", "css") ;
         
          var width = 960,
          height = 500;
          
          var vertices = d3.range(100).map(function(d) {
          return [Math.random() * width, Math.random() * height];
          });
          
          var voronoi = d3.geom.voronoi()
          .clipExtent([[0, 0], [width, height]]);
          
          var svg = d3.select("body").append("svg")
          .attr("width", width)
          .attr("height", height)
          .on("mousemove", function() { vertices[0] = d3.mouse(this); redraw(); });
          
          var path = svg.append("g").selectAll("path");
          
          svg.selectAll("circle")
          .data(vertices.slice(1))
          .enter().append("circle")
          .attr("transform", function(d) { return "translate(" + d + ")"; })
          .attr("r", 1.5);
          
          redraw();
          
          function redraw() {
          path = path
          .data(voronoi(vertices), polygon);
          
          path.exit().remove();
          
          path.enter().append("path")
          .attr("class", function(d, i) { return "q" + (i % 9) + "-9"; })
          .attr("d", polygon);
          
          path.order();
          }
          
          function polygon(d) {
          return "M" + d.join("L") + "Z";
          }
}         
