const Player=(name,symbol,[])=>{
    return{name,symbol,playerMoves:[]};
};
const start=document.querySelector(".start-button");
const gameBoard=(()=>{
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
            gamePlay.currentPlayer.playerMoves.push(square.getAttribute("data-number"));
            
        })
    });
        squares.forEach((square)=>{
            square.addEventListener("click",(e)=>{
                if(square.value=="")
                {
                gamePlay.makeMove(e);
                if(gamePlay.winCheck())
                display.gameComplete();
                else
                gamePlay.playerChange();}
            });
        });
    return {board};
})();
const gamePlay=(()=>{
    let playerText1=document.querySelector(".player-1-text");
    let playerText2=document.querySelector(".player-2-text");
    const playerX=Player(playerText1.value,"X",[]);
    const playerO=Player(playerText2.value,"O",[]);
    start.addEventListener("click",()=>{
        gamePlay.currentPlayer.name=playerText1.value;
        playerO.name=playerText2.value;
        display.displayStatus();
    });
    let currentPlayer=playerX;
    let gameOver=false;
    let movesLeft=9;
    let winConditions=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    function winCheck()
    {
        for(let i of winConditions)
        {
            let c=0;
            for(let j of i)
            {
                if(j in this.currentPlayer.playerMoves)
                c++;
            }
            if(c==3)
            {
                this.gameOver=true;
                break;
            }
        }
        return this.gameOver;
    }
    function makeMove(e)
    {
        let square=e.target;
        if(square.textContent!="X"||square.textContent!="O")
        {
        this.movesLeft-=1;
        square.value=this.currentPlayer.symbol;
        gameBoard.board[square.getAttribute("data-number")]=this.currentPlayer.symbol;
        }
        console.log(gameBoard.board)
    }
    function playerChange()
    {
        if(this.currentPlayer === playerX)
        this.currentPlayer = playerO
        else
        this.currentPlayer = playerX;
        display.displayStatus();
        console.log('nextPlayer() function ran')
        console.log('active player: ' + this.currentPlayer.symbol);
    }
    
    return {currentPlayer,movesLeft,gameOver,playerChange,makeMove,winCheck};
})();
const display=(()=>{
    const status=document.querySelector(".player-turn");
    function displayStatus()
    {
        status.textContent=`${gamePlay.currentPlayer.name}\'s(${gamePlay.currentPlayer.symbol}) turn`
    }
    function gameComplete()
    {

    }
    return {displayStatus,gameComplete};
})();