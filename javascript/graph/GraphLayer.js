// GraphLayer class/object
// Parameters: game object, instance of parent Graph class, layer parameters (color, size of rect)

GraphLayer = function(game, graph, layerParameters, layerTitle, axesParameters, dataMarkerParameters, text) {
	this.game = game;
	this.graph = graph;
    Phaser.Group.call(this, game, graph);

	this._layerParameters = layerParameters;
	this.layerTitle = layerTitle;
	this._layerGraphics = this.game.add.graphics(0, 0);

	this._axesParameters = axesParameters;
	this._dataMarkerParameters = dataMarkerParameters;

	this._text = text;

	this._init();
};

GraphLayer.prototype = Object.create(Phaser.Group.prototype);
GraphLayer.prototype.constructor = GraphLayer;

// Inititalize
GraphLayer.prototype._init = function() {
	//this._bgColor = this._layerParameters.bgColor;

	if (this._layerParameters.bgColor != undefined) {
		this._bgColor = this._layerParameters.bgColor;
	}

	if (this._layerParameters.bgImage != undefined) {
		this._bgImageName = this._layerParameters.bgImage;
	}

	// Place on screen within this layer group
	this.add(this._layerGraphics);

	// Axes
	this._initAxes();

	this._initDataMarkers();

	this.drawLayer();
};

GraphLayer.prototype._initDataMarkers = function(){
	//var markerParams = {color: "0x993333", shape: "square", size: 4};

	var layerAxes = this._layerParameters.axes;
	var xAxisValuesRange = this._axesParameters[layerAxes.x_axis].valuesRange;
	var yAxisValuesRange = this._axesParameters[layerAxes.y_axis].valuesRange;

	var aAxesValueRanges = [xAxisValuesRange, yAxisValuesRange];



	// Get parameters of Data Markers that belong on this Graph Layer
	var layerTitle;
	var dataMarkerParams;
	for (layerTitle in this._dataMarkerParameters) {
		var checkLayerTitle = this._dataMarkerParameters[layerTitle].graphLayer;

		if (checkLayerTitle == this.layerTitle) {
			dataMarkerParams = this._dataMarkerParameters[layerTitle];

			//console.log(dataMarkerParams);
		}
	}

	this._dataMarkerGroup = new DataMarkerGroup(this.game, this.graph, this, aAxesValueRanges, dataMarkerParams);
	//this._dataMarkerGroup = new DataMarkerGroup(this.game, this.graph, this, aAxesValueRanges, this._dataMarkerParameters);
	//this._dataMarkerGroup = new DataMarkerGroup(this.game, this.graph, this, aAxesValueRanges, markerParams);

	this.add(this._dataMarkerGroup); // Add to Layer group

	///var testDataMarkerGroup = new DataMarkerGroup(this.game, this.graph, this, markerParams);

	//console.log(this._dataMarkerParameters);
};

GraphLayer.prototype.addDataPair = function(aDataPair){
	this._dataMarkerGroup.addDataPair(aDataPair);
};

GraphLayer.prototype._initAxes = function(){
	var layerAxes = this._layerParameters.axes;

	var xAxisParams = this._axesParameters[layerAxes.x_axis];
	var yAxisParams = this._axesParameters[layerAxes.y_axis];

	this.xAxis = new GraphAxis(this.game, this.graph, xAxisParams, this._text[layerAxes.x_axis]);
	this.yAxis = new GraphAxis(this.game, this.graph, yAxisParams, this._text[layerAxes.y_axis]);

	//var xAxis = new GraphAxis(this.game, this.graph, xAxisParams);
	//var yAxis = new GraphAxis(this.game, this.graph, yAxisParams);

	//this.add(xAxis); // Add to Layer group
	//this.add(yAxis); // Add to Layer group

	this.add(this.xAxis); // Add to Layer group
	this.add(this.yAxis); // Add to Layer group
};

// Public Methods

GraphLayer.prototype.drawBg = function() {
	//var margins = this.graph._margins;

	// Draw a solid fill color if bgColor was defined in the JSON data file
	if (this._bgColor != undefined) {
		var aGraphSize = this.graph._aGraphSize

		this._layerGraphics.beginFill(this._bgColor);
		this._layerGraphics.drawRect(0, 0, aGraphSize[0], aGraphSize[1]);
		this._layerGraphics.endFill();
	} else if (this._bgImageName != undefined) {
		this._bgImage = this.game.add.image(0, 0, this._bgImageName);
		this.addAt(this._bgImage, 0);
	} else {
		console.log('Error setting background color or image for graph layer background.');
	}

	//console.log(this.children);
};

GraphLayer.prototype.eraseLayer = function(){
    this._layerGraphics.clear();

	// ADD CODE TO ERASE AXES
	// ADD CODE TO ERASE DATA MARKERS & GROUP
};

GraphLayer.prototype.drawLayer = function(){
    this.drawBg();

	// ADD CODE TO DRAW AXES
	// ADD CODE TO DRAW DATA MARKERS & GROUP
};

GraphLayer.prototype.setColor = function(newColor){
    this._layerGraphics.clear();
	this._bgColor = newColor;
	this.drawLayer();
};

GraphLayer.prototype.setSize = function(aSize){
    this._layerGraphics.clear();
	//this.a_paperSize = aSize;
	this.drawLayer();
};

GraphLayer.prototype.hideLayer = function(){
    //this._layerGraphics.visible = false;
	this.visible = false;
	//this._dataMarkerGroup.visible = false;
};

GraphLayer.prototype.showLayer = function(){
    //this._layerGraphics.visible = true;
	this.visible = true;
	//this._dataMarkerGroup.visible = true;
};

GraphLayer.prototype.getTickScreenInterval = function(sAxis){
    var tickScreenInterval;

	if (sAxis == 'x-axis') {
		tickScreenInterval = this.xAxis.getTickScreenInterval();
	} else if (sAxis == 'y-axis') {
		tickScreenInterval = this.yAxis.getTickScreenInterval();
	} else {
		console.log('Error getting Tick Screen Interval from Graph Layer');
	}

	return tickScreenInterval;
};

GraphLayer.prototype.getScreenScale = function(sAxis){
    var screenScale;
	//console.log('axis = ' + sAxis);

	if (sAxis == 'x-axis') {
		screenScale = this.xAxis.getScreenScale();
	} else if (sAxis == 'y-axis') {
		screenScale = this.yAxis.getScreenScale();
	} else {
		console.log('Error getting Screen Scale from Graph Layer');
	}

	return screenScale;
};

GraphLayer.prototype.getValuesRange = function(sAxis){
    var aValuesRange;

	if (sAxis == 'x-axis') {
		aValuesRange = this.xAxis.getValuesRange();
	} else if (sAxis == 'y-axis') {
		aValuesRange = this.yAxis.getValuesRange();
	} else {
		console.log('Error getting Values Range from Graph Layer');
	}

	return aValuesRange;
};
