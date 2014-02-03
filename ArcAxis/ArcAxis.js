function closeIt(divIn) {

//<script src="http://d3js.org/d3.v3.min.js"></script>

      function loadjscssfile(filename, filetype) {
                   if (filetype == "js") { //if filename is a external JavaScript file
                      // alert('called');
                       var fileref = document.createElement('script')
                       fileref.setAttribute("type", "text/javascript")
                       fileref.setAttribute("src", filename)
                      // alert('called');
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
               
 
          loadjscssfile("http://iop.io/js/vendor/d3.v3.min.js", "js") ;
          loadjscssfile("http://iop.io/js/vendor/polymer/polymer.min.js", "js") ;
          loadjscssfile("http://iop.io/js/iopctrl.js", "js") ;
         loadjscssfile("/js/D3/d3fns/ArcAxis/ArcAxis.css", "css") ;
         
                $(divIn).append('<div>'+
        '<span id="speedometer"></span>'+
    '</div>');
         
         var svg = d3.select("#speedometer")
                .append("svg:svg")
                .attr("width", 400)
                .attr("height", 400);


        var gauge = iopctrl.arcslider()
                .radius(120)
                .events(false)
                .indicator(iopctrl.defaultGaugeIndicator);
        gauge.axis().orient("in")
                .normalize(true)
                .ticks(12)
                .tickSubdivide(3)
                .tickSize(10, 8, 10)
                .tickPadding(5)
                .scale(d3.scale.linear()
                        .domain([0, 160])
                        .range([-3*Math.PI/4, 3*Math.PI/4]));

        var segDisplay = iopctrl.segdisplay()
                .width(80)
                .digitCount(6)
                .negative(false)
                .decimals(0);

        svg.append("g")
                .attr("class", "segdisplay")
                .attr("transform", "translate(130, 200)")
                .call(segDisplay);

        svg.append("g")
                .attr("class", "gauge")
                .call(gauge);

        segDisplay.value(56749);
        gauge.value(92);
        
 
    }
