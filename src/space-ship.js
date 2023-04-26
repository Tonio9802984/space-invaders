import { gameArea } from "./index.js";
import { speed } from "./index.js";
import { Asteroid } from "./asteroid.js";
export class Spaceship {
  // my space spaceship will have a method that will allow him to move in 4 direction
  // a method to set the initial position
  // a way to verif if we can move in the 4 directions

  constructor() {
    // set up of gameArea where we gonna have our map to play

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
