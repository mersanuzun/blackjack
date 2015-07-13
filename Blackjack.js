function Blackjack(croupier){
    this.cards = [];
    this.croupier = croupier;
}
Blackjack.prototype.getCards = function(){
    var card;
    var symbols = ["Hearts", "Diamonds", "Clubs", "Spades"];
    for(var i = 0; i < 4; i++){
        for (var j = 1; j <= 13; j++){
            if (j == 1) card = new Card("A", symbols[i], 11);    
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
Blackjack.prototype.totalCardValues = function(gamerHand) {
    return gamerHand.reduce(function(sum, nextCard){
        return sum + nextCard.value;
    }, 0)
}
Blackjack.prototype.findCard = function(gamerHand, number){
    var index = -1;
    for (var i = 0; i < gamerHand.length; i++){
        if (gamerHand[i].number == number && gamerHand[i].value == 11){
            index = i;
            break;
        }
    }
    return index;
}
Blackjack.prototype.splitedHit = function(gamerHand){
    gamerHand.push(this.cards.splice(Math.floor(Math.random() * this.cards.length), 1)[0]);
    if (this.totalCardValues(gamerHand) > 21) {
        if (this.findCard(gamerHand, "A") != -1){
            alert("bulundu");
            gamerHand[this.findCard(gamerHand, "A")].value = 1;
            if (this.totalCardValues(gamerHand) > 21) {
                return false;
            }else return true;
        }else return false;
    }else return true;
}
Blackjack.prototype.hit = function(gamer){
    if (gamer.splited){
        if (gamer.firstHandStand == false){
            if (gamer.firstHandStatus == true){
                if (this.splitedHit(gamer.firstHand) == false) {
                    gamer.firstHandStatus = false;  
                    return this.totalCardValues(gamer.firstHand);  
                }
                else return this.totalCardValues(gamer.firstHand);
            }
            if (gamer.secondHandStatus && gamer.firstHandStatus == false ){
                if (this.splitedHit(gamer.secondHand) == false) {
                    gamer.secondHandStatus = false;
                    this.totalCardValues(gamer.secondHand);
                }
                else return this.totalCardValues(gamer.secondHand);
            }
        }else {
            if (gamer.secondHandStand == false){
                return this.splitedHit(gamer.secondHand)
            }else{
                console.log("game is over in second")
            }
        }
    }else {
        if (!gamer.firstHandStand){
            console.log(this.splitedHit(gamer.firstHand))
            return this.totalCardValues(gamer.firstHand);    
        }
    }
    if (gamer.firstHandStand == false && gamer.secondHandStatus == false){
        console.log("game is over")
    }
}
Blackjack.prototype.hitCroupier = function(visibility){
    if (visibility != undefined){
        var index = Math.floor(Math.random() * this.cards.length);
        this.cards[index].visible = false;
        this.croupier.firstHand.push(this.cards.splice(index, 1)[0]);
    }else this.hit(this.croupier);
}
Blackjack.prototype.stand = function(gamer, croupier){
    if (gamer.splited) {
        if (gamer.firstHandStand && gamer.secondHandStand){
            console.log("game is over in stand");
        }else {
            if (gamer.firstHandStand == false){
                gamer.firstHandStand = true;
            }else {
                gamer.secondHandStand = true;
            }
        } 
    }else {
        gamer.firstHandStand = true;
        console.log("game is over in not stand");
    }
}
Blackjack.prototype.split = function(gamer){
    gamer.secondHand.push(gamer.firstHand.splice(0,1)[0]);
    gamer.splited = true;
}
Blackjack.prototype.croupierHand = function(gamerHandTotal){
    while(this.totalCardValues(this.croupier.firstHand) < 21 && this.totalCardValues(this.croupier.firstHand) <= gamerHandTotal){
        console.log("grid");
        this.croupier.firstHand.push(this.cards.splice(Math.floor(Math.random() * this.cards.length), 1)[0]);
    }
}
Blackjack.prototype.finishGame = function(gamer){
    if (gamer.splited == false){
        
    }
}