
var playerX;
var playerY;
// Enemies our player must avoid
var Enemy = function(speed,locx,locy,del) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  //  this.initialLocation = loc;  //TODO: figure out location
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
    console.log(curlocx);
    //console.log(dt);
    this.x = (curlocx+1 + this.speed);

    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite='images/char-boy.png';
  this.x = 200;  //TODO: figure out player location
  this.y = 425;
}

Player.prototype.update = function() {

  console.log("move before check");
  if(this.x >= 403 || this.x <= -3 || this.y < 44 || this.y > 425) {
      if(this.x >= 403)
      this.x = 402;


    else if(this.x <= -3)
      this.x=-3;

    else if (this.y < 44)
    this.resetPlayer();

    else if (this.y > 425)
    this.y = 425;


  }

        playerX = this.x;
        playerY = this.y;
       console.log("Update" + this.x + " " + this.y);
          /* The drawImage function of the canvas' context element
           * requires 3 parameters: the image to draw, the x coordinate
           * to start drawing and the y coordinate to start drawing.
           * We're using our Resources helpers to refer to our images
           * so that we get the benefits of caching these images, since
           * we're using them over and over.
           */
        //  ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
}

Player.prototype.resetPlayer = function() {
  console.log("Reset");
  this.x= 200;
  this.y = 425;
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
console.log("input");
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


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var enemyslow = new Enemy(2,0,60);
var enemymed = new Enemy(2,0,140);
var enemyfast = new Enemy(3,0,230);
var allEnemies = [enemyslow,enemymed,enemyfast];

function checkCollision(enemy) {
  var rect1 = {x: enemy.x, y: enemy.y, width: 50, height: 50}
var rect2 = {x: playerX, y: playerY, width: 10, height: 10}

if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {
    // this.Engine.main();
    // this.resetPlayer();
    // collision detected!
//  console.log("Collision");
//  window.alert("help");
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

    player.handleInput(allowedKeys[e.keyCode]);
});
