//AboutDialog = function(game, size, sWhichText) {
AboutDialog = function(game, config, sWhichText) {
	this.game = game; // keep reference to main game object

	this._size;
	this._config = config;
	this._sWhichText = sWhichText;
	this._loc;
	this._text;

	this._initAboutDialog();

	DialogBox.call(this);
	console.log
};

AboutDialog.prototype = Object.create(DialogBox.prototype);
AboutDialog.prototype.constructor = AboutDialog;

AboutDialog.prototype._initAboutDialog = function() {
	//this._loc = {x: (this.game.world._width - this._size.width)/2, y: (this.game.world._height - this._size.height)/2};

	// Text (read from JSON data file)
	var dialogJSON = this.game.cache.getJSON('about');
	this._text = this._sWhichText;
	//this._text = dialogJSON['level' + this.game._currentLevel];
	var size = dialogJSON[this._config + 'Size'];
	this._size = dialogJSON[this._config + 'Size'];
	var boxWidth = size.width; var boxHeight = size.height;
	this._size.width = boxWidth;
	this._size.height = boxHeight;
	this._loc = {x: (this.game.world._width - boxWidth)/2, y: (this.game.world._height - boxHeight)/2};
};
