// DataMarkerGroup class/object
// Parameters: game object, instance of parent Graph class, layer parameters (color, size of rect)

DataMarkerGroup = function(game, graph, graphLayer, aAxesValueRanges, markerParameters) {
	this.game = game;
	this.graph = graph;
    Phaser.Group.call(this, game, graphLayer);
	
	this._markerParameters = markerParameters;
	this._aDataMarkers = [];
	
	this._aAxesValueRanges = aAxesValueRanges;
	
	this._init();
};

DataMarkerGroup.prototype = Object.create(Phaser.Group.prototype);
DataMarkerGroup.prototype.constructor = DataMarkerGroup;

// Inititalize
DataMarkerGroup.prototype._init = function() {
	/*var graphHeight = this.graph._aGraphSize[1];
	
	var testDataMarker1 = new DataMarker(this.game, this._markerParameters);
	this.add(testDataMarker1); // Add to Data Marker group
	testDataMarker1.x = 100;
	testDataMarker1.y = graphHeight - 50;
	this._aDataMarkers.push(testDataMarker1);
	
	var testDataMarker2 = new DataMarker(this.game, this._markerParameters);
	testDataMarker2.x = 200;
	testDataMarker2.y = graphHeight - 100;
	this.add(testDataMarker2); // Add to Data Marker group
	this._aDataMarkers.push(testDataMarker2);
	
	var testDataMarker3 = new DataMarker(this.game, this._markerParameters);
	this.add(testDataMarker3); // Add to Data Marker group
	testDataMarker3.x = 300;
	testDataMarker3.y = graphHeight - 150;
	this._aDataMarkers.push(testDataMarker3);
	
	var testDataMarker4 = new DataMarker(this.game, this._markerParameters);
	testDataMarker4.x = 400;
	testDataMarker4.y = graphHeight - 300;
	this.add(testDataMarker4); // Add to Data Marker group
	this._aDataMarkers.push(testDataMarker4);*/
};

// Public Methods

DataMarkerGroup.prototype.addDataPair = function(aDataPair) {
	var graphWidth = this.graph._aGraphSize[0];
	var graphHeight = this.graph._aGraphSize[1];
	
	var xValueMin = this._aAxesValueRanges[0][0];
	var xValueMax = this._aAxesValueRanges[0][1];
	
	var yValueMin = this._aAxesValueRanges[1][0];
	var yValueMax = this._aAxesValueRanges[1][1];
	
	var xFraction = (aDataPair[0] - xValueMin)/(xValueMax - xValueMin);
	var yFraction = (aDataPair[1] - yValueMin)/(yValueMax - yValueMin);
	
	//console.log(this._markerParameters);
	
	var newDataMarker = new DataMarker(this.game, this._markerParameters);
	newDataMarker.x = xFraction*graphWidth;
	newDataMarker.y = (1 - yFraction)*graphHeight;
	this._aDataMarkers.push(newDataMarker);
	this.add(newDataMarker); // Add to Data Marker group on screen
};
