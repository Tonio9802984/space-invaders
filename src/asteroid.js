import { gameArea } from "./index.js";
const speed = 1.5;
export class Asteroid {
  constructor(x, y) {
    this.element = document.createElement("div");
    this.element.className = "asteroid";
    this.setPosition(x, y);
    gameArea.appendChild(this.element);
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }

  move() {
    this.x -= speed;
    if (this.x < -50) {
      const gameAreaWidth = gameArea.clientWidth;
      const gameAreaHeight = gameArea.clientHeight;
      const x = Math.random() < 0.5 ? -50 : gameAreaWidth + 50;
      const y = Math.random() * gameAreaHeight;
      this.setPosition(x, y);
    } else if (this.x > gameArea.clientWidth + 50) {
      const gameAreaHeight = gameArea.clientHeight;
      const x = -50;
      const y = Math.random() * gameAreaHeight;
      this.setPosition(x, y);
    } else if (this.y > gameArea.clientHeight + 50) {
      const gameAreaWidth = gameArea.clientWidth;
      const x = Math.random() * gameAreaWidth;
      const y = -50;
      this.setPosition(x, y);
    }
    this.setPosition(this.x, this.y);
  }
}
