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

        switch (true){
            case (row === 0 && col === 0): //top left
                this.neighbours = [1,0, 0,1, 1,1];
                break;
            case (row === 0 && col === COLUMNS-1): //top right
                this.neighbours = [0,-1, 1,0, 1,-1];
                break;
            case (row === ROWS-1 && col === 0): //bottom right
                this.neighbours = [-1,0, 0,-1, -1,-1];
                break;
            case (row === ROWS-1 && col === COLUMNS-1): //bottom left
                this.neighbours = [-1,0, 0,1, -1,1];
                break;
            case (col === 0): //top
                this.neighbours = [0,-1, 0,1, 1,-1, 1,0, 1,1];
                break;
            case (row === 0): //left
                this.neighbours = [-1,0, -1,1, 0,1, 1,1, 1,0];
                break;
            case (row === ROWS-1): //right
                this.neighbours = [-1,0, -1,-1, 0,-1, 1,-1, 1,0];
                break;
            case (col === COLUMNS-1): //bottom
                this.neighbours = [0,-1, -1,-1, -1,0 -1,1, 0,1];
                break;
            default: //center
                this.neighbours = [-1,-1, 0,-1, 1,-1, -1,0, 1,0, -1,1, 0,1, 1,1];
                break;
        }
    }
    draw(){
        context.fillStyle = this.alive ? "black" : "white";
        context.fillRect(this.row*CELLSIZE, this.col*CELLSIZE, CELLSIZE, CELLSIZE);
    }
    checkNeighbours(){
        this.neighboursAlive = 0;

        for(let i=0; i<this.neighbours.length; i+=2){
            let neighbour = BOARD[(this.col+this.neighbours[i])*ROWS + (this.row+this.neighbours[i+1])] //.find(cell => cell.row === (cellRow + neighbours[i]) && cell.col === (cellCol + neighbours[i+1]));
            console.log("naapuri "+ neighbour.row +" : " + neighbour.col + " " + neighbour.alive)
            this.neighboursAlive += neighbour.alive ? 1 : 0;
        }
        console.log("Solu: " + this.row + " : " + this.col + " naapurit hengissä "+ this.neighboursAlive + "\n")
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
    BOARD.forEach(cell => {
        cell.checkNeighbours();
    });
}