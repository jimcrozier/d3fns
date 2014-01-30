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
             
       loadjscssfile("/js/D3/d3fns/dendrogram1/dendrogram1.css","css") ;


var width = 960,
    height = 2200;

var cluster = d3.layout.cluster()
    .size([height, width - 160]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select(divIn).append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(40,0)");

d3.json("/js/D3/d3fns/dendrogram1/flare.json", function(error, root) {
  var nodes = cluster.nodes(root),
      links = cluster.links(nodes);

  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

  node.append("circle")
      .attr("r", 4.5);

  node.append("text")
      .attr("dx", function(d) { return d.children ? -8 : 8; })
      .attr("dy", 3)
      .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { return d.name; });
});

d3.select(self.frameElement).style("height", height + "px");

}
