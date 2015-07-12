function Gamer(name){
    this.name = name;
    this.hand = [];
}
Gamer.prototype.getCard = function(cards){
    this.hand.push(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);
}
Gamer.prototype.showCards = function(){
    this.hand.forEach(function(card){
        console.log(this.name + "'s card" , card.number + card.symbol);
    })
}