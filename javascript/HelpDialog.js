HelpDialog = function(game, size) {
	this.game = game; // keep reference to main game object
	
	this._size = size;
	this._loc;
	this._text;
	
	this._initHelpDialog();
	
	DialogBox.call(this);
};

HelpDialog.prototype = Object.create(DialogBox.prototype);
HelpDialog.prototype.constructor = HelpDialog;

HelpDialog.prototype._initHelpDialog = function() {
	//this._size = {width:650, height:450};
	this._loc = {x: (this.game.world._width - this._size.width)/2, y: (this.game.world._height - this._size.height)/2};
	
	// Text (read from JSON data file)
	var dialogJSON = this.game.cache.getJSON('dialog');
	
	if (this.game._currentLevel == 0){
		this._text = dialogJSON['sandbox'];
	} else {
		this._text = dialogJSON['level' + this.game._currentLevel];
	}
};