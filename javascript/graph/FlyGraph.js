// To do:
//   Add parameter to specify graphing of moisture or temperature or both
//   Add parameter to specify # of years along the x-axis
//   Maybe add parameter to specify graph paper size


// FlyGraph class/object
// Parameters: game object, x coord, y coord
FlyGraph = function(game, graphParameters, text) {
	this.game = game;
    Phaser.Group.call(this, game);

	this._graphParameters = graphParameters;
	this._paper;
	this._aLayers = [];
	this._text = text;

	this._init();
};

FlyGraph.prototype = Object.create(Phaser.Group.prototype);
FlyGraph.prototype.constructor = FlyGraph;

// Inititalize
FlyGraph.prototype._init = function() {
	// Size (x- and y-dimensions) of graph "paper"
	var aPaperSize = this._graphParameters.paper.size;

	// Margins between graphing area and surrounding graph 'paper'
	this._margins = this._graphParameters.margins;

	// Size (x- and y-dimensions) of graph area
	this._aGraphSize = [aPaperSize[0] - (this._margins.left + this._margins.right), aPaperSize[1] - (this._margins.top + this._margins.bottom)];

	// Coordinates (pixels) of graph origin point
	this._aOrigin = [this._margins.left, aPaperSize[1] - this._margins.bottom];

	this._initPaper();
	this._initLayers();
};

// Public Methods
FlyGraph.prototype.addDataPair = function(sLayer, aDataPair){
    var whichLayer = this.getLayer(sLayer);
	whichLayer.addDataPair(aDataPair);
};


// reset the FlyGraph to init conditions
FlyGraph.prototype.resetGraph = function(){
    //this.setRings([]);
};

// Draw the FlyGraph
/*FlyGraph.prototype.update = function() {
    this.clear();

	this.beginFill(0x996633);
	this.arc(0, 0, 100, Math.PI/2, 3*Math.PI/2);
	this.endFill();
};*/

FlyGraph.prototype.debug = function(){
    console.log(this);
};

FlyGraph.prototype.getTickScreenInterval = function(sLayer, sAxis){
    var whichLayer = this.getLayer(sLayer);
	var tickScreenInterval = whichLayer.getTickScreenInterval(sAxis);
	return tickScreenInterval;
};

FlyGraph.prototype.getScreenScale = function(sLayer, sAxis){
    var whichLayer = this.getLayer(sLayer);
	var screenScale = whichLayer.getScreenScale(sAxis);
	return screenScale;
};

FlyGraph.prototype.getValuesRange = function(sLayer, sAxis){
    var whichLayer = this.getLayer(sLayer);
	var aValuesRange = whichLayer.getValuesRange(sAxis);
	return aValuesRange;
};

FlyGraph.prototype.getMargins = function(){
    return this._margins;
};

FlyGraph.prototype.getGraphSize = function(){
    return this._aGraphSize;
};

//////////////////////////////////////////
// Layers for different graphs and data //
//////////////////////////////////////////

FlyGraph.prototype._initLayers = function() {
	var layersParameters = this._graphParameters.layers;
	var axesParameters = this._graphParameters.axes;
	var dataMarkerParameters = this._graphParameters.dataMarkers;

	var layerTitle;
	for (layerTitle in layersParameters) {
		var thisLayersParams = layersParameters[layerTitle];
		thisLayersParams.aOrigin = this._aOrigin;


		var graphLayer = new GraphLayer(this.game, this, thisLayersParams, layerTitle, axesParameters, dataMarkerParameters, this._text.axes);
		this.add(graphLayer); // Add to Graph group
		graphLayer.x = this._margins.left;
		graphLayer.y = this._margins.top;
		this._aLayers.push(graphLayer);
	}
};

FlyGraph.prototype.eraseLayer = function(sLayerTitle) {
	var whichLayer = this.getLayer(sLayerTitle);
	whichLayer.eraseLayer();
};

FlyGraph.prototype.drawLayer = function(sLayerTitle) {
	var whichLayer = this.getLayer(sLayerTitle);
	whichLayer.drawLayer();
};

FlyGraph.prototype.hideLayer = function(sLayerTitle) {
	var whichLayer = this.getLayer(sLayerTitle);
	whichLayer.hideLayer();
};

FlyGraph.prototype.showLayer = function(sLayerTitle) {
	var whichLayer = this.getLayer(sLayerTitle);
	whichLayer.showLayer();
};

FlyGraph.prototype.setLayerColor = function(sLayerTitle, newColor) {
	var whichLayer = this.getLayer(sLayerTitle);
	whichLayer.setColor(newColor);
};

FlyGraph.prototype.getLayer = function(sLayerTitle) {
	// Find the desired layer by title, then return that layer object
	var layerNum;
	for (layerNum in this._aLayers) {
		if (this._aLayers[layerNum].layerTitle == sLayerTitle) {
			return(this._aLayers[layerNum]);
		}
	}
};

/////////////////
// Graph Paper //
/////////////////

FlyGraph.prototype._initPaper = function() {
	var paperParameters = this._graphParameters.paper;

	// Create graph paper using shared class GraphPaper
    this._paper = new GraphPaper(this.game, paperParameters);
    //this._paper = new GraphPaper(this.game, this, paperParameters);

	this.add(this._paper); // Add to Graph group
};


FlyGraph.prototype.erasePaper = function() {
	this._paper.erasePaper();
};


FlyGraph.prototype.drawPaper = function() {
	this._paper.drawPaper();
};


FlyGraph.prototype.setPaperColor = function(newPaperColor) {
	this._paper.setColor(newPaperColor);
};


FlyGraph.prototype.setPaperSize = function(aNewPaperSize) {
	// Size (x- and y-dimensions) of graph area
	this._aGraphSize = [aNewPaperSize[0] - (this._margins.left + this._margins.right), aNewPaperSize[1] - (this._margins.top + this._margins.bottom)];

	// Coordinates (pixels) of graph origin point
	this._aOrigin = [this._margins.left, aNewPaperSize[1] - this._margins.bottom];

	// Resize each of the Graph Data Layers
	var layerNum;
	for (layerNum in this._aLayers) {
		var thisLayer = this._aLayers[layerNum];
		thisLayer.setSize(this._aGraphSize);
	}

	this._paper.setSize(aNewPaperSize);
};

FlyGraph.prototype.getPaperSize = function(){
	var aPaperSize = this._paper.getSize();
	return aPaperSize;
};

///////////////////////////////////////////
// Graph axes - move to a separate class //
///////////////////////////////////////////

FlyGraph.prototype._drawAxes = function() {
	this._axes = this.game.add.graphics(this._aOrigin[0], this._aOrigin[1]);
	this.add(this._axes);

	var axisColor = this._graphParameters.axes.color;
	this._axes.lineStyle(1, axisColor, 1);
	//this._axes.lineStyle(1, 0x000000, 1);

	// Draw x-axis
	this._axes.moveTo(0, 0);
	this._axes.lineTo(this._aGraphSize[0], 0);

	// Draw y-axis
	this._axes.moveTo(0, 0);
	this._axes.lineTo(0, -1 * this._aGraphSize[1]);

	// X-axis title
	//var style = { font: "14px Arial", fill: "#000000", align: "center" };
	////var style = { font: "14px Arial", fill: "#000000", align: "center", backgroundColor: "#cccccc" };
	//var xAxisTitleLoc = [this._margins.left + (0.5 * this._aGraphSize[0]), this.a_paperSize[1]];
	//var xAxisTitle = this.game.add.text(xAxisTitleLoc[0], xAxisTitleLoc[1], "Year", style);
	//xAxisTitle.anchor.setTo(0.5, 1);
	//this.add(xAxisTitle);

	// X-axis value labels
	/*style = { font: "12px Arial", fill: "#000000", align: "center" };
	//style = { font: "12px Arial", fill: "#000000", align: "center", backgroundColor: "#aaaaaa" };
	var xAxisValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	var xValuesVerticalLoc = this.a_paperSize[1] - this._margins.bottom;
	var xValuesMargin = 20; // Indent (on both left and right ends) of first/last value label
	var xValuesSpacing = (this._aGraphSize[0] - (2 * xValuesMargin))/(xAxisValues.length - 1);
	for (i = 0; i < xAxisValues.length; i++) {
		xLoc = this._aOrigin[0] + xValuesMargin + (i * xValuesSpacing);
		valueLabel = this.game.add.text(xLoc, xValuesVerticalLoc, xAxisValues[i].toString(), style);
		valueLabel.anchor.setTo(0.5, 0);
		this.add(valueLabel);
	}

	// Y-axis value labels
	style = { font: "14px Arial", fill: "#cc6666", align: "right" };
	//style = { font: "14px Arial", fill: "#cc6666", align: "right", backgroundColor: "#ffcccc" };
	var yAxisValues = ["Cool", "Normal", "Warm"];
	var yValuesHorizontalLoc = 50;
	var yValuesMargin = 20; // Indent (on both top and bottom) of first/last value label
	var yValuesSpacing = (this._aGraphSize[1] - (2 * yValuesMargin))/(yAxisValues.length - 1);
	for (i = 0; i < yAxisValues.length; i++) {
		yLoc = this._aOrigin[1] - (yValuesMargin + (i * yValuesSpacing));
		valueLabel = this.game.add.text(yValuesHorizontalLoc, yLoc, yAxisValues[i], style);
		valueLabel.anchor.setTo(1, 0.5);
		this.add(valueLabel);
	}

	style = { font: "14px Arial", fill: "#6666cc", align: "right" };
	//style = { font: "14px Arial", fill: "#6666cc", align: "right", backgroundColor: "#ccccff" };
	yAxisValues = ["Dry", "Normal", "Wet"];
	yValuesHorizontalLoc = 105;
	for (i = 0; i < yAxisValues.length; i++) {
		yLoc = this._aOrigin[1] - (yValuesMargin + (i * yValuesSpacing));
		valueLabel = this.game.add.text(yValuesHorizontalLoc, yLoc, yAxisValues[i], style);
		valueLabel.anchor.setTo(1, 0.5);
		this.add(valueLabel);
	}*/

};
