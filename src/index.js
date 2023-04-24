// set up of gameArea where we gonna have our map to play
const gameArea = document.querySelector("main");
// set up of the startgamebutton --> activate the function start game
const startGameButton = document.getElementById("start-button");
const speed = 10;
const pressedKeys = {
  left: false,
  right: false,
  up: false,
  down: false,
};
startGameButton.addEventListener("click", startGame);

class Spaceship {
  // my space spaceship will have a method that will allow him to move in 4 direction
  // a method to set the initial position
  // a way to verif if we can move in the 4 directions
  constructor() {
    this.element = this.createSpaceShip();
    this.x = gameArea.clientWidth / 2 - this.element.clientWidth / 2;
    this.y = gameArea.clientHeight / 2 - this.element.clientHeight / 2;
    this.setPosition();
  }

  createSpaceShip() {
    const div = document.createElement("div");
    div.id = "spaceship";
    gameArea.append(div);
    return div;
  }

  setPosition() {
    // setPosition() sets the left property of an element's style based on the value of this.x.
    //The left property sets or returns the left position of a positioned element
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  movement(direction) {
    switch (direction) {
      case "left":
        this.x -= speed;
        break;
      case "right":
        this.x += speed;
        break;
      case "up":
        this.y -= speed;
        break;
      case "down":
        this.y += speed;
        break;
    }
    this.setPosition();
  }
}

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
