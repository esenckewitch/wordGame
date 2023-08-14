var Word = function(word){

	this.word = word;
	this.length = word.length;
	this.openLetters = [];
	this.spawnTime = 1000;

	for(let i = 0; i < word.length; i++)
		this.openLetters.push(0);

	this.onGuessedWord = function(){
	};

	this.onUnguessedWord = function(){
	};

	this.onPositionCoin = function(id){
	};

	this.showLetter = function(pos){
	};
};

Word.prototype.checkWord = function(word){
	let time = 0;
	let countOpenLetters = 0;
	if(word == this.word){
		for(let i = 0; i < word.length; i++){
			if(this.openLetters[i] == 1)
				countOpenLetters++;
			setTimeout(function(){
				this.showOneLetter(i);
			}.bind(this), time)
			time = i * 100;
		}
		if(countOpenLetters == word.length)
			return -2;
		return 1;
	}
	return -1;
};
Word.prototype.showOneLetter = function(pos){
	if(this.openLetters[pos] == 0){
		this.showLetter(pos);
		this.openLetters[pos] = 1;
		return true;
	}
	return false;
};