let fighters = ["rock", "paper", "scissors", "lizard", "spock"]
let player1Score = 0
let player2Score = 0

function getRandomFighter(){
    index = Math.floor(Math.random()*fighters.length)
    return fighters[index]
}

function fight(fighter1, fighter2){
    if (fighter1 === fighter2){
        console.log("tie")
    }else if (fighter1==="rock"){
        if (["lizard", "scissors"].includes(fighter2)){
            player1Score += 1
            console.log("Player 1 wins!")
        }else {
            player2Score += 1
            console.log("Player 2 wins!")
        }
    }else if (fighter1==="paper"){
        if (["rock","spock"].includes(fighter2)){
            player1Score += 1
            console.log("Player 1 wins!")
        }else {
            player2Score += 1
            console.log("Player 2 wins!")
        }
    }else if (fighter1==="scissors"){
        if (["paper","lizard"].includes(fighter2)){
            player1Score += 1
            console.log("Player 1 wins!")
        }else {
            player2Score += 1
            console.log("Player 2 wins!")
        }
    }else if (fighter1==="lizard"){
        if (["paper","spock"].includes(fighter2)){
            player1Score += 1
            console.log("Player 1 wins!")
        }else {
            player2Score += 1
            console.log("Player 2 wins!")
        }
    }else {
        if (["scissors","rock"].includes(fighter2)){
            player1Score += 1
            console.log("Player 1 wins!")
        }else {
            player2Score += 1
            console.log(player2Score)
        }
    }
}

