// Dialog Box object - Parent for all specific dialog box children (Credits & Instructions so far)

DialogBox2 = function() {
	Phaser.Group.call(this, this._gameLevel);
	//Phaser.Group.call(this, this.game);
	
    this._closeBtn;
	
	this._initDialogBox();
	this._initText();
	this._initCloseBtn();
};

DialogBox2.prototype = Object.create(Phaser.Group.prototype);
DialogBox2.prototype.constructor = DialogBox2;

// Initialize
DialogBox2.prototype._initDialogBox = function() {
	this._drawBgRect();
	
	this.x = this._loc.x;
	this.y = this._loc.y;
};

DialogBox2.prototype._drawBgRect = function() {
	// draw outline box
	this._bgRect = this._gameLevel.add.graphics(0, 0);
	this._bgRect.beginFill(0xffffff); // formerly 0x3b639a (blue)
	this._bgRect.lineStyle(2, 0x2d5082, 1);
	this._bgRect.drawRect(0, 0, this._size.width, this._size.height);
	
	this.add(this._bgRect);
};

DialogBox2.prototype._initText = function() {
	var marginSize = 20; // Margin between text box and dialog box edges
	var style = { font: '14pt Arial', fill: '#3b639a', align: 'left', wordWrap: true, wordWrapWidth: this._size.width - 2*marginSize };
	var dialogText = this._gameLevel.add.text(marginSize, marginSize, this._text, style);
	this.add(dialogText);
};

DialogBox2.prototype._initCloseBtn = function() {
	this._closeBtn = this._gameLevel.add.button(0, 0, 'close_btn_spritesheet', this._closeDialog, this, 2, 1, 0);
	this._closeBtn.name = 'closeBtn';
	
	this.add(this._closeBtn);
	
	this._closeBtn.x = this._size.width - (this._closeBtn.width + 10);
	this._closeBtn.y = this._size.height - (this._closeBtn.height + 10);
};


DialogBox2.prototype._closeDialog = function(pointer) {
	this.visible = false;
	this._gameLevel.closeDialog(this);
};