$(document).ready(function(){
var p1_wins=0;
var p1_losses=0;
var p2_wins=0;
var p2_losses=0;
var ties=0;
var player=1;
var p1="space";
var p2="space";
var option = ["r", "p", "s"];

$(".gif").on("click", function(){
        var value = $(this).attr("value");
        console.log(value);

        if (player == 1){
            p1 = option[value];
            console.log("Player 1 Chose: " +p1);
            player++;
        }else if (player == 2){
            p2 = option[value];
            console.log("Player 2 Chose: " +p2);
            player++;
            check();
        }
})

function check(){
    if (player == 1){
        // player one may choose
    }else if (player == 2){
        // player two may choose
    }else {
        // compare user inputs
        if(p1 === p2){
            // update ties and reset
            ties= ties+1;
            reset();
        } else if(p1==="r" && p2==="s" || p1==="s" && p2==="p" || p1==="p" && p2==="r"){
            // update score and reset
            p1_wins++;
            p2_losses++;
            reset();
        } else if(p2==="r" && p1==="s" || p2==="s" && p1==="p" || p2==="p" && p1==="r"){
            // update score and reset
            p2_wins++;
            p1_losses++;
            reset();
        }
    }
};

function reset(){
    p1="space";
    p2="space";
    player=1;
    var score = "p1_wins: " +p1_wins +" p2_wins: " +p2_wins +" p1_losses: " +p1_losses +" p2_losses: " +p2_losses +" tie count: " +ties;
    console.log(score);
}

});