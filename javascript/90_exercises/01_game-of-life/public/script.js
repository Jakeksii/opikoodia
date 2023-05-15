var canvas;
var context;
var interval;
var simulating = 0;

var size = 500;
var columns = 10;
var rows = 10;
var cellSize = 50;

var board = [];


class cell {
    constructor (row, col, alive=false){
        this.row = row;
        this.col = col;
        this.alive = alive;
    }
    draw(){
        context.fillStyle = this.alive ? "black" : "white";
        context.fillRect(this.row*cellSize, this.col*cellSize, cellSize, cellSize);
    }
}



window.onload = function () {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;
    createBoard();
}



function createBoard() {
    for(let col=0; col < columns; col++){
        for(let row=0; row < rows; row++){
            let alive = false;
            /*if(col % 2 == 0){
                alive = row % 2 == 0 ? true : false;
            }else{
                alive = row % 2 == 0 ? false : true;
            }*/
            
            let newCell = new cell(row, col, alive);
            board.push(newCell);
        }
    }
    console.log(board);

    board.forEach(cell => {
        cell.draw();
    });
}

function clickCell(event) {
    var x = event.clientX - 10;
    var y = event.clientY - 10;

    let cellRow = Math.floor(x / cellSize);
    let cellCol = Math.floor(y / cellSize);
    console.log(cellRow + " : " + cellCol);

    let cell = board[cellCol*rows + cellRow] //board.find(cell => cell.row === cellRow && cell.col === cellCol);
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
    //let aliveCells = board.filter(cell => cell.alive === true);
    board.forEach(cell => {
        let neighboursAlive = 0;

        const neighbours = [-1, -1, 0, -1, 1, -1, -1, 0, 1, 0, -1, 1, 0, 1, 1, 1];
        let cellRow = cell.row;
        let cellCol = cell.col;

        console.log("Solu: " + cellRow + " : " + cellCol);

        for(i=0; i<16; i+=2){
            let neighbour = board[(cellCol+neighbours[i])*rows + (cellRow+neighbours[i+1])] //.find(cell => cell.row === (cellRow + neighbours[i]) && cell.col === (cellCol + neighbours[i+1]));
            if(neighbour !== undefined){
                console.log("naapuri "+ neighbour.row +" : " + neighbour.col + " " + neighbour.alive)
                neighboursAlive += neighbour.alive ? 1 : 0;
            }
        }
        console.log("naapurit hengissä "+ neighboursAlive + "\n")
    });
}