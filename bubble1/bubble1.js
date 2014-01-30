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
               
         loadjscssfile("./bubble1.css", "css") ;
   
   var diameter = 960,
       format = d3.format(",d"),
       color = d3.scale.category20c();
   
   var bubble = d3.layout.pack()
       .sort(null)
       .size([diameter, diameter])
       .padding(1.5);
   
   var svg = d3.select(divIn).append("svg")
       .attr("width", diameter)
       .attr("height", diameter)
       .attr("class", "bubble");
   
   d3.json("/js/D3/bubble1/flare.json", function(error, root) {
     var node = svg.selectAll(".node")
         .data(bubble.nodes(classes(root))
         .filter(function(d) { return !d.children; }))
       .enter().append("g")
         .attr("class", "node")
         .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
   
     node.append("title")
         .text(function(d) { return d.className + ": " + format(d.value); });
   
     node.append("circle")
         .attr("r", function(d) { return d.r; })
         .style("fill", function(d) { return color(d.packageName); });
   
     node.append("text")
         .attr("dy", ".3em")
         .style("text-anchor", "middle")
         .text(function(d) { return d.className.substring(0, d.r / 3); });
   });
   
   // Returns a flattened hierarchy containing all leaf nodes under the root.
   function classes(root) {
     var classes = [];
   
     function recurse(name, node) {
       if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
       else classes.push({packageName: name, className: node.name, value: node.size});
     }
   
     recurse(null, root);
     return {children: classes};
   }
   
   d3.select(self.frameElement).style("height", diameter + "px");

}
