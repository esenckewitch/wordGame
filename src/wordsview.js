var WordView = cc.Node.extend({
	ctor: function(word){
		this._super();
		this.word = word;
		this.cellsPosition = [];
		this.letterWidth = 85;
		this.length = this.letterWidth * word.length;
		this.addCells();
		this.word.onGuessedWord = this.addLettersInCells.bind(this);
		this.word.showLetter = this.addLetterInCell.bind(this);
	},

	addCells: function(){
		for(let i = 0; i < this.word.length; i++){
			let cell = new cc.Sprite.create("res/game/cell.png");
			cellPosition = {x: this.width + i * this.letterWidth, y: this.height}
			cell.setPosition(cellPosition.x, cellPosition.y);
			this.cellsPosition.push(cellPosition);
			this.addChild(cell);
		}
	},

	addLetterInCell: function(pos){
		let leterView = new LetterView(this.word.word[pos]);
		leterView.setPosition(this.cellsPosition[pos].x, this.cellsPosition[pos].y);
		this.addChild(leterView);
	},

	addLettersInCells: function(){
		for(let i = 0; i < this.word.length; i++){
			this.addLetterInCell(i);
		}
	},

});