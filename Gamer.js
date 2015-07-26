function Gamer(name, gamerID){
    this.name = name;
    this.gamerID = gamerID;
    this.firstHand = [];
    this.money = 1000;
    this.secondHand = [];
    this.firstHandSumCards = 0;
    this.secondHandSumCards = 0;
    this.firstHandBlackjack = false;
    this.secondHandBlackjack = false;
    this.firstHandStatus = true;
    this.secondHandStatus = true;
    this.splited = false;
    this.firstHandStand = false;
    this.secondHandStand = false;
}
Gamer.prototype.getCard = function(cards){
    this.hand.push(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);
}
Gamer.prototype.showCards = function(){
    this.hand.forEach(function(card){
        console.log(this.name + "'s card" , card.number + card.symbol);
    })
}