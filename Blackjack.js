function Blackjack(){
    this.cards = [];
}
Blackjack.prototype.getCards = function(){
    var card;
    var symbols = ["Hearts", "Diamonds", "Clubs", "Spades"];
    for(var i = 0; i < 4; i++){
        for (var j = 1; j <= 13; j++){
            if (j == 1) card = new Card("A", symbols[i], [1,11]);    
            else if (j == 11) card = new Card("J", symbols[i], 10);
            else if (j == 12) card = new Card("Q", symbols[i], 10);
            else if (j == 13) card = new Card("K", symbols[i], 10);
            else card = new Card(j, symbols[i], j);
            this.cards.push(card);
        }
    }
}
Blackjack.prototype.shuffleCards = function(){
    var index;
    var shuffledCards = [];
    while(this.cards.length != 0){
        index = Math.floor(Math.random() * this.cards.length);
        shuffledCards.push(this.cards[index]);
        this.cards.splice(index, 1);
    }
    this.cards = shuffledCards;
}
Blackjack.prototype.check = function(gamer) {
    var cardValue = gamer.hand.reduce(function(sum, nextCard){
        return sum + nextCard.value;
    }, 0);
    if (cardValue > 21) return true;
    else return false;
}