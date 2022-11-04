function checkRows(r,n,sudoku){
    for (let c=0; c<9; c++){
        if (sudoku[r][c] === n){
            return 0;
        }
    }
    
    return 1;
}
function checkCols(c,n,sudoku){
    for (let r=0; r<9; r++){
        if (sudoku[r][c] === n){
            return 0;
        }
    }
    
    return 1;
}   
function checkSqr(r,c,n,sudoku){
    let sr = Math.floor(r/3);
    let sc = Math.floor(c/3);
    for (let rw=0; rw<3; rw++){
        for(let cl=0; cl<3; cl++){
            let row = rw + sr*3;
            let col = cl + sc*3;
            if(sudoku[row][col] === n){
                return 0;
            }
        }
    }
    return 1;
}
function checkEntry(r,c,n,sudoku){
    if (checkRows(r,n,sudoku) === 1){
        if (checkCols(c,n,sudoku) === 1){
            if (checkSqr(r,c,n,sudoku) === 1){
                return 1;
            }
        }
    }else {
        return 0;
    }
}
function displaySudoku(sudoku){
    for (let r=0; r<9; r++){
        for (let c=0; c<9; c++){
            if (sudoku[r][c] != 0){
                let id = (r+1).toString()+(c+1).toString();
                document.getElementById(id).innerHTML = sudoku[r][c] 
            }
        }
    }
}
function generateSudokuRow(r,num,sudoku){
    col = [0,1,2,3,4,5,6,7,8];
    for (let i=0; i<9; i++){
        let cIndex = Math.floor(Math.random()*col.length);
        let c = col[cIndex];
        if (sudoku[r][c] === 0){
            if (checkEntry (r,c,num,sudoku) === 1){
                return c;
            }else{
                col.splice(cIndex,1);
            }
        }else {
            col.splice(cIndex,1);
            continue;
        }
    }
}
function generateRandomSudoku(){
    let sudoku1 = [
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
    for (let num=1; num<10; num++){
        for (let r=0; r<9; r++){
            let c = generateSudokuRow(r,num,sudoku1);
            sudoku1[r][c]=num;
        }   
    }
    return sudoku1;
}
function countEmptyCells(sudoku){
    let counter = 0;
    for (let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            if (sudoku[i][j] === 0) {
                counter+=1;
            }
        }
    }
    return counter;
}
function generateSolvableSudoku() {
    let counter = 1;
    let sudoku;
    while (counter > 0){
        sudoku = generateRandomSudoku();
        counter = countEmptyCells(sudoku);
    }
    return sudoku
}
function cleanDisplay(){
    let cells = document.querySelectorAll(".cell");
    for (let i=0; i<81; i++){
        cells[i].innerHTML = "";
        cells[i].setAttribute("original",true);
    }
}
function generatePuzzle(level){
    cleanDisplay();
    let sudoku = generateSolvableSudoku();
    let counter = 0;
    while (counter < level){
        let r = Math.floor(Math.random()*9)
        let c = Math.floor(Math.random()*9)
        if (sudoku[r][c] != 0){
            sudoku[r][c] = 0;
            counter += 1;
            id = (r+1).toString() + (c+1).toString();
            document.getElementById(id).setAttribute("original",false);
        }else{
            continue;
        }
    }
    return sudoku;
}

displaySudoku(generatePuzzle(45))

