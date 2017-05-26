var score = 0;

// Enemies our player must avoid

var Enemy = function(locx, locy) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite array for our enemies for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = ['images/Attack1.png', 'images/Attack2.png', 'images/Attack3.png', 'images/Attack4.png', 'images/Attack5.png', 'images/Attack6.png', 'images/Attack7.png', 'images/Attack8.png'];
    Resources.load(this.sprite); //load enemies to game engine
    this.spriteCounter = 0; //variable used as counter to load next image in sprite array
    this.x = locx;
    this.y = locy;
    this.initialLocationX = locx;
    this.initialLocationY = locy;
    this.speedSettings = [100, 150, 200, 250, 300, 350, 400, 450, 500]; //array to control speed settings
    this.speed = this.speedSettings[getRandomInt(0, 8)]; //Enemy Speed: gets random speed value from speed settings array

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //check if out of bounds. If so, Reset to inital location and get random speed.
    if (this.x >= ctx.canvas.width) {
        this.x = this.initialLocationX;
        this.y = this.initialLocationY;
        this.speed = this.speedSettings[getRandomInt(0, 8)];
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + this.speed * dt;

    //check for Collisions with the player
    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //check if at end of sprite image array.  If so, start over at 0.  If not, increment to next image in sprite array.
    if (this.spriteCounter >= 7) {
        this.spriteCounter = 0;
    } else {
        this.spriteCounter++;
    }

    //draw the new enemy image with the value in sprite counter
    ctx.drawImage(Resources.get(this.sprite[this.spriteCounter]), this.x, this.y);
};

//Checks for collisions using the Axis-Aligned Bounding Box Method.
//If collision occurs, activate Game Over Menu, send collision data to player and reset score to 0.

Enemy.prototype.checkCollision = function() {
    var rect1 = {
        x: this.x,
        y: this.y,
        width: 50,
        height: 50
    }
    var rect2 = {
        x: player.x,
        y: player.y,
        width: 50,
        height: 50
    }

    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
        menu.gameOver(score);
        player.collision();
        score = 0;
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/warrior.png';
    this.x = 200; //current player position x coordinate
    this.y = 425; //current player position y coordinate
}

//The player update function checks for player out of bounds or
//player reaching the grass.

Player.prototype.update = function() {

    //Check players position, prevent out of bounds, or player finished
    if (this.x >= 403 || this.x <= -3 || this.y < 44 || this.y > 425) {
        //Player Reaches Right Wall.
        if (this.x >= 403)
            this.x = 402;

        //Player reaches left wall
        else if (this.x <= -3)
            this.x = -3;

        //Player reaches end grass.  Reset Player to original position. Increment score. Reset Heart(s);
        else if (this.y < 44) {
            this.resetPlayer();
            score++;
            heart.reset();
        }
        //Prevent player from going off bottom wall
        else if (this.y > 425)
            this.y = 425;


    }
}

//Resets the player to its original position
Player.prototype.resetPlayer = function() {
    this.x = 200;
    this.y = 425;
}

//Renders the player sprite.  Image set in constructor as this.sprite.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Resets Player if collision with enemy occurs.
Player.prototype.collision = function() {
    this.resetPlayer();
}
//Move the player.  Gets direction from handleInput method.
Player.prototype.movePlayer = function(direction) {
    switch (direction) {
        case 'left':
            this.x = this.x - 101; //move left
            break;

        case 'up':
            this.y = this.y - 95; //move up
            break;

        case 'right':
            this.x = this.x + 101; //move right
            break;

        case 'down':
            this.y = this.y + 95; //move down
            break;
    }
}
//Gets input from the input event listener.  Call MovePlayer method based on input received.
Player.prototype.handleInput = function(keys) {
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

//The Heart object.  Hearts are collected int he game for bonus points.

var Heart = function() {
    this.heartXValues = [-2, 105, 200, 301, 402]; //Array of possible X coordinate positions
    this.heartYValues = [45, 140, 240]; //Array of possible Y coordinate positions
    this.sprite = "images/Heart.png";
    this.x = this.heartXValues[getRandomInt(0, 4)]; //set heart postion with random integer of heart position array
    this.y = this.heartYValues[getRandomInt(0, 2)];
    this.pickedUp = false; //Is the Heart collected?
}

//Updates the heart object.  Checks for collision with the Player.
Heart.prototype.update = function() {
    this.checkCollision();
}

//Draw the heart image onto the canvas.
Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Reset the hearts position onto the canvas
Heart.prototype.reset = function() {

    //If the heart is picked up. add a new heart to the allItems array.
    //This is required when deleted the heart from the canvas.  Reset pickedUp to false.
    if (this.pickedUp = true) {
        allItems.push(this);
        this.pickedUp = false;
    }

    //Get new random heart position.
    this.x = this.heartXValues[getRandomInt(0, 4)];
    this.y = this.heartYValues[getRandomInt(0, 2)];
}

//Check for collision with player.  If collision occurs, add to score and remove heart from canvas.
Heart.prototype.checkCollision = function() {
    var rect1 = {
        x: this.x,
        y: this.y,
        width: 50,
        height: 50
    }
    var rect2 = {
        x: player.x,
        y: player.y,
        width: 10,
        height: 10
    }

    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {

        //If heart isn't picked up already, add to score.
        if (!this.pickedUp) {
            score = score + 5;
        }
        //removes heart image from canvas.  Set PickedUp to true.
        allItems.splice(allItems.findIndex(x => this), 1);
        this.pickedUp = true;
    }
}

//Helper function for getting random integers between two values (min,max).
//Used to get random coordinates for Enemies and Hearts as well as random speed for enemies.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//The Menu object is used to create a new start menu and game over menu

var Menu = function(title, instructions1, instructions2) {
    this.title = title; //Game Title
    this.instructions1 = instructions1; //Menu Instruction Prompt
    this.instructions2 = instructions2; //Menu Instruction Prompt
    this.EndGame = false; //Used to change menu to Game Over mode
    this.score = 0; //Keeps track of previous game score
}

//Renders the Menu.  Calls Draw Menu function with instructions to draw menu text.

Menu.prototype.render = function() {
    this.drawMenu();
}

//used to change the menu title and instructions

Menu.prototype.setText = function(title, instructions1, instructions2) {
    this.title = title;
    this.instructions1 = instructions1;
    this.instructions2 = instructions2;
}

//Change menu to GameOver.  Send startGame to Engine in order to render new menu.
//Sets Game Over Menu Text.

Menu.prototype.gameOver = function(gamescore) {
    this.setText("Game Over", "Score: " + gamescore, "Press Any Key To Start Over");
    startGame = false;
    this.EndGame = true;
}

//Draws the game menu

Menu.prototype.drawMenu = function() {
    var title = this.title;
    var instructions = this.instructions;

    ctx.font = "55pt Exquisite-Corpse";
    ctx.textAlign = "center";
    ctx.fillStyle = "red";

    ctx.fillText(title, 250, 200);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeText(title, 250, 200);

    ctx.font = "30pt Exquisite-Corpse";

    ctx.fillText(this.instructions1, 250, 300);
    ctx.strokeText(this.instructions1, 250, 300);

    //Check if game over initialized.  Display Previous Game Score
    if (this.EndGame) {
        ctx.font = "25pt Exquisite-Corpse";
    }
    ctx.fillText(this.instructions2, 250, 400);
    ctx.strokeText(this.instructions2, 250, 400);

}

//Gets input from event listener.  Sends startGame to engine to Remove Menu and render game elements.

Menu.prototype.handleInput = function(key) {
    if (key = 'enter')
        startGame = true;
}

/*  TODO:  Started High Score Code Save and Retrieve Code.  Cannot test high scores using File:///. Browsers do not support saving cookies or localstorage with local files.
function setHighScore() {
    var high = getHighScore();
    if(score > high) {
      document.getElementById("highscore").value = score;
    }
}

function getCookie() {
    if(document.cookie = "") {
      setCookie(0);
    }
    return document.cookie.charAt(10);
}

function setCookie(highscore) {
  var d = new Date();
  d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = "highscore="+ highscore + "; " + expires + "; path=/";
}


function getHighScore() {
return getCookie();
//  localStorage.setItem("highscore","0");
//console.log(document.getElementById("highscore").value);
//  return document.getElementById("highscore").value;
}

*/

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
var heart = new Heart();
var menu = new Menu("Zombie Escape", "Escape the Zombie Hoard", "Press Any Key To Start");
var enemyOne = new Enemy(-5, 70);
var enemyTwo = new Enemy(-5, 140);
var enemyThree = new Enemy(-5, 230);
var enemyFour = new Enemy(-5, 330);
var allEnemies = [enemyOne, enemyTwo, enemyThree, enemyFour];
var allItems = [heart];


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
    menu.handleInput(allowedKeysMenu[e.keyCode]);

});

//Set the score to global variable for use in Engine.js
global.score = score;
