var croupier = new Gamer("Croupier", 1);
var b = new Blackjack(croupier);
b.gamers[croupier.gamerID] = croupier;
var g;
//var g = new Gamer("ersan", 2);
//var g2 = new Gamer("erkan", 3);


//b.gamers[g.gamerID] = g;
//  b.gamers[g2.gamerID] = g2;

//b.getCards();
//b.shuffleCards();
//console.log("ersan", b.hit(g.gamerID));
//console.log("ersan", b.hit(g.gamerID));
//console.log("erkan", b.hit(g2.gamerID));
//console.log("erkan", b.hit(g2.gamerID));

//console.log(b.finishGame())
//console.log(b.winners)


$(document).ready(function(){
    $("#create-user").on("click", function(){
        //if ($("#nickname").val().length == 0){
            g = new Gamer($("#nickname").val(), 2);
            b.gamers[g.gamerID] = g;
            b.getCards();
            b.shuffleCards();
            $("#create-gamer").hide();
            $("#blackjack").show();
            $("#show-nickname").text(g.name);
            $("#show-money").text(g.money + "$");    
        //}else alert("Please, enter a nickname")
        
    })
    $(".hit").on("click", function(){
        $(".card-symbol").text("");
        b.hit(g.gamerID);
        $("#show-sum-cards").text(g.firstHandSumCards)
        $(".card-number-right").html("<b>" + g.firstHand[g.firstHand.length - 1].number + "</b>") 
        $(".card-number-left").html("<b>" + g.firstHand[g.firstHand.length - 1].number + "</b>")

        for(var i = 0; i < g.firstHand[g.firstHand.length - 1].number; i++){
            $(".card-symbol").append(" ")
            $(".card-symbol").append(g.firstHand[g.firstHand.length - 1].symbol);
                        if (i % 3 == 0) $(".card-symbol").append("<br>")
        }
    })
    $(".split").on("click", function(){
        console.log(b.split(g.gamerID));
    })
    $(".stand").on("click", function(){
        b.stand(g.gamerID);
    })
})