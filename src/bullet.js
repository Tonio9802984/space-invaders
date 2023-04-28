import { gameArea } from "./index.js";
import { speed } from "./index.js";

export class Bullet {
  constructor(x, y) {
    this.element = this.createBullet();
    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;
    this.x = x - this.width / 2;
    this.y = y - this.height;
    this.setPosition();
  }

  createBullet() {
    const div = document.createElement("div");
    div.classList.add("bullet");
    gameArea.append(div);
    return div;
  }

  // sets the position of the bullet element based on its x and y properties.
  setPosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  //moves the bullet up by speed * 2 pixels on the y axis and sets
  //the new position of the bullet using the setPosition function.
  move() {
    this.y -= speed * 2;
    this.setPosition();
  }

  // takes an array of asteroids as an argument and checks for collision
  //between the bullet and each asteroid in the array.
  //The collision is detected by comparing the position of the bullet with the position
  //of each asteroid using the getBoundingClientRect() method.
  //If a collision is detected, both the asteroid and the bullet are destroyed.
  checkCollision(asteroids) {
    for (let i = 0; i < asteroids.length; i++) {
      const asteroid = asteroids[i];
      const bulletRect = this.element.getBoundingClientRect();
      // getBoundingClientRect() method that returns the size of an element and its position relative
      //to the viewport. Specifically, it returns an object with properties such as top, bottom, left, right, width, and height.
      //returns the position and size of an element relative to the viewport,
      //not to the document or its parent elements.
      const asteroidRect = asteroid.element.getBoundingClientRect();
      if (
        bulletRect.left < asteroidRect.right &&
        bulletRect.right > asteroidRect.left &&
        bulletRect.top < asteroidRect.bottom &&
        bulletRect.bottom > asteroidRect.top
      ) {
        asteroid.destroy();
        this.destroy();
      }
    }
  }
  // remove the bullet from the DOM
  destroy() {
    this.element.remove();
  }
}
