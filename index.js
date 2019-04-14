/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
*
*https://amiteshbhartiya.github.io/ 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let xIsNext = 'X';
let stepTracker = 0;

function gameOver(){
    return GRID_LENGTH*GRID_LENGTH;
}

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 'X') {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 'O') {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    
    if (grid[colIdx][rowIdx] == 0) {
        grid[colIdx][rowIdx] = xIsNext;
        stepTracker ++;
    
    if(xIsNext == 'X') xIsNext = 'O';
    else xIsNext = 'X';

    renderMainGrid();
    addClickHandlers();
   }
}

function addClickHandlers() { 
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
    playGame();
}

function playGame() {
     const winner = calculateWinner(grid);
    let status;
//alert((stepTracker-1));
    if (winner) {
      status = 'Winner :  &nbsp<strong>Player ' + winner+'</strong>';
      let gridDiv = document.getElementById("grid");
      gridDiv.innerHTML = "<div class='cross  parentTop'> Congratulation</div>"
   

    } else {

        status = 'Your Turn : &nbsp <strong> Player ' + xIsNext+ '</strong>';
        if ((stepTracker) == gameOver()) {
            if (confirm("Do you want to play again?") == true) {
                location.reload(); 
            } else {
                let gridDiv = document.getElementById("grid");
                gridDiv.innerHTML = "<div class='cross  parentTop'> Game Over </div>"
                status = "Have a nice day!";
            }
      }
    }
    
    const statusDiv = document.getElementById("status");
    statusDiv.innerHTML = status;
            
}

function calculateWinner() {

  for (let row = 0; row < GRID_LENGTH; row++) {
    for (let col = 0; col < GRID_LENGTH; col++) {  
       
        if (((grid[0][0] != 0) && ((grid[0][0] == grid[0][1]) && (grid[0][0] == grid[0][2]))) || 
          ((grid[0][0] != 0) && ((grid[0][0] == grid[1][0]) && (grid[0][0] == grid[2][0]))) || 
          ((grid[0][0] != 0) && ((grid[0][0] == grid[1][1]) && (grid[0][0] == grid[2][2]))) )  {
           return grid[0][0];
        
        }else if (((grid[1][0] != 0) && ((grid[1][0] == grid[1][1]) && (grid[1][0] == grid[1][2]))) || 
            ((grid[1][1] != 0) && ((grid[1][1] == grid[0][1]) && (grid[1][1] == grid[2][1]))) ||
            ((grid[1][1] != 0) && ((grid[0][2] == grid[1][1]) && (grid[1][1] == grid[2][0]))))  {
            return grid[1][1];
        
        }else if (((grid[2][0] != 0) && ((grid[2][0] == grid[2][1]) && (grid[2][0] == grid[2][2]))) || 
            ((grid[2][2] != 0) && ((grid[0][2] == grid[2][2]) && (grid[1][2] == grid[2][2]))))  {
            return grid[2][2];
       
        }
    }
 }

  return null;
}

initializeGrid();
renderMainGrid();
addClickHandlers();
