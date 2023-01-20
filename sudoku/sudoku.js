let displayedSudoku = generatePuzzle(45);
let selected = 0; let style;
displaySudoku(displayedSudoku);

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
            let id = (r+1).toString()+(c+1).toString();
            if (sudoku[r][c] != 0){
                document.getElementById(id).innerHTML = sudoku[r][c]; 
            }
            else {
                document.getElementById(id).innerHTML = "";
            }
        }
    }
    displayedSudoku = sudoku;
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
    let sudoku = [
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
            let c = generateSudokuRow(r,num,sudoku);
            sudoku[r][c]=num;
        }   
    }
    return sudoku;
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
    for (let i=0; i<cells.length; i++){
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
            let id = (r+1).toString() + (c+1).toString();
            let cell = document.getElementById(id);
            cell.setAttribute("original",false);
        }else{
            continue;
        }
    }
    return sudoku;
}

let easy = document.getElementById("easy");
let medium = document.getElementById("medium");
let hard = document.getElementById("hard");
let solCheck = document.getElementById("check")
let clear = document.getElementById("clear")
let cells = Array.from(document.querySelectorAll(".cell"));
easy.onclick = function(){ displaySudoku(generatePuzzle(35))};
medium.onclick = function(){ displaySudoku(generatePuzzle(45))};
hard.onclick = function(){ displaySudoku(generatePuzzle(55))};
solCheck.onclick = checkSol;
clear.onclick = clearAll;

for (let i=0; i<cells.length; i++){
    let cell = cells[i];
    cell.onclick = function(){
        if(cell.getAttribute("original")==="false"){
            if(selected === 0){
                selected = cell;
                style = selected.style.backgroundColor;
            }else {
                selected.style.backgroundColor = style;
                selected = cell;
            }
            cell.style.backgroundColor = "#231f20";
        }
    }
}

for (let i=0; i<10; i++){
    let btn = document.getElementById(i);
    btn.onclick = function(){
        let r = selected.id[0]-1;
        let c = selected.id[1]-1;
        displayedSudoku[r][c] = i;
        displaySudoku(displayedSudoku);
    }
}

function checkSol(){
    for (let r=0; r<9; r++){
        let n=0;
        for(let c=0; c<9; c++){
            n+=displayedSudoku[r][c];
            }
        if (n!=45){
            console.log(n, "col")
            alert("There is a mistake I'm afraid :(");
            return;
        }
    }
    for (let c=0; c<9; c++){
        let n=0;
        for(let r=0; r<9; r++){
            n+=displayedSudoku[r][c];
            }
        if (n!=45){
            console.log("row")
            alert("There is a mistake I'm afraid :(");
            return;
        }
    }
    let sum = 0;
    for (let r=0; r<3; r+=3){
        for(let c=0; c<3; c+=3){
            sum += displayedSudoku[r][c]+displayedSudoku[r+1][c]+displayedSudoku[r+2][c]
                +displayedSudoku[r][c+1]+displayedSudoku[r][c+2]+displayedSudoku[r+1][c+1]
                +displayedSudoku[r+1][c+2]+displayedSudoku[r+2][c+1]+displayedSudoku[r+2][c+2];
            if (sum != 45){
                console.log(sum, "box")
                alert("There is a mistake I'm afraid:(");
                return
            }
        }
    }
    alert("Congratulations!!! You've solved the puzzle correctly. :) ")
}

function clearAll(){
    for (let i=0; i<cells.length; i++){
        let cell = cells[i];
        if(cell.getAttribute("original")==="false"){
                cells[i].innerHTML = "";
                let r = cell.id[0]-1;
                let c = cell.id[1]-1;
                displayedSudoku[r][c] = 0;
        }   
    }
}
