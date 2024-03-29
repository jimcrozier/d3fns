
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
             
       loadjscssfile("/js/D3/d3fns/cartogram1/cartogram1.css","css") ;
 loadjscssfile("http://d3js.org/topojson.v1.min.js","js") ;


// Ratio of Obese (BMI >= 30) in U.S. Adults, CDC 2008
var valueById = [
   NaN, .187, .198,  NaN, .133, .175, .151,  NaN, .100, .125,
  .171,  NaN, .172, .133,  NaN, .108, .142, .167, .201, .175,
  .159, .169, .177, .141, .163, .117, .182, .153, .195, .189,
  .134, .163, .133, .151, .145, .130, .139, .169, .164, .175,
  .135, .152, .169,  NaN, .132, .167, .139, .184, .159, .140,
  .146, .157,  NaN, .139, .183, .160, .143
];

var path = d3.geo.path();

var svg = d3.select(divIn).append("svg")
    .attr("width", 960)
    .attr("height", 500);

d3.json("/js/D3/d3fns/cartogram1/us.json", function(error, us) {
  svg.append("path")
      .datum(topojson.feature(us, us.objects.land))
      .attr("class", "land")
      .attr("d", path);

  svg.selectAll(".state")
      .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
      .attr("class", "state")
      .attr("d", path)
      .attr("transform", function(d) {
        var centroid = path.centroid(d),
            x = centroid[0],
            y = centroid[1];
        return "translate(" + x + "," + y + ")"
            + "scale(" + Math.sqrt(valueById[d.id] * 5 || 0) + ")"
            + "translate(" + -x + "," + -y + ")";
      })
      .style("stroke-width", function(d) {
        return 1 / Math.sqrt(valueById[d.id] * 5 || 1);
      });
      });
}
