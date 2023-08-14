var WordsGameScene = cc.Scene.extend({
    ctor: function (){
	    this._super();
	    this.addBackground();
	    this.game = new GameWords();
	    
	    
	    this.boardView = new BoardView(this.game.board);
	    this.boardView.setPosition(this.width / 2, 2 * this.height / 3);
	    this.addChild(this.boardView);

    	this.coinsView = new CoinsView(this.game.coins);
    	this.coinsView.setPosition(50, this.height - 100);
    	this.addChild(this.coinsView);

    	cc.audioEngine.playMusic(resources.game_music, true);
        cc.audioEngine.setMusicVolume(0.5);

        this.ShuffleView = new ShuffleView(this.game.shuffle);
        this.ShuffleView.setPosition(this.width / 2, this.height / 2 - this.height / 3);
        this.addChild(this.ShuffleView);
        this.game.onNotation = this.addWordNotation.bind(this);
        this.addHelpButton();
    },

    addBackground: function () {
        var background = new cc.Sprite(resources.background);
        background.setScale(Math.max(this.width / background.width, this.height / background.height));
        background.setPosition(this.width / 2, this.height / 2);
        background.setLocalZOrder(-1);
        this.addChild(background);
    },

    addWordNotation: function(str){
        let text = new ccui.Text();
        text.setFontSize(50);
        text.setString(str);
        text.setFontName(resources.marvin_round.name);
        text.setPosition(this.width / 2, this.height / 2);
        this.addChild(text);
        setTimeout(function(){
            this.removeChild(text);
        }.bind(this), 1000);
    },

    addHelpButton: function(){
        let coin = new cc.Sprite.create("res/menubar/coin.png");
        coin.setPosition(2 * this.width / 3 + 180, this.height / 2 - this.height / 5 + 30)
        this.addChild(coin);
        var buttonSize = cc.spriteFrameCache.getSpriteFrame('button.png').getOriginalSize();
        this.helpButton = new ccui.Button('#button.png', '#button_on.png', '#button_off.png', ccui.Widget.PLIST_TEXTURE);
        this.helpButton.setScale9Enabled(true);
        this.helpButton.setContentSize(210, 70);
        this.helpButton.setCapInsets(cc.rect(buttonSize.width / 2 - 1, buttonSize.height / 2 -1, 2, 2));
        this.helpButton.setTitleText("Помощь");
        this.helpButton.setTitleFontSize(35);
        this.helpButton.setPosition(2 * this.width / 3 + 100, this.height / 2 - this.height / 5);
        this.helpButton.setTitleFontName(resources.marvin_round.name);
        this.addChild(this.helpButton);
        let i = 0;
        let j = 0;
        this.helpButton.addClickEventListener(function(){
            this.game.help();
        }.bind(this));
    }
});