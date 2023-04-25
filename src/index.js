import { Spaceship } from "./space-ship.js";
export const gameArea = document.querySelector("main");
// set up of the startgamebutton --> activate the function start game
export const startGameButton = document.getElementById("start-button");
export const speed = 7;
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
    this.animate();
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
    requestAnimationFrame(() => {
      this.animate();
    });
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
