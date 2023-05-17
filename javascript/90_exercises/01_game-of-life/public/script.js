var canvas;
var context;
var interval;
var simulating = 0;

var SIZE = 500;
var COLUMNS = 10;
var ROWS = 10;
var CELLSIZE = 50;

var BOARD = [];


class cell {
    constructor (row, col, alive=false){
        this.row = row;
        this.col = col;
        this.alive = alive;
        this.stateChange = false;
        this.neighboursAlive = 0;
        this.neighbours = this.calculateNeighbours();
    }

    calculateNeighbours(){
        switch (true){
            case (this.row === 0 && this.col === 0): //top left
                return [1,0, 0,1, 1,1];

            case (this.row === 0 && this.col === COLUMNS-1): //top right
                return [-1,0, 0,1, -1,1];

            case (this.row === ROWS-1 && this.col === 0): //bottom right
                return [-1,-1, 0,-1, -1,-1];

            case (this.row === ROWS-1 && this.col === COLUMNS-1): //bottom left
                return [-1,0, 0,1, -1,1];

            case (this.col === 0): //top
                return [0,-1, 0,1, 1,-1, 1,0, 1,1];

            case (this.row === 0): //left
                return [-1,0, -1,1, 0,1, 1,1, 1,0];

            case (this.row === ROWS-1): //right
                return [-1,0, -1,-1, 0,-1, 1,-1, 1,0];

            case (this.col === COLUMNS-1): //bottom
                return [0,-1, -1,-1, -1,0 -1,1, 0,1];

            default: //center
                return [-1,-1, 0,-1, 1,-1, -1,0, 1,0, -1,1, 0,1, 1,1];
        }
    }
    
    draw(){
        context.fillStyle = this.alive ? "black" : "white";
        context.fillRect(this.row*CELLSIZE, this.col*CELLSIZE, CELLSIZE, CELLSIZE);
    }
    checkNeighbours(){
        this.neighboursAlive = 0;

        for(let i=0; i<this.neighbours.length; i+=2){

            console.log(this.col + " : " + this.row + " " + this.col + this.neighbours[i] + " " + this.row + this.neighbours[i+1])

            let neighbour = BOARD.find(cell => cell.col === this.neighbours[i]*CELLSIZE && cell.row === this.neighbours[i+1]*CELLSIZE)
            //BOARD[(this.col+this.neighbours[i]*CELLSIZE)*ROWS + (this.row+this.neighbours[i+1]*CELLSIZE)]
            if(neighbour){
                this.neighboursAlive += neighbour.alive ? 1 : 0;
            }else{
                console.log("Miss");
            }
        }
        console.log("Cell " + this.row + " : " + this.col + " has " + this.neighboursAlive + " neighbours!")
    }
}



window.onload = function () {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    canvas.width = SIZE;
    canvas.height = SIZE;
    createBoard();
}



function createBoard() {
    for(let col=0; col < COLUMNS; col++){
        for(let row=0; row < ROWS; row++){
            let alive = false;
            /*if(col % 2 == 0){
                alive = row % 2 == 0 ? true : false; //Chess BOARD
            }else{
                alive = row % 2 == 0 ? false : true;
            }*/
            
            let newCell = new cell(row, col, alive);
            BOARD.push(newCell);
        }
    }
    console.log(BOARD);

    //No need for draw if all starting cells are dead
    BOARD.forEach(cell => {
        cell.draw();
    });
}

function clickCell(event) {
    var x = event.clientX - 10;
    var y = event.clientY - 10;

    let cellRow = Math.floor(x / CELLSIZE);
    let cellCol = Math.floor(y / CELLSIZE);
    console.log(cellRow + " : " + cellCol);

    let cell = BOARD[cellCol*ROWS + cellRow] //BOARD.find(cell => cell.row === cellRow && cell.col === cellCol);
    cell.alive = !cell.alive;
    cell.draw();
}

function startSimulation(){
    simulate()
    /*if(simulating){
        simulating = 0;
        clearInterval(interval);
    }else{
        simulating = 1;
        interval = setInterval(simulate, 1000);
    }*/
}

function simulate() { //needs to be faster  + ottaa jostain syystä vastakkaisen kulma naapuriksi
    //let aliveCells = BOARD.filter(cell => cell.alive === true);
    console.log("start check");
    BOARD.forEach(cell => {
        cell.checkNeighbours();
    });
    console.log("end check");
}