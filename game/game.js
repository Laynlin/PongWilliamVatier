var game = {
    groundWidth : 700,
    groundHeight : 400,
    groundColor : "#000000",
    netWidth : 6,
    netColor : "#FFFFFF",

    groundLayer : null,
    scoreLayer : null,
    playersBallLayer : null,

    scorePosplayer1 : 250,
    scorePosplayer2 : 415,

    ball : {
        width : 10,
        height : 10,
        color : "#FFFFFF",
        posX : 200,
        posY : 200,
        directionX : 1,
        directionY : 1,
        speed : 2,

        move : function() {
            //console.log('posX' + posX);
            //console.log('posY' + posY);
            this.posX += this.directionX * this.speed;
            this.posY += this.directionY * this.speed;
        },

        bounce : function() {
            if ( (this.posX + this.width) > game.groundWidth || this.posX < 0) {
              this.directionX = -this.directionX;
            }
            if ( (this.posY + this.height) > game.groundHeight || this.posY < 0  )
              this.directionY = -this.directionY;      
        },

        collide : function(anotherItem) {
            if ( !( this.posX >= anotherItem.posX + anotherItem.width || this.posX <= anotherItem.posX - this.width
            || this.posY >= anotherItem.posY + anotherItem.height || this.posY <= anotherItem.posY - this.height ) ) {
              // Collision
              return true;
            } 
            return false;
        },
      },

    playerOne : {
        width : 10,
        height : 50,
        color : "#FFFFFF",
        posX : 10,
        posY : 200,
        goUp : false,
        goDown : false,
        score : 0
      },
       
    playerTwo : {
        width : 10,
        height : 50,
        color : "#FFFFFF",
        posX : 680,
        posY : 200,
        goUp : false,
        goDown : false,
        score : 0
      },
    
    playerThree : {
      width : 10,
      height : 50,
      color : "#FFFFFF",
      posX : 50,
      posY : 200,
      goUp : false,
      goDown : false
    },

    playerFour : {
      width : 10,
      height : 50,
      color : "#FFFFFF",
      posX : 640,
      posY : 200,
      goUp : false,
      goDown : false
    },

    init : function() {
        this.groundLayer = game.display.createLayer("terrain", this.groundWidth, this.groundHeight, undefined, 0, "#000000", 0, 0);
        
        game.display.drawRectangleInLayer(this.groundLayer, this.netWidth, this.groundHeight, this.netColor, this.groundWidth/2 - this.netWidth/2, 0);
        this.scoreLayer = game.display.createLayer("score", this.groundWidth, this.groundHeight, undefined, 1, undefined, 0, 0);
        
        this.playersBallLayer = game.display.createLayer("playersetballe", this.groundWidth, this.groundHeight, undefined, 2, undefined, 0, 0);
        

        this.displayScore(this.playerOne.score,this.playerTwo.score);
        this.displayBall(this.ball.posX, this.ball.posY);
        this.displayPlayers();

        this.initKeyboard(game.control.onKeyDown, game.control.onKeyUp);

    },

    initKeyboard : function(onKeyDownFunction, onKeyUpFunction) {
        window.onkeydown = onKeyDownFunction;
        window.onkeyup = onKeyUpFunction;
    },

    clearLayer : function(targetLayer) {
        targetLayer.clear();
    },

    displayScore : function(scoreplayer1, scoreplayer2){
        game.display.drawTextInLayer(this.scoreLayer, scoreplayer1, "60px Arial", "#FFFFFF", this.scorePosplayer1, 55);
        game.display.drawTextInLayer(this.scoreLayer, scoreplayer2, "60px Arial", "#FFFFFF", this.scorePosplayer2, 55);
    },

    displayBall : function() {
        game.display.drawRectangleInLayer(this.playersBallLayer, this.ball.width, this.ball.height, this.ball.color, this.ball.posX, this.ball.posY);
    },

    moveBall : function() { 
        this.ball.move();
        this.ball.bounce();
        this.displayBall();
        if ( (this.ball.posX + this.ball.width) > game.groundWidth) {
          this.playerOne.score++;
          this.clearLayer(this.scoreLayer);
          this.displayScore(this.playerOne.score,this.playerTwo.score);
        }
        if (this.ball.posX < 0 ) {
          this.playerTwo.score++;
          this.clearLayer(this.scoreLayer);
          this.displayScore(this.playerOne.score,this.playerTwo.score);
        }
    },

    displayPlayers : function() {
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerOne.width, this.playerOne.height, this.playerOne.color, this.playerOne.posX, this.playerOne.posY);
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerTwo.width, this.playerTwo.height, this.playerTwo.color, this.playerTwo.posX, this.playerTwo.posY);
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerThree.width, this.playerThree.height, this.playerThree.color, this.playerThree.posX, this.playerThree.posY);
        game.display.drawRectangleInLayer(this.playersBallLayer, this.playerFour.width, this.playerFour.height, this.playerFour.color, this.playerFour.posX, this.playerFour.posY);
    },

    movePlayerOne : function() {
        if (game.playerOne.goUp && game.playerOne.posY > 0)
          game.playerOne.posY-=5;
        else if (game.playerOne.goDown && game.playerOne.posY < game.groundHeight - game.playerOne.height)
          game.playerOne.posY+=5;
    },
    movePlayerTwo : function() {
      if (game.playerTwo.goUp && game.playerTwo.posY > 0)
        game.playerTwo.posY-=5;
      else if (game.playerTwo.goDown && game.playerTwo.posY < game.groundHeight - game.playerTwo.height)
        game.playerTwo.posY+=5;
    },
    movePlayerThree : function() {
      if (game.playerThree.goUp && game.playerThree.posY > 0)
        game.playerThree.posY-=5;
      else if (game.playerThree.goDown && game.playerThree.posY < game.groundHeight - game.playerThree.height)
        game.playerThree.posY+=5;
    },
    movePlayerFour : function() {
      if (game.playerFour.goUp && game.playerFour.posY > 0)
        game.playerFour.posY-=5;
      else if (game.playerFour.goDown && game.playerFour.posY < game.groundHeight - game.playerFour.height)
        game.playerFour.posY+=5;
    },

    collideBallWithPlayersAndAction : function() { 
        if ( this.ball.collide(game.playerOne) )
          game.ball.directionX = -game.ball.directionX;
        if ( this.ball.collide(game.playerTwo) )
          game.ball.directionX = -game.ball.directionX;
        if ( this.ball.collide(game.playerThree) )
          game.ball.directionX = -game.ball.directionX;
        if ( this.ball.collide(game.playerFour) )
          game.ball.directionX = -game.ball.directionX;
      },

     updateBallValues : function( ballPosX, ballPosY, ballDirX, ballDirY) {
      this.ball.posX = ballPosX,
      this.ball.posY = ballPosY,
      this.ball.directionX = ballDirX,
      this.ball.directionY = ballDirY
     },

    updatePlayerOne : function(P1) {
        this.playerOne.posX = P1.posX,
        this.playerOne.posY = P1.posY
     },
    updatePlayerTwo : function(P2) {
        this.playerTwo.posX = P2.posX,
        this.playerTwo.posY = P2.posY
    },
    updatePlayerThree : function(P3) {
    this.playerThree.posX = P3.posX,
    this.playerThree.posY = P3.posY
    },
    updatePlayerFour : function(P4) {
      this.playerFour.posX = P4.posX,
      this.playerFour.posY = P4.posY
    }
};