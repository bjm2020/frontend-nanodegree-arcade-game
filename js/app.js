
var playerX;
var playerY;
var score = 0;
// Enemies our player must avoid
var Enemy = function(speed,locx,locy,del) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = ['images/Attack1.png','images/Attack2.png','images/Attack3.png','images/Attack4.png','images/Attack5.png','images/Attack6.png','images/Attack7.png','images/Attack8.png'];
    Resources.load(this.sprite);
  //  this.initialLocation = loc;  //TODO: figure out location
    //this.sprite = this.sprites[1];
  //  console.log(this.sprite);
    this.spriteCounter = 0;
    this.x = locx;
    this.y= locy;
    this.initialLocationX = locx;
    this.initialLocationY = locy;
    this.speed = speed;  //Enemy Speed: Increments speed
    this.delay = del;  //TODO: Right function to delay enemy start

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  //check if out of bounds
  if(this.x >= ctx.canvas.width){
    this.x = this.initialLocationX;
    this.y = this.initialLocationY;
  }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var curlocx = this.x;
    var curlocy = this.y;
  //  console.log(curlocx);
    //console.log(dt);
    this.x = this.x + this.speed * dt;

    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    if(this.spriteCounter >= 7) {
      this.spriteCounter = 0;
      //this.sprite = this.sprites[0];
    }
    else {
    //  this.sprite = this.sprites[this.spriteCounter];
      this.spriteCounter++;
    }
    console.log(this.sprite[this.spriteCounter]);
    //var imageUrl = this.sprites[this.spriteCounter];
    ctx.drawImage(Resources.get(this.sprite[this.spriteCounter]), this.x, this.y);
};

Enemy.prototype.checkCollision = function() {
  var rect1 = {x: this.x, y: this.y, width: 50, height: 50}
var rect2 = {x: player.x, y: player.y, width: 10, height: 10}

if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {
     checkHighScore();
     this.resetEnemies();
     player.collision();
     score = 0;
}
}

Enemy.prototype.resetEnemies = function() {
  var allEnemies = [enemyslow,enemymed,enemyfast];
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite='images/char-boy.png';
  this.x = 200;  //TODO: figure out player location
  this.y = 425;
}

Player.prototype.update = function() {
//console.log(this.x + " " + this.y);
//  console.log("move before check");
  if(this.x >= 403 || this.x <= -3 || this.y < 44 || this.y > 425) {
      if(this.x >= 403)
      this.x = 402;


    else if(this.x <= -3)
      this.x=-3;

    else if (this.y < 44) {
  //  console.log(heart.pickedUp);
    this.resetPlayer();
    heart.reset();
  }
    else if (this.y > 425)
    this.y = 425;


  }

        playerX = this.x;
        playerY = this.y;
        console.log(score);
    //   console.log("Update" + this.x + " " + this.y);
          /* The drawImage function of the canvas' context element
           * requires 3 parameters: the image to draw, the x coordinate
           * to start drawing and the y coordinate to start drawing.
           * We're using our Resources helpers to refer to our images
           * so that we get the benefits of caching these images, since
           * we're using them  and over.
           */
        //  ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
}

Player.prototype.resetPlayer = function() {
//  console.log("Reset");
  this.x= 200;
  this.y = 425;
  score++;
}

Player.prototype.render = function() {
//  console.log("render");
  ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}

Player.prototype.checkBoundaries = function() {
  if(this.x >= 480 || this.x <= -3) {
    return true;
  }
  else return false;
}

Player.prototype.collision = function() {
  this.resetPlayer();
}

Player.prototype.movePlayer = function(direction) {
  //check boundaries
  //  console.log("Move Switch");
    switch (direction) {
      case 'left':
      this.x = this.x-101;//move left
      break;

      case 'up':
      this.y = this.y - 95;//move up
      break;

      case 'right':
      this.x = this.x+101;//move right
      break;

      case 'down':
      this.y = this.y + 95;//move down
      break;
    }


}

Player.prototype.handleInput = function(keys) {
//console.log("input");
  switch (keys) {
    case 'left':
    this.movePlayer("left");
    break;

    case 'up':
    this.movePlayer("up");
    break;

    case 'right':
    this.movePlayer("right");
    break;

    case 'down':
    this.movePlayer("down");
    break;
  }
}

var Heart = function() {
  this.sprite = "images/Heart.png";
  this.x = getRandomInt(0,400);
  this.y = getRandomInt(45,235);
  this.pickedUp = false;
}

Heart.prototype.update = function() {
this.checkCollision();
//console.log(allItems);
}

Heart.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}

Heart.prototype.collision = function() {

}

Heart.prototype.reset = function() {
  if(this.pickedUp = true) {
  //  console.log("pop");
    allItems.push(this);
    this.pickedUp=false;
  }

  this.x=getRandomInt(0,400);
  this.y=getRandomInt(45,235);
}

Heart.prototype.checkCollision = function() {
  var rect1 = {x: this.x, y: this.y, width: 50, height: 50}
var rect2 = {x: player.x, y: player.y, width: 10, height: 10}

if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {
  //   console.log("Collision");
  if(!this.pickedUp) {
     score = score+5;
   }
     allItems.splice(allItems.findIndex(x => this),1);
     this.pickedUp = true;
    // this.resetEnemies();
    // player.collision();
}
}

function getRandomInt(min,max) {
  return Math.floor(Math.random()*(max-min+1) + min);
}

var Menu = function(title,instructions) {
  if(localStorage.getItem("highscore") === null){
    localStorage.setItem("highscore","0");
    console.log("hello");
  }

  this.highScore = getHighScore();  //TODO: get HIgh Score from some kind of storage
  this.title = title;
  this.instructions = instructions;


}

Menu.prototype.render = function() {
this.drawMenu();
}

Menu.prototype.drawMenu = function() {
  var title = this.title;
  var instructions = this.instructions;
  var highScore = "High Score:" + this.highscore;

  ctx.font="36pt Exquisite-Corpse";
  ctx.textAlign="center";

  ctx.fillStyle="red";
  ctx.fillText(title,250,300);
  ctx.fillText(instructions,250,500);
  ctx.fillText(highScore,250,400);


  ctx.strokeStyle="black";
  ctx.lineWidth=2;
  ctx.strokeText(title,250,300)
  ctx.strokeText(instructions,250,500);

}

Menu.prototype.handleInput = function(key) {
    if(key = 13)
    startGame = true;
}

function checkHighScore() {
    var high = localStorage.getItem("highscore");
    if(score > high) {
      localStorage.setItem("highscore",score);
    }
}

function getHighScore() {
//  localStorage.setItem("highscore","0");
  return localStorage.getItem("highscore");
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var heart = new Heart();
var menu = new Menu("Zombie Escape", "Press Enter To Start");
var enemyslow = new Enemy(2,0,60);
var enemymed = new Enemy(300,0,140);
var enemyfast = new Enemy(500,0,230);
var allEnemies = [enemyslow,enemymed,enemyfast];
var allItems = [heart];

function checkCollision(enemy) {
  var rect1 = {x: enemy.x, y: enemy.y, width: 50, height: 50}
var rect2 = {x: playerX, y: playerY, width: 10, height: 10}

if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {

}
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    var allowedKeysMenu = {
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    menu.handleInput(allowedKeys[e.keyCode]);

});
