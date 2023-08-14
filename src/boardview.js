var BoardView = cc.Node.extend({

	ctor: function(boardModel){
		this._super();
		this.boardModel = boardModel;
		this.wordsBoard = new cc.Scale9Sprite.create("res/game/board_bg.png");
		this.wordsBoard.setContentSize(cc.size(1200, 410));
    	this.addChild(this.wordsBoard);
    	this.addWordsOnBoard();
	},

	addWordsOnBoard: function(){
		for(let j = 0; j < 2; j++){
		for(let i = 0; i < this.boardModel.words.length / 2; i++){
			let wordView = new WordView(this.boardModel.words[i * 2 + j]);
		    wordView.setPosition(75 + j * 500, this.wordsBoard.height - 50 - 100 * i );
		    this.wordsBoard.addChild(wordView);
		}
		}
	}
});