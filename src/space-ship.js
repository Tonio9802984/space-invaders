import { gameArea } from "./index.js";
import { speed } from "./index.js";
import { Asteroid } from "./asteroid.js";
import { Bullet } from "./bullet.js";
import { game } from "./index.js";
export class Spaceship {
  // my space spaceship will have a method that will allow him to move in 4 direction
  // a method to set the initial position
  // a way to verif if we can move in the 4 directions

  constructor(asteroids) {
    // set up of gameArea where we gonna have our map to play
    this.element = this.createSpaceShip();
    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;
    this.x = gameArea.clientWidth / 2 - this.width / 2;
    this.y = gameArea.clientHeight - this.height - 10;
    this.asteroids = asteroids;
    this.bullets = [];
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

  shoot(asteroids) {
    let bullet = new Bullet(this.x + this.width / 2, this.y);
    // bullet.x = this.x + this.width / 2 - bullet.width / 2;
    // bullet.y = this.y - bullet.height;
    this.bullets.push(bullet);
    gameArea.append(bullet.element);

    // check collision with asteroids
    for (let asteroid of this.asteroids) {
      if (game.isCollide(asteroid.element, bullet.element)) {
        asteroid.destroy();
        bullet.destroy();
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
        asteroids.splice(asteroids.indexOf(asteroid), 1);
        score += 1;
        break;
      }
    }
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
