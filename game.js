var croupier = new Gamer("Croupier");
var b = new Blackjack(croupier);
var g = new Gamer("ersan");
b.getCards();
b.shuffleCards();
console.log(b.hit(g));
console.log(b.hit(g));
