let [homeScore, guestScore, homeTimeOut, guestTimeOut, homeFoul, guestFoul, period, pause] = [0,0,0,0,0,0,1,0]
let timerInterval
const buzzer = new Audio('./buzzer.wav')


document.addEventListener("click", (e) => {
    if(e.target.id === "newgame"){
        pause = 0
        pauseTimer()
        document.getElementById("popup").style.visibility = "visible"
    }
    else if(e.target.id === "cancel"){
        document.getElementById("popup").style.visibility = "hidden"
        resumeTimer()
    }else if (e.target.id === "startNewGame"){
        document.getElementById("popup").style.visibility = "hidden"
        newGame()
    }
})

function newGame() {
    const duration = Number(document.getElementById("duration").value)*60;
    [homeScore, guestScore, homeTimeOut, guestTimeOut, homeFoul, guestFoul, period, pause] = [0,0,0,0,0,0,1,0]
    display()
    clearInterval(timerInterval)
    startTimer(duration)
    resumeTimer()
    setLeader()
}

function display(){
    document.querySelectorAll(`#home-score`).forEach(element => element.textContent = homeScore)
    document.querySelectorAll(`#guest-score`).forEach(element => element.textContent = guestScore)
    document.querySelectorAll(`#home-tout`).forEach(element => element.textContent = homeTimeOut)
    document.querySelectorAll(`#guest-tout`).forEach(element => element.textContent = guestTimeOut)
    document.querySelectorAll(`#home-tfoul`).forEach(element => element.textContent = homeFoul)
    document.querySelectorAll(`#guest-tfoul`).forEach(element => element.textContent = guestFoul)
    document.querySelectorAll("#period").forEach(element => element.textContent = period)
}

function setLeader(){
    let leader = homeScore > guestScore ? "home" : "guest"
    let opponent = homeScore > guestScore ? "guest" : "home"
    if (homeScore-guestScore) {
        document.querySelectorAll(`#${leader}-winner`).forEach(element => element.style.visibility = "visible")
        document.querySelectorAll(`#${opponent}-winner`).forEach(element => element.style.visibility = "hidden")
    }else {
        document.querySelectorAll(`#${leader}-winner`).forEach(element => element.style.visibility = "hidden")
        document.querySelectorAll(`#${opponent}-winner`).forEach(element => element.style.visibility = "hidden")
    }
}

function score(team,n){
    if (team === 'home'){
        homeScore += n
    } else {
        guestScore += n
    }
    display()
    setLeader()
}

function timeout(team){
    if (team === 'home') {
        homeTimeOut += 1
    }else {
        guestTimeOut += 1 
    }
    display()
}

function foul(team){
    if (team === 'home') {
        homeFoul += 1
    }else {
        guestFoul += 1 
    }
    display()
    console.log(team, homeFoul, guestFoul)
}

function startTimer(duration) {
    let timer = duration, minutes, seconds;
    timerInterval = setInterval(function () {
        if (pause === 0){
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            document.querySelectorAll("#timer").forEach(element => element.textContent = minutes + ":" + seconds)
    
            if (--timer < 0) {
                buzzer.play()
                pauseTimer()
                timer = duration;
                period = period === 4 ? 1 : period+1
                display()
            }
        }
        
    }, 1000);
}

function pauseTimer() { 
    pause = 1
    document.querySelectorAll("button").forEach(element => {
        if (![...element.classList].includes("exempt")) {
            element.disabled = true
        }
    })
}

function resumeTimer() {
    pause = 0
    document.querySelectorAll("button").forEach(element => {
        element.disabled = false})
}

function toggleTimer() {
    pause = 1-pause
    if (pause) {
        pauseTimer()
    }else {
        resumeTimer()
    }
}



newGame()
