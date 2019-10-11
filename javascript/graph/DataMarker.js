// DataMarker class/object
// Parameters: game object, instance of parent Graph class, paper parameters (color, size of rect)

DataMarker = function(game, markerParameters) {
	this.game = game;
	//this.graphLayer = graphLayer;
    Phaser.Image.call(this, game);
	
	//this.graph = graph;
	this._markerParameters = markerParameters;
	this._markerGraphics = this.game.add.graphics(0, 0);
	
	this._init();
};

DataMarker.prototype = Object.create(Phaser.Image.prototype);
DataMarker.prototype.constructor = DataMarker;

// Inititalize
DataMarker.prototype._init = function() {
	/*this.add(this._axisGraphics);
	this.drawAxis();
	
	var axisUnits = this._axisParameters.units;
	var aValuesRange = this._axisParameters.valuesRange;
	var minValue = aValuesRange[0];
	var maxValue = aValuesRange[1];*/
	
	this.addChild(this._markerGraphics);
	
	this._drawMarker();
};

DataMarker.prototype._drawMarker = function() {
	var markerShape = this._markerParameters.shape;
	
	if (markerShape == "square") {
		this._drawSquare();
	} else if (markerShape == "circle") {
		this._drawCircle();
	} else if (markerShape == "triangle") {
		this._drawTriangle();
	}

};

DataMarker.prototype._drawSquare = function() {
	var halfSize = this._markerParameters.size/2;
	
	var lineColor = this._markerParameters.lineColor;
	var fillColor = this._markerParameters.fillColor;
	
	this._markerGraphics.beginFill(fillColor);
	this._markerGraphics.lineStyle(1, lineColor, 1);
	this._markerGraphics.drawRect(-halfSize, -halfSize, 2*halfSize, 2*halfSize);
	this._markerGraphics.endFill();
};

DataMarker.prototype._drawCircle = function() {
	var diameter = this._markerParameters.size;
	
	var lineColor = this._markerParameters.lineColor;
	var fillColor = this._markerParameters.fillColor;
	
	this._markerGraphics.beginFill(fillColor);
	this._markerGraphics.lineStyle(1, lineColor, 1);
	this._markerGraphics.drawCircle(0, 0, diameter);
	this._markerGraphics.endFill();
};

DataMarker.prototype._drawTriangle = function() {
	var halfSize = this._markerParameters.size/2;
	
	var lineColor = this._markerParameters.lineColor;
	var fillColor = this._markerParameters.fillColor;
	
	this._markerGraphics.beginFill(fillColor);
	this._markerGraphics.lineStyle(1, lineColor, 1);
	//this._markerGraphics.drawCircle(0, 0, diameter);
	this._markerGraphics.moveTo(0, -halfSize);
	this._markerGraphics.lineTo(halfSize, halfSize);
	this._markerGraphics.lineTo(-halfSize, halfSize);
	this._markerGraphics.lineTo(0, -halfSize);
	this._markerGraphics.endFill();
};

/*DataMarker.prototype.erasePaper = function(){
    //this._paperGraphics.clear();
};

DataMarker.prototype.setColor = function(newColor){
    //this._paperGraphics.clear();
	//this._paperColor = newColor;
	//this.drawPaper();
};

DataMarker.prototype.setSize = function(aSize){
    //this._paperGraphics.clear();
	//this.a_paperSize = aSize;
	//this.drawPaper();
};*/