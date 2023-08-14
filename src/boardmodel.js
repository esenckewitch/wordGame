var Board = function(words){
	this.words = [];
	for(let i of words){
		this.words.push(new Word(i));
	}
};

Board.prototype.checkWords = function(word){
	for(let i = 0; i < this.words.length; i++)
		if(this.words[i].checkWord(word) == 1)
			return i;
		else if(this.words[i].checkWord(word) == -2){
			return -2;
		}
	return -1;
}
