GameOverDialog = function(game, size, text) {
	this.game = game; // keep reference to main game object

	this._size = size;
	this._loc;
	this._text = text;

	this._initGameOverDialog();

	DialogBox.call(this);
};

GameOverDialog.prototype = Object.create(DialogBox.prototype);
GameOverDialog.prototype.constructor = GameOverDialog;

GameOverDialog.prototype._initGameOverDialog = function() {
	this._loc = {x: (this.game.world._width - this._size.width)/2, y: (this.game.world._height - this._size.height)/2};

	// Text (read from JSON data file)
	/*var dialogJSON = this.game.cache.getJSON('dialog')
	this._text = dialogJSON['gameOver' + this.game._currentLevel];*/
};
