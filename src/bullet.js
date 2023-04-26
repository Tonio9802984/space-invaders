import { gameArea } from "./index.js";
import { speed } from "./index.js";

export class Bullet {
  constructor(x, y) {
    this.element = this.createBullet();
    this.x = x;
    this.y = y;
    this.setPosition();
  }

  createBullet() {
    const div = document.createElement("div");
    div.classList.add("bullet");
    gameArea.append(div);
    return div;
  }

  setPosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  move() {
    this.y -= speed * 2;
    this.setPosition();
  }

  checkCollision(asteroids) {
    for (let i = 0; i < asteroids.length; i++) {
      const asteroid = asteroids[i];
      const bulletRect = this.element.getBoundingClientRect();
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

  destroy() {
    this.element.remove();
  }
}
