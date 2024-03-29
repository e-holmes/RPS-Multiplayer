$(document).ready(function(){
    var firebaseConfig = {
        apiKey: "AIzaSyA46Hob913lpOKkBAh0B_9Ow1Th01Zz-ds",
        authDomain: "rpsmp-5d14a.firebaseapp.com",
        databaseURL: "https://rpsmp-5d14a.firebaseio.com",
        projectId: "rpsmp-5d14a",
        storageBucket: "rpsmp-5d14a.appspot.com",
        messagingSenderId: "283055892707",
        appId: "1:283055892707:web:d7f470d314a69520edbdd6"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);


    var p1_wins=0;
    var p1_losses=0;
    var p2_wins=0;
    var p2_losses=0;
    var ties=0;
    var player=1;
    var p1="space";
    var p2="space";
    var option = ["r", "p", "s"];
    var score;


    firebase.database().ref().on("value", function(snapshot) {
        console.log(snapshot.val());
        p1_wins= snapshot.val().score.player1.wins;
        console.log("Player 1 Wins: "+p1_wins);
        p1_losses = snapshot.val().score.player1.losses;
        console.log("Player 1 losses: "+p1_losses);
        p2_wins= snapshot.val().score.player2.wins;
        console.log("Player 2 Wins: "+p2_wins);
        p2_losses= snapshot.val().score.player2.losses;
        console.log("Player 2 losses: "+p2_losses);
        ties= snapshot.val().score.ties.ties;
        console.log("Ties: "+ties);

        var scoreCount = $("<h1>");
        $("#p1_score").empty();
        scoreCount.append("Wins: " +p1_wins +"</h1>");
        scoreCount.append("<br>");
        scoreCount.append("</h1> Losses: " +p1_losses +"</h1>");
        $("#p1_score").append(scoreCount);

        $("#p2_score").empty();
        var scoreCount = $("<h1>");
        scoreCount.append("Wins: " +p2_wins +"</h1>");
        scoreCount.append("<br>");
        scoreCount.append("</h1> Losses: " +p2_losses +"</h1>");
        $("#p2_score").append(scoreCount);

        $("#ties").empty();
        var scoreCount = $("<h1>");
        scoreCount.append("Ties: " +ties +"</h1>");
        $("#ties").append(scoreCount);
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    logPlayer();


    $(".gif").on("click", function(){
        var value = $(this).attr("value");
        console.log(value);

        if (player == 1){
            p1 = option[value];
            console.log("Player 1 Chose: " +p1);
            player++;
            logPlayer();
        }else if (player == 2){
            p2 = option[value];
            console.log("Player 2 Chose: " +p2);
            player++;
            check();
            logPlayer();
        }
    })



    function check(){
        // compare user inputs
        if(p1 === p2){
            // update ties and reset
            score = "No One Wins!";
            ties= ties+1;
        } else if(p1==="r" && p2==="s" || p1==="s" && p2==="p" || p1==="p" && p2==="r"){
            // update score and reset
            score = "Player One Wins!";
            p1_wins++;
            p2_losses++;
        } else if(p2==="r" && p1==="s" || p2==="s" && p1==="p" || p2==="p" && p1==="r"){
            // update score and reset
            score = "Player Two Wins!";
            p2_wins++;
            p1_losses++;
        }
        logScore();
        fireUpdate();
    };

    function reset(){
    p1="space";
    p2="space";
    player=1;
    var score = "p1_wins: " +p1_wins +" p2_wins: " +p2_wins +" p1_losses: " +p1_losses +" p2_losses: " +p2_losses +" tie count: " +ties;
    console.log(score);
    $("#btn").empty();
    }

    function logPlayer(){
    var instruct = $("<h2>");

    if (player == 1){
        $("#instruction").empty();
        instruct.append("Player One's Turn!");
        instruct.append("</h2>");
        $("#instruction").append(instruct);

    } else if (player == 2){
        $("#instruction").empty();
        instruct.append("Player Two's Turn!");
        instruct.append("</h2>");
        $("#instruction").append(instruct);

    } else {
        $("#instruction").empty();
        instruct.append(score);
        instruct.append("</h2>")
        $("#instruction").append(instruct);
        // Button pops
        $("#btn").append("<button class='btn col-2'> Rematch! </button");
        $(".btn").on("click", function(){
            reset();
            })
    }
    };

    function logScore(){
        var scoreCount = $("<h1>");
        $("#p1_score").empty();
        scoreCount.append("Wins: " +p1_wins +"</h1>");
        scoreCount.append("<br>");
        scoreCount.append("</h1> Losses: " +p1_losses +"</h1>");
        $("#p1_score").append(scoreCount);

        $("#p2_score").empty();
        var scoreCount = $("<h1>");
        scoreCount.append("Wins: " +p2_wins +"</h1>");
        scoreCount.append("<br>");
        scoreCount.append("</h1> Losses: " +p2_losses +"</h1>");
        $("#p2_score").append(scoreCount);

        $("#ties").empty();
        var scoreCount = $("<h1>");
        scoreCount.append("Ties: " +ties +"</h1>");
        $("#ties").append(scoreCount);
    };

    function fireUpdate(){
        var scoreRef = firebase.database().ref("score/");

        scoreRef.set ({
            player1:{
                wins: p1_wins,
                losses: p1_losses
            },

            player2:{
                wins: p2_wins,
                losses: p2_losses
            },
            ties:{
                ties
            }
        })  
    }
});