function changeColor() {
    let btn1 = document.getElementById("btn1");

    let colorpicker = "ABCDEF0123456789"
    let color = "#";
    for(let i=0; i<6; i++){
        let temp = Math.floor(Math.random()*16);
        color = color + colorpicker[temp];
    }
    btn1.style.backgroundColor = color;
    
    console.log("changed color! ", color);
}
