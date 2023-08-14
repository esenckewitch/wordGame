
var GameWords = function (){
    this.shuffleWord = "world";
    this.wordsSet = new Set(solve(this.shuffleWord, 3));
    this.board = new Board(this.wordsSet);
    this.shuffle = new Shuffle(this.shuffleWord);
    
    this.coins = new Coins(150);
    this.start();
    this.onNotation =function(str){
    };
};

GameWords.prototype.start = function () {
    this.running = true;
    console.log("Started!");
    this.interval = setInterval(this.run.bind(this), 100);
};

GameWords.prototype.run = function(){
    let currentWord = ""
    if((currentWord = this.shuffle.saveWord) != ""){
        if(this.board.checkWords(currentWord) == -1)
            this.onNotation("Слово не задано!");
        else if(this.board.checkWords(currentWord) == -2)
            this.onNotation("Слово уже открыто!");

        this.shuffle.saveWord = "";
    }

    let finish = true;
    for(let i = 0; i < this.board.words.length; i++)
        for(let j = 0; j < this.board.words[i].openLetters.length; j++)
            if(this.board.words[i].openLetters[j] == 0)
                finish = false;

    if(finish)
        this.stop();
};

GameWords.prototype.stop = function () {
    this.running = false;
    console.log("Stopped!");
    this.onNotation("Победа!");
    clearInterval(this.interval);
};

GameWords.prototype.help = function(){
    if(!this.coins.delete(50))
        return;
    if(this.running){
        end1: for(let i = 0; i < this.board.words.length; i++)
            for(let j = 0; j < this.board.words[i].length; j++)
                if(this.board.words[i].showOneLetter(j))
                    break end1;
    }
};