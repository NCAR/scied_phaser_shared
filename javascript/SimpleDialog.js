SimpleDialog = function(gameLevel, config) {
	this._gameLevel = gameLevel;
	
	//this._size = size;
	this._config = config;
	//this._loc;
	//this._text;
	
	this._initSimpleDialog();
	
	DialogBox2.call(this);
};

SimpleDialog.prototype = Object.create(DialogBox2.prototype);
SimpleDialog.prototype.constructor = SimpleDialog;

SimpleDialog.prototype._initSimpleDialog = function() {
	this._size = this._config.size;
	
	this._loc = {x: (this._gameLevel.world._width - this._size.width)/2, y: (this._gameLevel.world._height - this._size.height)/2};
	
	// Text (read from JSON data file)
	//var dialogJSON = this._gameLevel.cache.getJSON('dialog');
	
	this._text = this._config.bodyText;
};