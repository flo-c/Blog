window.main = {

    width : 500,
    height : 350,
    space : 50,

    getX : function(d) {
        return d.x + this.space;
    },
    
    getY : function(d) {
        return this.space + this.height - d.y;
    },
    
    initialize : function() {
        this.circles = [{r : 5, x : 10, y : 10, color : "red"}, 
                {r : 25, x : 100, y : 100, color : "yellow"},
                {r : 10, x : 400, y : 200, color : "green"},
                {r : 5, x : 50, y : 25, color : "purple"},
                {r : 50, x : 250, y : 300, color : "blue"}];
        this.svgcontainer = d3.select("#graph").append("svg:svg").attr("width", this.width + 2*this.space).attr("height", this.height + 2*this.space);
        //Create the Scale we will use for the Axis
        var xAxisScale = d3.scale.linear().domain([0, this.width]).range([0, this.width]);
        var yAxisScale = d3.scale.linear().domain([0, this.height]).range([this.height, 0]);
        //Create the Axis
        var xAxis = d3.svg.axis().scale(xAxisScale);
        var yAxis = d3.svg.axis().scale(yAxisScale).orient("left");
        //Create an SVG group Element for the Axis elements and call the xAxis function
        var xAxisGroup = this.svgcontainer.append("svg:g").attr("class", "x axis").attr("transform", "translate(" + this.space + "," + (this.height + this.space) + ")").call(xAxis);
        var yAxisGroup = this.svgcontainer.append("svg:g").attr("class", "y axis").attr("transform", "translate(" + this.space + ","  + this.space + ")").call(yAxis);
        this.suite = this.svgcontainer.selectAll("circle");
        this.bindCircles(this.suite.data(this.circles));
	},
    
    bindCircles : function(displayedData) {
        
        this.removeCircle(displayedData);
        this.appendCircle(displayedData);
        this.displayCircle(displayedData);
    },
    
    appendCircle : function(displayedData) {
        displayedData.enter().append("svg:circle");
    },
    
    removeCircle : function(displayedData) {
        displayedData.exit().remove();
    },
    
    displayCircle : function(displayedData) {
        displayedData.attr("cx", this.getX.bind(this))
            .attr("cy", this.getY.bind(this))
            .attr("r", function(d) { return d.r; })
            .attr("fill", function(d) { return d.color; });
    },
    
    addCircle : function() {
        var x = this.getIntValue('#xinput', 0);
        var y = this.getIntValue('#yinput', 0);
        var radius = this.getIntValue('#radiusinput', 5);
        var color = this.getStringValue('#colorinput', 'black');
        if ((x - radius >= 0) && (y - radius >= 0)) {
            var elm = {r : radius, x : x, y : y, color : color};
            this.circles.push(elm);
            this.suite = d3.select("svg").selectAll("circle");
            this.bindCircles(this.suite.data(this.circles));
        }
    },
    
    getIntValue : function(id, defaultvalue) {
        var x = $(id)[0].value;
        if (x !== "") {
            try {
                x = parseInt(x, 10);
            }
            catch (e) {
                x = defaultvalue;
            }
        }
        else {
            x = defaultvalue;
        }
        return x;
    },
    
    getStringValue : function(id, defaultvalue) {
        var x = $(id)[0].value;
        if (x === "") {
            x = defaultvalue;
        }
        return x;
    },
    
    removeFirstCircle : function() {
        if (this.circles.length !== 0) {
            var elm = this.circles.shift();
            this.suite = d3.select("svg").selectAll("circle");
            this.bindCircles(this.suite.data(this.circles));
        }
    }
    
};