let currnetPlayer ="X"
let NUMBER_OF_ROWS = 3;
let turns = NUMBER_OF_ROWS ** 2 ;
let turnsCounter= 0;
const PlayResult = document.querySelector(".Playresult");

const increaseBoardsButton = document.querySelector("#increase");


const decreaseBoardsButton = document.querySelector("#decrease");

PlayResult.textContent="Play!";


const createBoardArray= ()=>{
  let board = [];
  for(let row=0;row < NUMBER_OF_ROWS;row++){
    board.push(Array.from({length:NUMBER_OF_ROWS},()=>"_"))
  }
  return board
}
let board =createBoardArray();


const getCellPlacement =(index ,numberOfRows )=>{
  const row = Math.floor(index / numberOfRows)
const column = index % numberOfRows;

return [row , column]
}

/**Reset Game Start**/
const restGameButton = document.querySelector("#reset");

const restGame =()=> {
  document.querySelector(".board").remove();
    turns = NUMBER_OF_ROWS ** 2;

  document.documentElement.style.setProperty( "--grid-rows", NUMBER_OF_ROWS);
  createBoard();
  board = createBoardArray();

currnetPlayer = "X";
turnsCounter=0;
 PlayResult.textContent="Play!"
 
} ;

/**Reset Game End**/


/**Checking The Cells Start**/

const checkRows = (currnetPlayer)=>{
   for(let row =0; row < NUMBER_OF_ROWS ; row++){

      let column = 0; // move here

      while(column < NUMBER_OF_ROWS){

        if(board[row][column] !== currnetPlayer){
          break;
        }

        column++;

        if(column === NUMBER_OF_ROWS){
          return true;
        }
      }
   }
};
const checkColumns = (currnetPlayer)=>{

   for(let column =0; column < NUMBER_OF_ROWS ; column++){

      let row = 0; // move here

      while(row < NUMBER_OF_ROWS){

        if(board[row][column] !== currnetPlayer){
          break;
        }

        row++;

        if(row === NUMBER_OF_ROWS){
          return true;
        }
      }
   }
};
const checkDiagonals = ()=>{
   let count = 0;
    while(count<NUMBER_OF_ROWS){
      if(board [count][count] !== currnetPlayer){
        count=0;
        break;
      }
      count++;
      if(count=== NUMBER_OF_ROWS){return true}

    }
};
const checkDiagonalsRevers = ()=>{
     let count = 0;
    while(count<NUMBER_OF_ROWS){
      if(board [count][NUMBER_OF_ROWS-1 -count ] !== currnetPlayer){
        count=0;
        break;
      }
      count++;
      if(count=== NUMBER_OF_ROWS){return true}

    }
};


/**Checking The Cells End**/

/**Run Events Start**/
const checkWin = (currnetPlayer)=> {
  if(checkRows(currnetPlayer)){ return true}
  if(checkColumns(currnetPlayer)){return true}
    if(checkDiagonals(currnetPlayer)){return true}
    if(checkDiagonalsRevers(currnetPlayer)){return true}

};

 const runWinEvent = (currnetPlayer)=>{
    setTimeout(()=>{    PlayResult.textContent = `Player ${currnetPlayer} Won!`} , 1000);
  setTimeout(()=>{ restGame();} ,2000);
};

 const runDrawEvent = ()=> {
  setTimeout(()=>{    PlayResult.textContent = "It's a Draw"} , 1000);
  setTimeout(()=>{ restGame();} ,2000);
};
/**Run Events End**/

 
const cellClicking = (event,index) =>{
const cell = event.target;
 const [row , column ] = getCellPlacement(index ,NUMBER_OF_ROWS);


if(board[row][column] === "_"){
  turnsCounter++;
   
  board[row][column] =currnetPlayer;
  cell.querySelector(".value").textContent = currnetPlayer;
  cell.classList.add(`cell--${currnetPlayer}`)

  if(checkWin(currnetPlayer)){
    runWinEvent(currnetPlayer);
  }else{
    if(turnsCounter === turns){runDrawEvent();}      
    
    if(currnetPlayer==="X"){
        currnetPlayer = "O"
      }else{
        currnetPlayer="X"
      }
  }
}
}


const createBoard= ()=>{
    const container= document.querySelector(".container");
    const board =document.createElement("div");
    board.classList.add("board");

   for(let i =0; i < NUMBER_OF_ROWS**2; i++){
     const  cellElemnetString=`<div class="cell" role="button" tabindex="${i+1}"><span class="value"></span></div>`;
     const cellElemnet = document.createRange().createContextualFragment(cellElemnetString);

    cellElemnet.querySelector(".cell").onclick = event => cellClicking(event,i);
    cellElemnet.querySelector(".cell").onkeydown = event => event.key==="Enter" ?  cellClicking(event,i) : true;

     board.appendChild(cellElemnet);
   }

   container.insertAdjacentElement("afterbegin" , board)
}

/**Adding Events Start**/
restGameButton.addEventListener("click",restGame);
createBoard();

document.documentElement.style.setProperty("--grid-rows",NUMBER_OF_ROWS);
increaseBoardsButton.addEventListener("click",()=>{  
  if (NUMBER_OF_ROWS < 6) {
    NUMBER_OF_ROWS++;
    restGame();
  }}
);
decreaseBoardsButton.addEventListener("click",()=>{  
  if (NUMBER_OF_ROWS > 3) {
    NUMBER_OF_ROWS--;
    restGame();
  }

})
/**Adding Events End**/
