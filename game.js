var b = new Blackjack();
var g = new Gamer("ersan");
b.getCards();
b.shuffleCards();
g.getCard(b.cards);
console.log(b.check(g));