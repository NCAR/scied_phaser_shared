// GraphAxis class/object
// Parameters: game object, instance of parent Graph class, axis parameters (orientation, color, units, valuesRange)

GraphAxis = function(game, graph, axisParameters, label) {
	this.game = game;
    Phaser.Group.call(this, game);

	this.graph = graph;
	this._axisParameters = axisParameters;
	this._axisGraphics = this.game.add.graphics(0, 0);
	this._label = label;

	this._init();
};

GraphAxis.prototype = Object.create(Phaser.Group.prototype);
GraphAxis.prototype.constructor = GraphAxis;

// Inititalize
GraphAxis.prototype._init = function() {
	this.add(this._axisGraphics);
	this.drawAxis();

	this._initTickMarks();
	this._initTitle();

	this._initGridLines();

	//var axisUnits = this._axisParameters.units;
	//var aValuesRange = this._axisParameters.valuesRange;
	//var minValue = aValuesRange[0];
	//var maxValue = aValuesRange[1];

	//console.log("The range of this axis is from " + minValue + " to " + maxValue + " " + axisUnits)
};

// Public Methods

GraphAxis.prototype.drawAxis = function() {
	var aGraphSize = this.graph._aGraphSize;

	var axisColor = this._axisParameters.color;
	var orientation = this._axisParameters.orientation;

	this._axisGraphics.lineStyle(1, axisColor, 1);
	this._axisGraphics.moveTo(0, aGraphSize[1]);

	if (orientation == "vertical") {
		this._axisGraphics.lineTo(0, 0);
	} else if (orientation == "horizontal") {
		this._axisGraphics.lineTo(aGraphSize[0], aGraphSize[1]);
	}
};

GraphAxis.prototype.eraseAxis = function(){
    this._axisGraphics.clear();
};

GraphAxis.prototype.setColor = function(newColor){
    this._axisGraphics.clear();
	//this._paperColor = newColor;
	//this.drawPaper();
};

GraphAxis.prototype.setSize = function(aSize){
    this._axisGraphics.clear();
	//this.a_paperSize = aSize;
	//this.drawPaper();
};

GraphAxis.prototype.getTickScreenInterval = function(){
    var tickInterval = this._axisParameters.tickInterval;

	var aGraphSize = this.graph._aGraphSize;

	var aValuesRange = this._axisParameters.valuesRange;
	var valuesRange = aValuesRange[1] - aValuesRange[0];

	var screenScale = aGraphSize[1]/valuesRange;
	var tickScreenInterval = tickInterval * screenScale;

	return tickScreenInterval;
};

// Getter for scale along this axis (pixels per unit)
GraphAxis.prototype.getScreenScale = function(){
    var aGraphSize = this.graph._aGraphSize;

	var aValuesRange = this._axisParameters.valuesRange;
	var valuesRange = aValuesRange[1] - aValuesRange[0];

	var screenScale = aGraphSize[1]/valuesRange;

	return screenScale;
};

// Getter for values range along this axis (min and max in an array)
GraphAxis.prototype.getValuesRange = function(){
    return this._axisParameters.valuesRange;
};


// Private Methods

////////////////
// Tick Marks //
////////////////

GraphAxis.prototype._initTickMarks = function() {
	// Set a default value for tick mark length if it is not specified in the JSON graphs file
	if (this._axisParameters.tickLength === undefined) {
		this._tickLength = 10;
	} else {
		this._tickLength = this._axisParameters.tickLength;
	}

	// Set a default value for text (axis title and tick mark value labels) color if it is not specified in the JSON graphs file
	if (this._axisParameters.textColor === undefined) {
		this._textColor = "#000000"; // Default color = black
	} else {
		this._textColor = this._axisParameters.textColor;
	}

	this._drawTickMarks();
};

GraphAxis.prototype._drawTickMarks = function() {
	var aGraphSize = this.graph._aGraphSize;

	var tickInterval = this._axisParameters.tickInterval;
	//var tickLength = 10;
	//var tickLength = this._tickLength;

	var orientation = this._axisParameters.orientation;

	var aValuesRange = this._axisParameters.valuesRange;
	var valuesRange = aValuesRange[1] - aValuesRange[0];

	var tickCount = Math.trunc(valuesRange/tickInterval);

	var screenScale;
	var tickScreenInterval;

	var aStartLoc = [];
	var aEndLoc = [];
	var aValueLabelLoc = [];

	// Set value later after TickValueLabels have been created
	//this._tickLabelFontSize = 0;
	this._axisLabelOffset = 0;

	var iTickNum;
	for (iTickNum = 0; iTickNum <= tickCount; iTickNum++) {
		if (orientation == "vertical") {
			screenScale = aGraphSize[1]/valuesRange;
			tickScreenInterval = tickInterval * screenScale;
			var yScreen = aGraphSize[1] - iTickNum*tickScreenInterval;

			aStartLoc[0] = 0;
			aStartLoc[1] = yScreen;

			aEndLoc[0] = -this._tickLength;
			aEndLoc[1] = yScreen;

			aValueLabelLoc[0] = -10;
			aValueLabelLoc[1] = yScreen;
		} else if (orientation == "horizontal") {
			screenScale = aGraphSize[0]/valuesRange;
			tickScreenInterval = tickInterval * screenScale;
			var xScreen = iTickNum*tickScreenInterval;
			var yScreen = aGraphSize[1];

			aStartLoc[0] = xScreen;
			aStartLoc[1] = aGraphSize[1];

			aEndLoc[0] = xScreen;
			aEndLoc[1] = aGraphSize[1] + this._tickLength;

			aValueLabelLoc[0] = xScreen;
			aValueLabelLoc[1] = yScreen + this._tickLength;
		}

		this._drawTickMark(aStartLoc, aEndLoc);

		var tickValue = aValuesRange[0] + iTickNum*tickInterval;
		this._drawTickValueLabel(tickValue, aValueLabelLoc);
	}
};

GraphAxis.prototype._drawTickMark = function(aStartLoc, aEndLoc) {
	this._axisGraphics.lineStyle(1, this._axisParameters.color, 1);

	this._axisGraphics.moveTo(aStartLoc[0], aStartLoc[1]);
	this._axisGraphics.lineTo(aEndLoc[0], aEndLoc[1]);
};

GraphAxis.prototype._drawTickValueLabel = function(tickValue, aLoc) {
	var margin = 3;

	var tickValueLabelStyle = {font: "12px Arial", fill: this._textColor, align: "center"};
	//var tickValueLabelStyle = {font: "12px Arial", fill: this._textColor, align: "center", backgroundColor: "#ff0000"}; //#ff0000

	var tickValueLabelText = this.game.add.text(0, 0, tickValue, tickValueLabelStyle);
	this.add(tickValueLabelText);

	var orientation = this._axisParameters.orientation;

	// Position labels next to tick marks along axis
	if (orientation == "vertical") {
		tickValueLabelText.x = aLoc[0] - (tickValueLabelText.width + margin);
		tickValueLabelText.y = aLoc[1] - Math.round(tickValueLabelText.fontSize/2);

		// For use in setting position of Axis Title
		var currentOffset = this._tickLength + 2*margin + tickValueLabelText.width;
		if (currentOffset > this._axisLabelOffset) {
			this._axisLabelOffset = currentOffset;
		}
	} else if (orientation == "horizontal") {
		tickValueLabelText.x = aLoc[0] - Math.round(tickValueLabelText.width/2);
		tickValueLabelText.y = aLoc[1] + margin;

		// For use in setting position of Axis Title
		var currentOffset = this._tickLength + 2*margin + tickValueLabelText.fontSize;
		if (currentOffset > this._axisLabelOffset) {
			this._axisLabelOffset = currentOffset;
		}
	}
};

////////////////
// Axis Title //
////////////////

GraphAxis.prototype._initTitle = function() {
	var sAxisTitle = this._label;

	var titleStyle = {font: "18px Arial", fill: this._textColor, align: "center"};

	var axisTitleText = this.game.add.text(0, 0, sAxisTitle, titleStyle);
	this.add(axisTitleText);

	var orientation = this._axisParameters.orientation;
	var aGraphSize = this.graph._aGraphSize;

	// Position title next to axis
	if (orientation == "vertical") {
		axisTitleText.anchor.setTo(0.5, 1);
		axisTitleText.x = -this._axisLabelOffset;
		axisTitleText.y = aGraphSize[1]/2;
		axisTitleText.angle = -90;
	} else if (orientation == "horizontal") {
		axisTitleText.anchor.setTo(0.5, 0);
		axisTitleText.x = aGraphSize[0]/2;
		axisTitleText.y = aGraphSize[1] + this._axisLabelOffset;
	}
};

////////////////
// Grid Lines //
////////////////

GraphAxis.prototype._initGridLines = function() {
	// Set a default value for text (axis title and tick mark value labels) color if it is not specified in the JSON graphs file
	var gridLineColor;
	if (this._axisParameters.gridLineColor === undefined) {
		gridLineColor = "0x999999"; // Default color = light gray
	} else {
		gridLineColor = this._axisParameters.gridLineColor;
	}

	//var gridLineColor = "0x999999";
	this._axisGraphics.lineStyle(1, gridLineColor, 1);

	var aGraphSize = this.graph._aGraphSize;
	var orientation = this._axisParameters.orientation;

	var aValuesRange = this._axisParameters.valuesRange;
	var valuesRange = aValuesRange[1] - aValuesRange[0];

	var lineInterval = this._axisParameters.tickInterval;
	var lineCount = Math.trunc(valuesRange/lineInterval);

	var screenScale;
	var lineScreenInterval;

	var aStartLoc = [];
	var aEndLoc = [];

	var iLineNum;
	for (iLineNum = 1; iLineNum < lineCount; iLineNum++) {
		if (orientation == "vertical") {
			screenScale = aGraphSize[1]/valuesRange;
			lineScreenInterval = lineInterval * screenScale;
			var yScreen = aGraphSize[1] - iLineNum*lineScreenInterval;

			aStartLoc[0] = 0;
			aStartLoc[1] = yScreen;

			aEndLoc[0] = aGraphSize[0];
			aEndLoc[1] = yScreen;
		} else if (orientation == "horizontal") {
			screenScale = aGraphSize[0]/valuesRange;
			lineScreenInterval = lineInterval * screenScale;
			var xScreen = iLineNum*lineScreenInterval;
			var yScreen = aGraphSize[1];

			aStartLoc[0] = xScreen;
			aStartLoc[1] = yScreen;

			aEndLoc[0] = xScreen;
			aEndLoc[1] = 0;
		}

		this._axisGraphics.moveTo(aStartLoc[0], aStartLoc[1]);
		this._axisGraphics.lineTo(aEndLoc[0], aEndLoc[1]);
	}
};
