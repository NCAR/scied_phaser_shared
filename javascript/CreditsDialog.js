CreditsDialog = function(game, size) {
	this.game = game; // keep reference to main game object
	
	this._size = size;
	this._loc;
	this._text;
	
	this._initCreditsDialog();
	
	//DialogBox.call(this.game);
	DialogBox.call(this);
	//DialogBox.call(this, this._size, this._loc);
	//DialogBox.call(this, this._size, this._loc, this._text);
};

CreditsDialog.prototype = Object.create(DialogBox.prototype);
CreditsDialog.prototype.constructor = CreditsDialog;

CreditsDialog.prototype._initCreditsDialog = function() {
	//this._size = {width:400, height:300};
	this._loc = {x: (this.game.world._width - this._size.width)/2, y: (this.game.world._height - this._size.height)/2};
	
	// Text (read from JSON data file)
	var dialogJSON = this.game.cache.getJSON('dialog')
	this._text = dialogJSON['credits'];
};