
function closeIt(divIn) {

// Chart design based on the recommendations of Stephen Few. Implementation
// based on the work of Clint Ivy, Jamie Love, and Jason Davies.
// http://projects.instantcognition.com/protovis/bulletchart/

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
               
         loadjscssfile("/js/D3/d3fns/sunburst/sunburst.css","css") ;


$(divIn).append('<form>'+
  '<label><input type="radio" name="mode" value="size"> Size</label>'+
  '<label><input type="radio" name="mode" value="count" checked> Count</label>'+
'</form>');


var width = 960,
    height = 700,
    radius = Math.min(width, height) / 2,
    color = d3.scale.category20c();

var svg = d3.select(divIn).append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height * .52 + ")");

var partition = d3.layout.partition()
    .sort(null)
    .size([2 * Math.PI, radius * radius])
    .value(function(d) { return 1; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx; })
    .innerRadius(function(d) { return Math.sqrt(d.y); })
    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

d3.json("/js/D3/d3fns/sunburst/flare.json", function(error, root) {
  var path = svg.datum(root).selectAll("path")
      .data(partition.nodes)
    .enter().append("path")
      .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
      .attr("d", arc)
      .style("stroke", "#fff")
      .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
      .style("fill-rule", "evenodd")
      .each(stash);

  d3.selectAll("input").on("change", function change() {
    var value = this.value === "count"
        ? function() { return 1; }
        : function(d) { return d.size; };

    path
        .data(partition.value(value).nodes)
      .transition()
        .duration(1500)
        .attrTween("d", arcTween);
  });
});

// Stash the old values for transition.
function stash(d) {
  d.x0 = d.x;
  d.dx0 = d.dx;
}

// Interpolate the arcs in data space.
function arcTween(a) {
  var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
  return function(t) {
    var b = i(t);
    a.x0 = b.x;
    a.dx0 = b.dx;
    return arc(b);
  };
}

d3.select(self.frameElement).style("height", height + "px");

}
