function Blackjack(croupier){
    this.cards = [];
    this.croupier = croupier;
    this.gamers = {};
    this.winners = [];
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
Blackjack.prototype.sumCards = function(gamerHand) {
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
    if (this.sumCards(gamerHand) > 21) {
        if (this.findCard(gamerHand, "A") != -1){
            alert("bulundu");
            gamerHand[this.findCard(gamerHand, "A")].value = 1;
            if (this.sumCards(gamerHand) > 21) {
                return false;
            }else return true;
        }else return false;
    }else return true;
}
Blackjack.prototype.hit = function(gamerID){
    if (this.gamers[gamerID].splited){
        if (this.gamers[gamerID].firstHandStand == false){
            if (this.gamers[gamerID].firstHandStatus == true){
                if (this.splitedHit(this.gamers[gamerID].firstHand) == false) {
                    this.gamers[gamerID].firstHandStatus = false;  
                    this.gamers[gamerID].firstHandSumCards = this.sumCards(
                        this.gamers[gamerID].firstHand);  
                    return this.gamers[gamerID].firstHandSumCards;
                }else {
                    this.gamers[gamerID].firstHandSumCards = this.sumCards(
                        this.gamers[gamerID].firstHand);
                    if (this.gamers[gamerID].firstHandSumCards == 21){
                        this.gamers[gamerID].firstHandBlackjack = true;
                    }
                    return this.gamers[gamerID].firstHandSumCards;
                }
            }
            if (!this.gamers[gamerID].firstHandStatus){
                if (this.splitedHit(this.gamers[gamerID].secondHand) == false) {
                    this.gamers[gamerID].secondHandStatus = false;
                    this.gamers[gamerID].secondHandSumCards = this.sumCards(
                        this.gamers[gamerID].secondHand);
                    if (this.gamers[gamerID].firstHandStatus == false && 
                        this.gamers[gamerID].secondHandStatus == false){
                        console.log("game is over")
                    }
                    return this.gamers[gamerID].secondHandSumCards;
                }else{
                    this.gamers[gamerID].secondHandSumCards = this.sumCards(
                        this.gamers[gamerID].secondHand);
                    if (this.gamers[gamerID].secondHandSumCards == 21){
                        this.gamers[gamerID].secondHandBlackjack = true;
                    }
                    return this.gamers[gamerID].secondHandSumCards;  
                } 
            }
        }else {
            if (this.gamers[gamerID].secondHandStand == false && 
                this.gamers[gamerID].secondHandStatus){
                if (!this.splitedHit(this.gamers[gamerID].secondHand)){
                    this.gamers[gamerID].secondHandStatus = false;
                    this.gamers[gamerID].secondHandSumCards = this.sumCards(
                        this.gamers[gamerID].secondHand);
                    return this.gamers[gamerID].secondHandSumCards;
                }else{
                    this.gamers[gamerID].secondHandSumCards = this.sumCards(
                        this.gamers[gamerID].secondHand);
                    if (this.sumCards(this.gamers[gamerID].secondHand) == 21){
                        this.gamers[gamerID].secondHandBlackjack = true;
                    }
                    if (this.gamers[gamerID].firstHandStatus == false && 
                        this.gamers[gamerID].secondHandStatus == false){
                        console.log("game is over")
                    }
                    return this.gamers[gamerID].secondHandSumCards;  
                }
            }else{
                console.log("game is over in second")
                return false;
            }
        }
    }else {
        if (!this.gamers[gamerID].firstHandStand && this.gamers[gamerID].firstHandStatus){
            this.splitedHit(this.gamers[gamerID].firstHand);
            this.gamers[gamerID].firstHandSumCards = this.sumCards(
                        this.gamers[gamerID].firstHand);
            if (this.gamers[gamerID].firstHandSumCards > 21)
                this.gamers[gamerID].firstHandStatus = false;
            if (this.gamers[gamerID].firstHandSumCards == 21) 
                this.gamers[gamerID].firstHandBlackjack = true;
            if (this.gamers[gamerID].firstHandStatus == false){
                console.log("game is over")
            }
            return this.gamers[gamerID].firstHandSumCards;    
        }else return false;
    }   
}
Blackjack.prototype.hitCroupier = function(visibility){
    if (visibility != undefined){
        var index = Math.floor(Math.random() * this.cards.length);
        this.cards[index].visible = false;
        this.croupier.firstHand.push(this.cards.splice(index, 1)[0]);
    }else this.hit(this.croupier);
}
Blackjack.prototype.stand = function(gamerID){
    if (this.gamers[gamerID].splited) {
        if (this.gamers[gamerID].firstHandStand && this.gamers[gamerID].secondHandStand){
            console.log("game is over in splited");
        }else {
            if (this.gamers[gamerID].firstHandStand == false){
                this.gamers[gamerID].firstHandStand = true;
                if (this.gamers[gamerID].firstHandStand) return true;
                else return false;
            }else {
                this.gamers[gamerID].secondHandStand = true;
                if (this.gamers[gamerID].secondHandStand) return true;
                else return false;
            }
        } 
    }else {
        this.gamers[gamerID].firstHandStand = true;
        if (this.gamers[gamerID].firstHandStand) {
            console.log("game is over in not splited");
            return true;
        }
        else return false;
        
    }
}
Blackjack.prototype.split = function(gamerID){
    this.gamers[gamerID].secondHand.push(this.gamers[gamerID].firstHand.splice(0,1)[0]);
    this.gamers[gamerID].splited = true;
    if (this.gamers[gamerID].splited) return true;
    return false;
}
Blackjack.prototype.calculateCroupierHand = function(totalGamerHand){
    if (this.croupier.firstHandStatus){
        while(this.croupier.firstHandSumCards < 21 
              && this.croupier.firstHandSumCards <= totalGamerHand){
            this.hit(this.croupier.gamerID);
            if (this.sumCards(this.croupier.firstHand) == 21){
                this.croupier.firstHandBlackjack = true;
                break;
            }
            if (this.sumCards(this.croupier.firstHand) >= 19){
                if (this.sumCards(this.croupier.firstHand) == totalGamerHand) {
                    console.log("winners");
                    break;
                }
            }
        }        
    }
    return this.sumCards(this.croupier.firstHand);
}
Blackjack.prototype.finishGame = function(){
    var croupierHand;
    var maxTotalCardValue = 0;
    for (var gamerID in this.gamers){
        if (this.gamers[gamerID].firstHandSumCards >
            this.gamers[gamerID].secondHandSumCards){
            if (this.gamers[gamerID].firstHandSumCards > maxTotalCardValue){
                maxTotalCardValue = this.gamers[gamerID].firstHandSumCards;
            }
        }else{
            maxTotalCardValue = this.gamers[gamerID].secondHandSumCards;
        } 
    }
    console.log("max", maxTotalCardValue)
    croupierHand = this.calculateCroupierHand(maxTotalCardValue);
    console.log(croupierHand);
    for (var gamerID in this.gamers){
        if (this.gamers[gamerID].firstHandBlackjack ||
            this.gamers[gamerID].secondHandBlackjack)
            this.winners.push(this.gamers[gamerID])
        else if ((!this.croupier.firstHandStatus ||
            !this.croupier.secondHandStatus)){
            if (this.gamers[gamerID].name != this.croupier.name)
                this.winners.push(this.gamers[gamerID])
        }else if (this.gamers[gamerID].firstHandSumCards == croupierHand ||
            this.gamers[gamerID].secondHandSumCards == croupierHand)
            this.winners.push(this.gamers[gamerID]);
    }
}