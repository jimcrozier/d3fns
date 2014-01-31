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
               
         loadjscssfile("/js/D3/d3fns/Treemap/Treemap.css", "css") ;
         
         
        
        var margin = {top: 40, right: 10, bottom: 10, left: 10},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
        
        var color = d3.scale.category20c();
        
        var treemap = d3.layout.treemap()
        .size([width, height])
        .sticky(true)
        .value(function(d) { return d.size; });
        
        var div = d3.select("body").append("div")
        .style("position", "relative")
        .style("width", (width + margin.left + margin.right) + "px")
        .style("height", (height + margin.top + margin.bottom) + "px")
        .style("left", margin.left + "px")
        .style("top", margin.top + "px");
        
        d3.json("/js/D3/d3fns/bullet/flare.json", function(error, root) {
        var node = div.datum(root).selectAll(".node")
        .data(treemap.nodes)
        .enter().append("div")
        .attr("class", "node")
        .call(position)
        .style("background", function(d) { return d.children ? color(d.name) : null; })
        .text(function(d) { return d.children ? null : d.name; });
        
        d3.selectAll("input").on("change", function change() {
        var value = this.value === "count"
        ? function() { return 1; }
        : function(d) { return d.size; };
        
        node
        .data(treemap.value(value).nodes)
        .transition()
        .duration(1500)
        .call(position);
        });
        });
        
        function position() {
        this.style("left", function(d) { return d.x + "px"; })
        .style("top", function(d) { return d.y + "px"; })
        .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
        .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
        }
        
        // form in html
    $(divIn).append('<form>'+
    '<label><input type="radio" name="mode" value="size"> Size</label>'+
    '<label><input type="radio" name="mode" value="count" checked> Count</label>'+
    '</form>');

}
