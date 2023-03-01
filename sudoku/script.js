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
            selectedCell.textContent = e.target.dataset.numbers === "0" ? '' : e.target.dataset.numbers
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
            selectedCell.textContent = (e.key === "Backspace" || e.key === "Delete") ? '' : e.key
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
}

function checkSolution() {

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

    resetTimer()

}
