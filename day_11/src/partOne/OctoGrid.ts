import { Octopus } from "./Octopus";
import { parseInt } from "lodash";

export class OctoGrid {
  octos: Octopus[][];
  flashes: number;

  constructor(lines: string[]) {
    this.flashes = 0;
    this.octos = this.mapLinesToOctos(lines);
    const iterations = 100;
    for (let i = 0; i < iterations; i++) {
      this.incrementGrid();
    }

    console.log(
      this.octos.map((row) => {
        return row.map((octo) => octo.energy);
      }),
      this.flashes
    );
  }

  incrementGrid() {
    this.octos = this.octos.map((row) => {
      return row.map((octo) => {
        this.incrementOcto(octo);
        return octo;
      });
    });
    this.resetOctos();
  }

  resetOctos() {
    for (const row of this.octos) {
      for (const octo of row) {
        octo.reset();
      }
    }
  }

  incrementOcto(octo: Octopus) {
    if (octo.flashed) return;
    octo.increment();
    if (octo.flashed) {
      this.flashes += 1;
      const surroundingOctos = this.findSurroundingOctos(octo);
      for (const o of Object.values(surroundingOctos)) {
        if (o) this.incrementOcto(o);
      }
    }
  }

  mapLinesToOctos(lines: string[]) {
    return lines.map((line, lineIndex) => {
      return line.split("").map((char, charIndex) => {
        return new Octopus(charIndex, lineIndex, parseInt(char));
      });
    });
  }

  findSurroundingOctos(octo: Octopus) {
    const adjacentOctos = this.findAdjacentOctos(octo);
    const diagonalOctos = this.findDiagonalOctos(adjacentOctos);

    return { ...adjacentOctos, ...diagonalOctos };
  }

  findDiagonalOctos(adjacentOctos: { [key: string]: Octopus | null }) {
    const { above, below, left, right } = adjacentOctos;

    return {
      aboveLeft: above && left ? this.octos[above.y][left.x] : null,
      aboveRight: above && right ? this.octos[above.y][right.x] : null,
      belowLeft: below && left ? this.octos[below.y][left.x] : null,
      belowRight: below && right ? this.octos[below.y][right.x] : null,
    };
  }

  findAdjacentOctos(octo: Octopus) {
    const [x, y] = octo.coords;

    const above = y === 0 ? null : this.octos[y - 1][x];
    const below = y === this.height - 1 ? null : this.octos[y + 1][x];
    const left = x === 0 ? null : this.octos[y][x - 1];
    const right = x === this.length - 1 ? null : this.octos[y][x + 1];

    return { above, below, left, right };
  }

  get length() {
    return this.octos[0].length;
  }

  get height() {
    return this.octos.length;
  }
}
