var Coins = function(coinsCount){
	this.value = coinsCount;
	this.update = function(){
	};
};

Coins.prototype.add = function(value){
	this.value += value;
	this.update();
};

Coins.prototype.delete = function(value){
	if(this.value >= value){
		this.value -= value;
		this.update();
		return true;
	}
	return false;
}