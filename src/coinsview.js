var CoinsView = cc.Node.extend({
	ctor: function(coins){
		this._super();
		this.coins = coins;
		this.addCointsView();
		this.addCointsValue();
		this.coins.update = this.update.bind(this);
	},
	addCointsView: function(){
		let coinsView = new cc.Scale9Sprite.create("res/menubar/bar_bg.png");
		coinsView.setContentSize(cc.size(200, 90));
		coinsView.setPosition(75, 0);
    	this.addChild(coinsView);
    	let coin = new cc.Sprite.create("res/menubar/coin.png");
    	coin.setPosition(10, 0)
    	this.addChild(coin);
	},
	addCointsValue: function(){
		this.text = new ccui.Text();
    	this.text.setFontSize(35);
    	this.text.setString(this.coins.value);
    	this.text.setFontName(resources.marvin_round.name);
    	this.text.setPosition(90, 0);
    	this.addChild(this.	text);
	},
	update: function(){
		this.text.setString(this.coins.value);
	}
});