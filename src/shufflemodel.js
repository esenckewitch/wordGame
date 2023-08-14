var Shuffle = function(shuffleWord){
	this.isFirstLetter = false;
	this.shuffleWord = shuffleWord;
	this.currentWord = "";
	this.saveWord = "";
	this.onFirstLetter = function(){
	};
	this.onClear = function(){
	};
	this.onAddLetter = function(letter){
	};
};

Shuffle.prototype.addLetter = function(letter){
	if(this.isFirstLetter == false)
		this.onFirstLetter();

	this.isFirstLetter = true;
	this.currentWord += letter;
	this.onAddLetter(letter);
};

Shuffle.prototype.clearCurrentWord = function(){
	this.isFirstLetter = false;
	this.onClear();
	this.currentWord = "";
};

Shuffle.prototype.selfCurrentWord = function(){
	this.isFirstLetter = false;
	this.onClear();
	this.saveWord = this.currentWord;
	this.currentWord = "";
};

Shuffle.prototype.shuffle = function(){
	let tmpWord = this.shuffleWord.split('');
	console.log(tmpWord);
	let word = "";
	while(tmpWord.length > 0){
		let rid = getRandomInt(tmpWord.length);
		word += tmpWord[rid];
		tmpWord.splice(rid,1);
	}
	this.shuffleWord = word;
};


