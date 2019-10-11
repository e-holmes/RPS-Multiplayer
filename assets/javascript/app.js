$(document).ready(function(){
var p1_wins=0;
var p1_losses=0;
var p2_wins=0;
var p2_losses=0;
var ties=0;
var player=0;
var p1="r";
var p2="s";
var option = ["r", "p", "s"];

check();

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