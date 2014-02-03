
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

loadjscssfile("http://d3js.org/queue.v1.min.js", "js") ;
loadjscssfile("http://d3js.org/topojson.v1.min.js", "js") ;
loadjscssfile("/js/D3/d3fns/Choropleth/Choropleth.css", "css") ;





function closeIt(divIn) {

//<script src="http://d3js.org/d3.v3.min.js"></script>

//<script src="http://d3js.org/queue.v1.min.js"></script>
//<script src="http://d3js.org/topojson.v1.min.js"></script>

      

         

         
         var width = 960,
    height = 500;

var rateById = d3.map();

var quantize = d3.scale.quantize()
    .domain([0, .15])
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

var path = d3.geo.path();

var svg = d3.select(divIn).append("svg")
    .attr("width", width)
    .attr("height", height);

queue()
    .defer(d3.json, "/js/D3/d3fns/Choropleth/us.json")
    .defer(d3.tsv, "/js/D3/d3fns/Choropleth/unemployment.tsv", function(d) { rateById.set(d.id, +d.rate); })
    .await(ready);

function ready(error, us) {
  svg.append("g")
      .attr("class", "counties")
    .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
    .enter().append("path")
      .attr("class", function(d) { return quantize(rateById.get(d.id)); })
      .attr("d", path);

  svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr("d", path);
  }
  
}

         
