import {isSolutionUnique} from './sudokuSolver.js'

let emptyBoard = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
]

let sudoku = generateSudoku()
let board = sudoku
export { sudoku, board, isValid, newGame }

function isValid(sudoku, row, col, n){
    let r = Math.floor(row/3)
    let c = Math.floor(col/3)
    for (let i=0; i<9; i++){
        if (sudoku[row][i] === n){
            return false
        }else if (sudoku[i][col] === n){
            return false
        }else if (sudoku[3*r+i%3][3*c+parseInt(i/3)] === n){
            return false
        }
    }  
    return true
}

function randomSudokuGenerator() {
    let board = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
    ] 

    for (let row=0; row<9; row++) {
        for (let col=0; col<9; col++) {
            let possibleValues = [1,2,3,4,5,6,7,8,9]
            for (let n=0; n<9; n++){
                let randomIndex = Math.floor(Math.random()*possibleValues.length)
                let randomValue = possibleValues[randomIndex]
                if (isValid(board, row, col, randomValue)) {
                    board[row][col] = randomValue
                    break
                }else {
                    possibleValues.splice(randomIndex,1)
                }    
            }
            if (possibleValues.length === 0){
                board = emptyBoard
                return false
            }
        }
    }
    return board
}

function cellToArr(cell) {
    let row = parseInt(cell/9)
    let col = cell%9
    return {row, col}
}

function generateSudoku(){
    let sudoku = randomSudokuGenerator()
    while (!sudoku) {
        sudoku = randomSudokuGenerator()
    }

    return sudoku
}

function displaySudoku(sudoku, difficulty=25) {
    let emptyCells = []
    while (emptyCells.length < difficulty){
        let randomCell = Math.floor(Math.random()*81)
        if (!emptyCells.includes(randomCell)){
            const {row, col} = cellToArr(randomCell)
            board[row][col] = 0
            if (isSolutionUnique(board)) {
                emptyCells.push(randomCell)
                document.getElementById(`${row+1}${col+1}`).classList.add("removed")
            }else {
                board[row][col] = sudoku[row][col]
            }
        }
    }


    Array.from(document.querySelectorAll(".cell")).forEach(cell => {
        let row = cell.id[0]-1
        let col = cell.id[1]-1
        if ([...cell.classList].includes("removed")){
            cell.textContent = ''
        }else {
            cell.textContent = sudoku[row][col]
        }
    })

    let moves = []
    localStorage.setItem("moves", JSON.stringify(moves))
    timer

}



function startTimer() {
    const time = document.getElementById("timer").textContent
    let second = (Number(time.slice(3,5)) + 1)%60
    let minute = second ? Number(time.slice(0,2)) : Number(time.slice(0,2))+1 
    let newTime = ((minute/10)<1 ? "0"+minute : minute)+":"+((second/10)<1 ? "0"+second : second)
    document.getElementById("timer").textContent = newTime
}

export function resetTimer() {
    clearInterval(timer)
    document.getElementById("timer").textContent = "00:00"
}

let timer = setInterval(startTimer,1000)

function newGame(difficulty) {
    document.getElementById("check").disabled = false
    document.getElementById("clear").disabled = false
    document.querySelectorAll(".number").forEach(item => item.disabled = false)
    sudoku = generateSudoku()
    displaySudoku(sudoku, difficulty)
    startTimer()
    timer = setInterval(startTimer,1000)
}

displaySudoku(sudoku)












