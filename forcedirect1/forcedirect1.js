
function closeIt(divIn) {
  

  
   function loadjscssfile(filename, filetype) {
                 if (filetype == "js") { //if filename is a external JavaScript file
                    // alert('called');
                     var fileref = document.createElement('script')
                     fileref.setAttribute("type", "text/javascript")
                     fileref.setAttribute("src", filename)
                     //alert('called');
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
             
       loadjscssfile("/js/D3/d3fns/forcedirect1/forcedirect1.css","css") ;
       
var width = 960,
    height = 500;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

var svg = d3.select(divIn).append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("/js/D3/d3fns/forcedirect1/miserables.json", function(error, graph) {
  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
});

}
