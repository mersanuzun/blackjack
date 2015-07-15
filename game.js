var croupier = new Gamer("Croupier", 1);
var b = new Blackjack(croupier);
var g = new Gamer("ersan", 2);
var g2 = new Gamer("erkan", 3);

b.gamers[croupier.gamerID] = croupier;
b.gamers[g.gamerID] = g;
//b.gamers[g2.gamerID] = g2;

b.getCards();
b.shuffleCards();
console.log("ersan", b.hit(g.gamerID));
console.log("ersan", b.hit(g.gamerID));
//console.log("erkan", b.hit(g2.gamerID));
//console.log("erkan", b.hit(g2.gamerID));

console.log(b.finishGame())
console.log(b.winners)