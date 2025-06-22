var num=null;
var tile=null;
var errors=0; 
var board=[
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]
var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]
var numberCount = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
};

for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
        numberCount[solution[r][c]]++;
    }
}

window.onload = function(){
    setgame();
}
function setgame(){
    for(let i = 1; i <= 9; i++){
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click",select);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }
    for(let r=0;r<9;r++){
        for(let c=0;c<9;c++){
            let tile = document.createElement("div");
            tile.id=r.toString() + "-" + c.toString();
            if(r==2 || r==5){
                tile.classList.add("bordersrow");
            }
            if(c==2 || c==5){
                tile.classList.add("borderscol");
            }
            if(board[r][c]!="-"){
                tile.innerText=board[r][c];
                tile.classList.add("tile-start");
            }
            tile.addEventListener("click",selecttile);
            tile.classList.add("tile");
            document.getElementById("board").appendChild(tile);
        }
    }
}
function select(){
    if(num != null){
        num.classList.remove("number-selected");
    }
    num=this;
    // console.log(num);
    num.classList.add("number-selected");
}
// function selecttile(){
//     if(num){
//         if(this.innerText != ""){
//             return;
//         }
//         // this.innerText=num.id;
//         let coords = this.id.split("-");
//         let r=parseInt(coords[0]);
//         let c=parseInt(coords[1]); 
        
//         if(solution[r][c] == num.id){
//             this.innerText = num.id;
//         }
//         else{
//             this.innerText="";
//             errors+=1;
//             document.getElementById("errors").innerText=errors;
//         }
//     }
// } 
function selecttile() {
    if (num) {
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (this.innerText === "" && solution[r][c] === num.id) {
            this.innerText = num.id; 
            numberCount[num.id]--; 

            if (numberCount[num.id] === 0) {
                const selectedNumber = document.getElementById(num.id);
                selectedNumber.classList.add("dimmed"); 
                selectedNumber.removeEventListener("click", select); 
                num = null; 
            }
        } else {
            errors++;
            document.getElementById("errors").innerText = errors;

            if (errors >= 5) {
                alert("You have reached the maximum error limit! The game will reset.");
                setTimeout(resetGame, 2000);
            }
        }
    }
}

function resetGame() {
    document.getElementById("board").innerHTML = "";

    errors = 0;
    document.getElementById("errors").innerText = errors;

    for(let r=0;r<9;r++){
        for(let c=0;c<9;c++){
            let tile = document.createElement("div");
            tile.id=r.toString() + "-" + c.toString();
            if(r==2 || r==5){
                tile.classList.add("bordersrow");
            }
            if(c==2 || c==5){
                tile.classList.add("borderscol");
            }
            if(board[r][c]!="-"){
                tile.innerText=board[r][c];
                tile.classList.add("tile-start");
            }
            tile.addEventListener("click",selecttile);
            tile.classList.add("tile");
            document.getElementById("board").appendChild(tile);
        }
    }
}