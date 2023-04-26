import { Spaceship } from "./space-ship.js";
import { Asteroid } from "./asteroid.js";
//
export const modal = document.getElementById("start-game");
// set up of gameArea where we gonna have our map to play
export const gameArea = document.querySelector("main");
// set up of the startgamebutton --> activate the function start game
export const startGameButton = document.getElementById("start-button");
export const speed = 5;
export const pressedKeys = {
  left: false,
  right: false,
  up: false,
  down: false,
};

startGameButton.addEventListener("click", startGame);

class Game {
  constructor() {
    this.spaceship = new Spaceship();
    this.asteroid = [];
    this.generateAsteroids();
    this.animate();
  }

  //   In the generateAsteroids method, we create 10 asteroids by randomly generating their x and y coordinates.
  //   If the random number is less than 0.5, we set the asteroid's x coordinate to be -50, which means it will start offscreen to the left.
  //   Otherwise, we set it to be gameAreaWidth + 50, which means it will start offscreen to the right.
  //   The y coordinate is a random number between 0 and the height of the game area.
  generateAsteroids() {
    const numAsteroids = 10;
    const gameAreaWidth = gameArea.clientWidth;
    const gameAreaHeight = gameArea.clientHeight;
    for (let i = 0; i < numAsteroids; i++) {
      const x = Math.random() < 0.5 ? -50 : gameAreaWidth + 50;
      const y = Math.random() * gameAreaHeight;
      const asteroid = new Asteroid(x, y); // pass x and y coordinates to the Asteroid constructor
      this.asteroid.push(asteroid);
    }
  }

  animate() {
    if (pressedKeys.right) {
      this.spaceship.movement("right");
    }
    if (pressedKeys.left) {
      this.spaceship.movement("left");
    }
    if (pressedKeys.up) {
      this.spaceship.movement("up");
    }
    if (pressedKeys.down) {
      this.spaceship.movement("down");
    }
    this.moveObjects();
    this.detectCollisions();
    requestAnimationFrame(() => {
      this.animate();
    });
  }
  moveObjects() {
    this.asteroid.forEach((asteroid) => {
      asteroid.move();
    });
  }
  detectCollisions() {
    this.asteroid.forEach((asteroid) => {
      if (this.spaceship.checkCollision(asteroid)) {
        console.log("Collision detected!");
        this.gameOver();
      }
    });
  }
  gameOver() {
    console.log("Game over!");
    // Add your game over logic here, such as showing a game over screen, resetting the game, etc.
    this.stop();
  }
}

window.addEventListener("keydown", handlePressedKeys);
window.addEventListener("keyup", handleReleasedKeys);
// the function which is called by the start button
function startGame() {
  new Game();
}

function handlePressedKeys(event) {
  switch (event.code) {
    case "ArrowLeft":
      pressedKeys.left = true;
      break;
    case "ArrowRight":
      pressedKeys.right = true;
      break;
    case "ArrowUp":
      pressedKeys.up = true;
      break;
    case "ArrowDown":
      pressedKeys.down = true;
      break;
  }
}

function handleReleasedKeys(event) {
  switch (event.code) {
    case "ArrowLeft":
      pressedKeys.left = false;
      break;
    case "ArrowRight":
      pressedKeys.right = false;
      break;
    case "ArrowUp":
      pressedKeys.up = false;
      break;
    case "ArrowDown":
      pressedKeys.down = false;
      break;
  }
}

// stars background --> https://codepen.io/JDoe/pen/QxvgOZ
// picture for the spaceship --> https://opengameart.org/content/ship-sprites-0
