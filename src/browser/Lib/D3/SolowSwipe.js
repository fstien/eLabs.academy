

import '../resize.js' 

import * as d3 from "d3";


window.SolowSwipe = class SolowSwipe { 
  constructor(paramObj) {
    
    this.variable = paramObj.variable;
    this.initPeriods = paramObj.initPeriods;
    this.valPeriods = paramObj.valPeriods;

    this.series = paramObj.series;

    this.graphPad = paramObj.graphPad || 20;
   
    let div0 = document.createElement("div");
    document.getElementById("AppMain").appendChild(div0).setAttribute("id", "Solow" + this.variable);

    document.getElementById("Solow" + this.variable).style.position = "absolute";  

    document.getElementById("Solow" + this.variable).style.visibility = "hidden";
    document.getElementById("Solow" + this.variable).style.display = "none";


    this.visible = false;
    this.pos = "";


    //this.data = [ [0,2] ];
    this.data = {};


    this.x;
    this.y;
    this.valueline;
    this.xAxis;
    this.yAxis;

    this.streamObj = {};
    this.streamObj.ts = [0];

    store.dispatch({ 
      type: 'AddStream',
      valPeriods: this.valPeriods,
      series: this.series,
    });

    
    (function wait() {
      if ( store.getState().streamInit ) {
        store.subscribe(this.updateData.bind(this));   

      } else {
        setTimeout( wait.bind(this), 100 );
      }
    }.bind(this))();
          

  }
  
  hide() { 
    this.visible = false;
    document.getElementById("Solow" + this.variable).style.visibility = "hidden";
    document.getElementById("Solow" + this.variable).style.display = "none";
  }

  show(position) {

    this.pos = position;

    let mainWidth = document.getElementById('AppMain').clientWidth;
    let mainHeight = document.getElementById('AppMain').clientHeight;    

    if(store.getState().browser === "desktop") {
      document.getElementById("Solow" + this.variable).style.top = "0px";
      document.getElementById("Solow" + this.variable).style.left = "0px";
    }
    else if(store.getState().browser === "mobile") { 
      document.getElementById("Solow" + this.variable).style.top = g.padding.toString() + "px";
      document.getElementById("Solow" + this.variable).style.left = g.padding.toString() + "px";
    }

    switch(position) { 
      case 'full':
        this.width = mainWidth;
        this.height = mainHeight;
        break;

      case 'top': 
        this.width = mainWidth;
        this.height = mainHeight/2 - g.padding/2;
        break;

      case 'bottom': 
        this.width = mainWidth;
        this.height = mainHeight/2 - g.padding/2;
        
        if(store.getState().browser === "desktop") {  
          document.getElementById("Solow" + this.variable).style.top = (mainHeight/2 + g.padding/2).toString() + "px";
        }
        else if(store.getState().browser === "mobile") { 
          document.getElementById("Solow" + this.variable).style.top = (g.padding + mainHeight/2 + g.padding/2).toString() + "px";
        }
        break;

      case 'left':
        this.height = mainHeight;
        this.width = mainWidth/2 - g.padding/2;
        break;

      case 'right':
        this.height = mainHeight;
        this.width = mainWidth/2 - g.padding/2;

        if(store.getState().browser === "desktop") {  
          document.getElementById("Solow" + this.variable).style.left = (mainWidth/2 + g.padding/2).toString() + "px";
        }
        else if(store.getState().browser === "mobile") { 
          document.getElementById("Solow" + this.variable).style.left = (g.padding + mainWidth/2 + g.padding/2).toString() + "px";
        }
        break;


      case 'topLeft':
        this.width = mainWidth/2 - g.padding/2;
        this.height = mainHeight/2 - g.padding/2;
        break;

      case 'topRight': 
        this.width = mainWidth/2 - g.padding/2;
        this.height = mainHeight/2 - g.padding/2;

        if(store.getState().browser === "desktop") {  
          document.getElementById("Solow" + this.variable).style.left = (mainWidth/2 + g.padding/2).toString() + "px";
        }
        else if(store.getState().browser === "mobile") { 
          document.getElementById("Solow" + this.variable).style.left = (g.padding + mainWidth/2 + g.padding/2).toString() + "px";
        }
        break;

      case 'bottomLeft': 
        this.width = mainWidth/2 - g.padding/2;
        this.height = mainHeight/2 - g.padding/2;       
        
        if(store.getState().browser === "desktop") {  
          document.getElementById("Solow" + this.variable).style.top = (mainHeight/2 + g.padding/2).toString() + "px";
        }
        else if(store.getState().browser === "mobile") { 
          document.getElementById("Solow" + this.variable).style.top = (g.padding + mainHeight/2 + g.padding/2).toString() + "px";
        }
        break;

      case 'bottomRight': 
        this.width = mainWidth/2 - g.padding/2;
        this.height = mainHeight/2 - g.padding/2;       

        if(store.getState().browser === "desktop") {  
          document.getElementById("Solow" + this.variable).style.left = (mainWidth/2 + g.padding/2).toString() + "px";
        }
        else if(store.getState().browser === "mobile") { 
          document.getElementById("Solow" + this.variable).style.left = (g.padding + mainWidth/2 + g.padding/2).toString() + "px";
        }

        if(store.getState().browser === "desktop") {  
          document.getElementById("Solow" + this.variable).style.top = (mainHeight/2 + g.padding/2).toString() + "px";
        }
        else if(store.getState().browser === "mobile") { 
          document.getElementById("Solow" + this.variable).style.top = (g.padding + mainHeight/2 + g.padding/2).toString() + "px";
        }
        break;


      default:
        console.log('Applet show option not found.')
        break;
    }


    (function wait() {
      if ( store.getState().allMounted ) {
        
        document.getElementById("Solow" + this.variable).style.display = "block";
        this.mountSVG(this.width, this.height);

        document.getElementById("Solow" + this.variable).style.visibility = "visible";
        this.visible = true;

      } else {
        setTimeout( wait.bind(this), 10 );
      }
    }.bind(this))();
 

  }


  mountSVG(w, h) {
    

    setTimeout(function() {
        document.getElementById("Solow" + this.variable).style.width = (w).toString() + "px";
        document.getElementById("Solow" + this.variable).style.height = (h).toString() + "px";
    }.bind(this), 100);


    if(document.getElementById('D3SVG' + this.variable) != null) { 
        document.getElementById('D3SVG' + this.variable).remove();
    }

    var markData = [
      { name: 'arrowX', path: 'M0,0 L0,4 L4,2 L0,0', viewbox: '0 0 12 12', refX: 1, refY: 3.5 },

      { name: 'arrowY', path: 'M0,4 L4,4 L2,0', viewbox: '0 0 12 12', refX: 0, refY: 4 }
    ]


    // Set the dimensions of the canvas / graph
    var margin = {top: this.graphPad, right: this.graphPad, bottom: this.graphPad, left: this.graphPad + 5},
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom;

    // Set the ranges
    this.x = d3.scaleLinear().range([0, width]);
    this.y = d3.scaleLinear().range([height, 0]); 

    // Scale the range of the data
    //this.x.domain(d3.extent(this.data, function(d) { return d[0]; }));
    this.x.domain([-this.initPeriods, this.valPeriods]);
    
    // this.y.domain([0, d3.max(this.data, function(d) { return d[1]; })]);
    this.y.domain([0, 1.146]);


    // Define the axes
    this.xAxis = d3.axisBottom()
      .scale(this.x)
      .tickFormat(function(d) {
          return('t = ' + d);
       })
      .ticks(3)
      .tickSize(3,0);

    this.yAxis = d3.axisLeft()
      .scale(this.y)
      .tickFormat(function(d) {
          return(d);
       })
      .tickSize(3,0)
      .ticks(5);

    // Adds the svg canvas
    var svg = d3.select("#Solow" + this.variable)
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("id", "D3SVG" + this.variable)
        .append("g")
            .attr("transform", 
                  "translate(" + margin.left + "," + margin.top + ")");

     var marker = svg.selectAll('marker')
        .data(markData)
        .enter()
        .append('svg:marker')
          .attr('id', function(d){ return d.name})
          .attr('markerHeight', 15)
          .attr('markerWidth', 15)
          .attr('markerUnits', 'strokeWidth')
          .attr('orient', 0)
          .attr('refX', function(d){ return d.refX })
          .attr('refY', function(d){ return d.refY })
          .attr('viewBox', function(d){ return d.viewbox })
          .append('svg:path')
            .attr('d', function(d){ return d.path })
            .attr('fill', function(d,i) { return 'black'});


    // Define the line
    this.valueline = d3.line()
        .x(function(d) { 
            return this.x(d[0]);
          }.bind(this))
        .y(function(d) { 
            return this.y(d[1]); 
          }.bind(this));


  
    // Create lines 
  
    for(var i = 0; i < store.getState().stream.series.length; i++) { 

      svg.append("path")
          .attr("class", "pathLine")
          .attr("id", "line" + store.getState().stream.series[i].name)
          .attr('d', this.valueline([ [0,2] ]));

      svg.append("line")          
        .style("stroke", "black") 
        .attr("x1", this.x(0))     
        .attr("y1", this.y(0))     
        .attr("x2", this.x(0))     
        .attr("y2", this.y(1.1)) 
        .attr("stroke-dasharray", '5,10')
        .attr("id", 'initDash' + store.getState().stream.series[i].name);

    }



    // Add the X Axis
    var XAxis = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .attr('stroke-width', '1.5px')
        .call(this.xAxis);

      XAxis.select('path').attr("marker-end", "url(#arrowX)")

    // Add the Y Axis
    var YAxis = svg.append("g")
        .attr("class", "y axis")
        .attr('stroke-width', '1.5px')
        .call(this.yAxis);

    YAxis.select('path').attr("marker-end", "url(#arrowY)")

    svg.selectAll(".tick text")
      .style('font-size', '1.4em');


    svg.append("line")          
      .style("stroke", "black") 
      .attr("x1", this.x(0))     
      .attr("y1", this.y(0))     
      .attr("x2", this.x(0))     
      .attr("y2", this.y(1.1)) 
      .attr("stroke-dasharray", '5,10')


    // text label for the y axis
    svg.append("text")
        .attr("y", this.y(0.02))
        .attr("x", this.x(this.valPeriods - 1))
        .style("text-anchor", "start")
        .text("Time")
        .attr('class', 'd3Text')


    svg.append("text")
        .attr("y", this.y(1.146))
        .attr("x", this.x(-2.6))
        .attr("id", "d3Label")
        .append("svg:tspan")
          .attr("id", "spanBlue")
          .text("Output y, ")
        .append("svg:tspan")
          .attr("id", "spanGreen")
          .text("Consumption c, ")
        .append("svg:tspan")
          .attr("id", "spanRed")
          .text("Investment i");
  }


  updateData() { 
    //console.log('updateData')


    if( JSON.stringify(store.getState().stream) !== JSON.stringify(this.streamObj) ) {

      this.streamObj = JSON.parse(JSON.stringify(store.getState().stream));


      for(var i = 0; i < store.getState().stream.series.length; i++) { 

        var tempData = [];

        for(var j = -this.initPeriods; j < 0; j++) { 
          tempData.push([j, this.streamObj.series[i].initVal]);
        }
        
        tempData.push([-0.0001, this.streamObj.series[i].initVal]);


        for(var j = 0; j < this.streamObj.series[i].ts.length; j++) { 
          tempData.push([j, this.streamObj.series[i].ts[j]]);
        }

        this.data[this.streamObj.series[i].name] = tempData;

      }      

      this.updateGraph();

    }

  }

  updateGraph() {

    // Scale the range of the data again 
    //this.x.domain(d3.extent(this.data, function(d) { return d[0]; }));
    this.x.domain([-this.initPeriods, this.valPeriods]);

    //this.y.domain([0, d3.max(this.data, function(d) { return d[1]; })]);

    this.y.domain([0, store.getState().stream.maxVal*1.2]);


    // Select the section we want to apply our changes to
    var svg = d3.select("#D3SVG" + this.variable)


    for(var i = 0; i < store.getState().stream.series.length; i++) { 

      svg.select("#line" + this.streamObj.series[i].name) 
        .attr("d", this.valueline(this.data[this.streamObj.series[i].name]))
        .attr('stroke-width', '2px');

      svg.select("#initDash" + store.getState().stream.series[i].name)  
        .style("stroke", "black") 
        .attr("x1", this.x(-this.initPeriods))    
        .attr("y1", this.y(store.getState().stream.series[i].initVal))      
        .attr("x2", this.x(this.valPeriods))   
        .attr("y2", this.y(store.getState().stream.series[i].initVal)) 
        .attr("stroke-dasharray", '5,10')

    }


    svg.select(".x.axis")
        .call(this.xAxis);
    svg.select(".y.axis")
        .call(this.yAxis);

    svg.selectAll(".tick text")
      .style('font-size', '1.4em');

  }


}

export default SolowSwipe;


