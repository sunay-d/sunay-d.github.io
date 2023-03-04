import { sudoku, newGame, resetTimer } from "./sudokuGenerator.js"

let selectedCell

document.addEventListener("click", e => {
    if (e.target.dataset.cell){
        if(selectedCell){
            selectedCell.classList.remove("selected")
        }
        if([...e.target.classList].includes("removed")){
            selectedCell = e.target
            selectedCell.classList.add("selected")
        }
    }else if (e.target.dataset.numbers){
        if(selectedCell){
            const num = e.target.dataset.numbers
            const prev = selectedCell.textContent
            if (e.target.dataset.numbers === "back"){
                let moves = JSON.parse(localStorage.getItem("moves"))
                if (moves.length != 0){
                    document.getElementById(moves[moves.length-1][0]).textContent = moves[moves.length-1][1]
                    moves.pop()
                    localStorage.setItem("moves", JSON.stringify(moves))
                }
            }else {
                selectedCell.textContent = (selectedCell.textContent === num) ? '' : num
                let moves = JSON.parse(localStorage.getItem("moves"))
                moves.push([selectedCell.id, prev])
                localStorage.setItem("moves", JSON.stringify(moves))
            }
        }

    }else if (e.target.dataset.controls){
        if(e.target.dataset.controls === 'clear'){
            clearAll()
        }else{
            checkSolution()
        }
    }else if (e.target.dataset.game) {
        resetTimer()
        clearAll()
        document.querySelectorAll(".removed").forEach(item => {
            item.classList.remove("removed")
        })
        let difficulty = Number(e.target.dataset.game)
        newGame(difficulty)
    }
})

document.addEventListener("keyup", e => {
    if (selectedCell){
        const acceptable = ["1","2","3","4","5","6","7","8","9","Backspace","Delete"]
        if (acceptable.includes(e.key)){
            let moves = JSON.parse(localStorage.getItem("moves"))
            if (e.key === "Backspace"){
                if (moves.length != 0){
                    document.getElementById(moves[moves.length-1][0]).textContent = moves[moves.length-1][1]
                    moves.pop()
                    localStorage.setItem("moves", JSON.stringify(moves))
                }
            }else {
                let prev = selectedCell.textContent
                selectedCell.textContent = (e.key === "Delete" || selectedCell.textContent === e.key) ? '' : e.key
                moves.push([selectedCell.id, prev, selectedCell.textContent])
                localStorage.setItem("moves", JSON.stringify(moves))
            }
        }
    }
})

function clearAll() {
    document.getElementById("message").textContent = ''
    document.querySelectorAll(".cell").forEach(item => {
        item.classList.remove("selected", "false-answer", "correct-answer")
        if ([...item.classList].includes("removed")){
            item.textContent = ''
        }
    })
    localStorage.setItem("moves", JSON.stringify([]))
}

function checkSolution() {
    document.getElementById("check").disabled = true
    document.getElementById("clear").disabled = true
    document.querySelectorAll(".number").forEach(item => item.disabled = true)
    let isCorrect = true
    document.querySelectorAll(".removed").forEach(item => {
        let row = Number(item.id[0])-1
        let col = Number(item.id[1])-1
        if (sudoku[row][col] === Number(item.textContent)){
            item.classList.add("correct-answer")
        }else {
            item.classList .add("false-answer")
            isCorrect = false
        }
    })
    if (isCorrect){
        const min = document.getElementById("timer").textContent.slice(0,2)
        const sec = document.getElementById("timer").textContent.slice(3,5)
        document.getElementById("message").textContent=`Congratulations! You finished in ${min==="00" ? "0" : min} minutes and ${sec} seconds`
    }else {
        document.getElementById("message").textContent="You made mistakes!"
    }

    localStorage.setItem("moves", JSON.stringify([]))
    resetTimer()

}
