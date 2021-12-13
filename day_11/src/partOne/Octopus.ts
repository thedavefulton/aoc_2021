export class Octopus {
  x: number;
  y: number;
  energy: number;
  flashed: boolean;

  constructor(x: number, y: number, energy: number) {
    this.x = x;
    this.y = y;
    this.energy = energy;
    this.flashed = false;
  }

  increment() {
    if (this.flashed) return;
    if (this.energy === 9) {
      this.energy = 0;
      this.flashed = true;
      return;
    }
    this.energy += 1;
  }

  reset() {
    this.flashed = false;
  }

  get coords() {
    return [this.x, this.y];
  }

  get coordString() {
    return `${this.x}:${this.y}`;
  }
}

Octopus.prototype.toString = function () {
  return `x: ${this.x}, y: ${this.y}, energy: ${this.energy}, flashed: ${this.flashed}`;
};
