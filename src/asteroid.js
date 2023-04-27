import { gameArea } from "./index.js";
import { Spaceship } from "./space-ship.js";
const speed = 0.1;

export class Asteroid {
  constructor() {
    this.element = document.createElement("div");
    this.element.className = "asteroid";
    this.reset();
    gameArea.appendChild(this.element);
  }

  reset() {
    const gameAreaWidth = gameArea.clientWidth;
    const x = Math.random() * (gameAreaWidth - this.element.clientWidth);
    const y = -50;
    this.setPosition(x, y);
    this.speed = 2 + Math.random() * 2; // Random speed between 2 and 4
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }

  move() {
    this.y += this.speed;

    // Move horizontally with a chance of 50%
    const moveHorizontally = Math.random() < 0.5;
    if (moveHorizontally) {
      const moveRight = Math.random() < 0.5;
      this.x += moveRight ? this.speed : -this.speed;
    }

    // Check if asteroid is outside of the game area
    const asteroidRect = this.element.getBoundingClientRect();
    const gameAreaRect = gameArea.getBoundingClientRect();
    if (
      asteroidRect.left > gameAreaRect.right ||
      asteroidRect.right < gameAreaRect.left ||
      asteroidRect.top > gameAreaRect.bottom ||
      asteroidRect.bottom < gameAreaRect.top
    ) {
      this.reset();
    }
    this.setPosition(this.x, this.y);
  }
  destroy() {
    this.element.remove();
  }
  checkCollision(spaceship) {
    const asteroidRect = this.element.getBoundingClientRect();
    const spaceshipRect = spaceship.element.getBoundingClientRect();
    if (
      asteroidRect.left < spaceshipRect.right &&
      asteroidRect.right > spaceshipRect.left &&
      asteroidRect.top < spaceshipRect.bottom &&
      asteroidRect.bottom > spaceshipRect.top
    ) {
      spaceship.destroy();
      clearInterval(gameIntervalId);
      alert("Game over!");
      this.reset();
    }
    this.setPosition(this.x, this.y);
  }
}
