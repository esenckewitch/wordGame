var LetterView = cc.Node.extend({
	ctor: function(letter){
		this._super();
		this.letter = letter;
		this.addBackground();
		this.addLetter();
	},
	addBackground: function(){
		let letterBg = new cc.Sprite.create("res/game/letter_bg.png");
		let actionScale = cc.ScaleTo.create(0.1, 10, 10);
		this.addChild(letterBg);
		letterBg.runAction(actionScale);
	},

	addLetter: function(){
		let letter = new cc.Sprite.create("res/letters/" + this.letter + ".png");
		this.setScale(0.1);
		let actionScale = cc.ScaleTo.create(0.1, 10, 10);
		this.addChild(letter);
		letter.runAction(actionScale);
	}
});