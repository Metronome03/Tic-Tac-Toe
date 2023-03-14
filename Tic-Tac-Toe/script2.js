const Player=(name,symbol,[])=>{
    return{name,symbol,playerMoves:[]};
};
const gameBoard=(()=>{
    const start=document.querySelector(".start-button");
    const playerSetup=document.querySelector(".main-menu");
    const gameGrid=document.querySelector(".game");
    start.addEventListener("click",()=>{
        playerSetup.classList.add("none-display");
        gameGrid.classList.remove("none-display");
    });
    let board=["","","","","","","","",""];
    const squares=document.querySelectorAll(".grid-button");
    squares.forEach((square)=>{
        square.addEventListener("click",()=>
        {
            let position=parseInt(square.getAttribute("data-number"));
            gameBoard.board[position]=gamePlay.currentPlayer.symbol;
            square.textContent=gamePlay.currentPlayer.symbol;
        })
    });
        squares.forEach((square)=>{
            square.addEventListener("click",(e)=>{
                gamePlay.makeMove(e);
                gamePlay.currentPlayer.playerMoves.push(e.target.getAttribute("data-number"));
                gamePlay.movesLeft-=1;
                /*if(gamePlay.winCheck())
                a=0;
                else*/
                gamePlay.playerChange();
            });
        });
    return {board};
})();
const gamePlay=(()=>{
    let playerText1=document.querySelector(".player-1-text");
    let playerText2=document.querySelector(".player-2-text");
    const playerX=Player(playerText1.textContent,"X",[]);
    const playerO=Player(playerText2.textContent,"O",[]);
    const playerTurn=document.querySelector(".player-turn");
    let currentPlayer=playerX;
    let gameOver=false;
    let movesLeft=9;
    let winConditions=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    /*function winCheck()
    {
        if(this.currentPlayer.playerMoves in winConditions)
        this.gameOver=true;
        else
        this.gameOver=false; 
        return this.gameOver;       
    }*/
    function makeMove(e)
    {
        let square=e.target;
        if(square.textContent=="")
        {
        square.textContent=this.currentPlayer.symbol;
        gameBoard.board[square.getAttribute("data-number")]=currentPlayer.symbol;
        this.currentPlayer.playerMoves.push(square.getAttribute("data-number"));
    }

       
    }
    function playerChange()
    {
        
        if(this.currentPlayer.symbol == playerX.symbol)
        this.currentPlayer = playerO;
        else
        this.currentPlayer = playerX;
        console.log(this)
        console.log(this.currentPlayer);  
    }
    
    return {currentPlayer,movesLeft,gameOver,playerChange,makeMove};
})();