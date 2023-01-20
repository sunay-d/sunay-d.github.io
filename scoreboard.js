let homeScore = 0
let guestScore = 0
let homeTimeOut = 0
let guestTimeOut = 0
let homeFoul = 0
let guestFoul = 0
let period = 1
let duration = 600
let pause = 0
let timerInterval

function newGame() {
    duration = 600
    pause = 0
    document.getElementById("home-score").textContent = 0
    document.getElementById("guest-score").textContent = 0
    document.getElementById("home-tout").textContent = 0
    document.getElementById("guest-tout").textContent = 0
    document.getElementById("home-tfoul").textContent = 0
    document.getElementById("guest-tfoul").textContent = 0
    document.getElementById("period").textContent = 1
    clearInterval(timerInterval)
    startTimer()
    document.getElementById("home-winner").style.visibility = "hidden"
    document.getElementById("guest-winner").style.visibility = "hidden"
}

function score(team,n){
    if (team === 0){
        homeScore += n
        document.getElementById("home-score").textContent = homeScore
    } else {
        guestScore += n
        document.getElementById("guest-score").textContent = guestScore
    }

    if (homeScore > guestScore){
        document.getElementById("home-winner").style.visibility = "visible"
        document.getElementById("guest-winner").style.visibility = "hidden"
    } else if (homeScore < guestScore) {
        document.getElementById("home-winner").style.visibility = "hidden"
        document.getElementById("guest-winner").style.visibility = "visible"
    } else {
        document.getElementById("home-winner").style.visibility = "hidden"
        document.getElementById("guest-winner").style.visibility = "hidden"
    }
}

function timeout(team){
    if (team === 0) {
        homeTimeOut += 1
        document.getElementById("home-tout").textContent = homeTimeOut
    }else {
        guestTimeOut += 1 
        document.getElementById("guest-tout").textContent = guestTimeOut
    }
}

function foul(team){
    if (team === 0) {
        homeFoul += 1
        document.getElementById("home-tfoul").textContent = homeFoul
    }else {
        guestFoul += 1 
        document.getElementById("guest-tfoul").textContent = guestFoul
    }
}


function startTimer() {
    let timer = duration, minutes, seconds;
    timerInterval = setInterval(function () {
        if (pause === 0){
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            document.getElementById("timer").textContent = minutes + ":" + seconds;
    
            if (--timer < 0) {
                timer = duration;
                period = period+1
                period === 4 && pauseTimer()
                document.getElementById("period").textContent = period
            }
        }
        
    }, 1000);
}

function pauseTimer() { 
    pause = 1-pause
 }
