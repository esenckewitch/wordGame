var ShuffleView = cc.Node.extend({
	ctor: function(shuffle){
		this._super();
		this.shuffleLettersCoords = [];
		this.shuffle = shuffle;
		this.shuffle.onFirstLetter = this.addMenuButtons.bind(this);
		this.shuffle.onAddLetter = this.addCurrentWord.bind(this);
		this.shuffle.onClear = this.clearCurrent.bind(this);
		this.letters = [];
		this.LettersCoords = [];
		this.i = 0;
		this.generateCoord(shuffle.shuffleWord);
		this.addLettersCyrcle(shuffle.shuffleWord);
		this.addShuffleButton();
		this.shuffleTime = 0;
	},

	addBackground: function(x, y){
		
	},

	addLetterButton: function(letter, x, y){
		let letterBg = new cc.Sprite.create("res/game/letter_bg.png");
		letterBg.setPosition(x, y);
		this.addChild(letterBg);
		let size = cc.spriteFrameCache.getSpriteFrame(letter +'.png').getOriginalSize();
    	let letterButton = new ccui.Button('#' + letter +'.png', '#' + letter +'.png', '#' + letter +'.png', ccui.Widget.PLIST_TEXTURE);
    	letterButton.setCapInsets(cc.rect(size.width, size.height, 2, 2));
    	letterButton.setPosition(x, y);
    	letterButton.addClickEventListener(function(){
    		this.shuffle.addLetter(letter);
    	}.bind(this));
    	this.addChild(letterButton);
    	this.LettersCoords.push({let:letterButton, beg: letterBg});
	},

	addCrossButton: function(x, y){
		var size = cc.spriteFrameCache.getSpriteFrame('word_wrong.png').getOriginalSize();
    	this.crossButton = new ccui.Button('#word_wrong.png', '#word_wrong.png', '#word_wrong.png', ccui.Widget.PLIST_TEXTURE);
    	this.crossButton.setCapInsets(cc.rect(size.width, size.height, 2, 2));
    	this.crossButton.setPosition(x, y);
    	this.crossButton.addClickEventListener(function(){
    		this.shuffle.clearCurrentWord();
    	}.bind(this))
    	this.addChild(this.crossButton);
	},

	addOkButton: function(x, y){
		var size = cc.spriteFrameCache.getSpriteFrame('word_right.png').getOriginalSize();
    	this.okButton = new ccui.Button('#word_right.png', '#word_right.png', '#word_right.png', ccui.Widget.PLIST_TEXTURE);
    	this.okButton.setCapInsets(cc.rect(size.width, size.height, 2, 2));
    	this.okButton.setPosition(x, y);
    	this.okButton.addClickEventListener(function(){
    		this.shuffle.selfCurrentWord();
    	}.bind(this))
    	this.addChild(this.okButton);
	},

	generateCoord: function(word){
		let radius = 100;
		let x = 0;
		let y = 0;
		for(let i = 0; i < word.length; i++){
			let f = Math.PI * (360 / word.length) * i / 180 + 180;
			x = radius * Math.cos(f);
			y = radius * Math.sin(f);
			this.shuffleLettersCoords.push({x: x, y: y});
		}
	},

	addLettersCyrcle: function(word){
		for(let i = 0; i < this.shuffleLettersCoords.length; i++){
			this.addBackground(this.shuffleLettersCoords[i].x, this.shuffleLettersCoords[i].y);
			this.addLetterButton(word[i], this.shuffleLettersCoords[i].x, this.shuffleLettersCoords[i].y);
		}
	},

	addMenuButtons: function(word){
		this.addOkButton(250, 0);
		this.addCrossButton(-250, 0);
	},

	addCurrentWord: function(letter){
		let letterView = new LetterView(letter);
		this.letters.push(letterView);
		letterView.setPosition(this.i * 100 - 400, 200);
		this.addChild(letterView);
		this.i++;
	},

	clearCurrent: function(){
		for(let i = 0; i < this.letters.length; i++){
			this.removeChild(this.letters[i]);
		}
		this.letters = [];
		this.removeChild(this.okButton);
		this.removeChild(this.crossButton);
		this.i = 0;
	},
	

	shuffleLetters: function(){
		let prevCoords = this.shuffleLettersCoords;
		let newCoords = [];
		while(prevCoords.length > 0){
			let rid = getRandomInt(prevCoords.length);
			newCoords.push(prevCoords[rid]);
			prevCoords.splice(rid, 1);
		}
		this.shuffleLettersCoords = newCoords;
	},

	moveLetterButtons: function(){
		let waitTime = this.shuffleTime + 200 - Date.now();
		if(waitTime > 0){
			return;
		}
		this.shuffleLetters();
		for(let i = 0; i < this.LettersCoords.length; i++){
			let actionMove1 = cc.MoveTo.create(0.2, cc.p(this.shuffleLettersCoords[i].x, this.shuffleLettersCoords[i].y));
			let actionMove2 = cc.MoveTo.create(0.2, cc.p(this.shuffleLettersCoords[i].x, this.shuffleLettersCoords[i].y));
			this.LettersCoords[i].let.runAction(actionMove1);
			this.LettersCoords[i].beg.runAction(actionMove2);
		}
		this.shuffleTime = Date.now();
	},

	addShuffleButton: function(){
		var buttonSize = cc.spriteFrameCache.getSpriteFrame('shuffle.png').getOriginalSize();
        this.shuffleButton = new ccui.Button('#shuffle.png', '#shuffle.png', '#shuffle.png', ccui.Widget.PLIST_TEXTURE);
        this.shuffleButton.setScale9Enabled(true);
        this.shuffleButton.setTitleFontName(resources.marvin_round.name);
        this.addChild(this.shuffleButton);
        this.shuffleButton.addClickEventListener(function(){
        	setIntervalX(function(){
        		this.moveLetterButtons();
        	}.bind(this), 250, 5);
        }.bind(this));
	}
});
