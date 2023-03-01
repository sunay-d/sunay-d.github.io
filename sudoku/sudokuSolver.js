import { isValid } from './sudokuGenerator.js'

function cellToArr(cell) {
    let row = parseInt(cell/9)
    let col = cell%9
    return {row, col}
}




function possible(sudoku){
    for (let cell=0; cell<81; cell++) {
        let row = cellToArr(cell).row
        let col = cellToArr(cell).col
        if(!sudoku[row][col]){
            let possibleValues = []
            for (let i=1; i<10; i++){
                if(isValid(sudoku, row, col, i)){
                    possibleValues.push(i)
                }
            }
            if (possibleValues.length === 1){
                sudoku[row][col] = possibleValues[0]
            }
        }
    }
}

export function isSolutionUnique(sudoku){
    for(let i=0; i<50; i++){
        possible(sudoku)
    }
    if(isCompleted(sudoku)){
        return true
    }else {
        return false
    }
}

function isCompleted(sudoku){
    for (let cell=0; cell<81; cell++){
        let row = cellToArr(cell).row
        let col = cellToArr(cell).col
        if(!sudoku[row][col]){
            return false
        }
    }
    return true
}



