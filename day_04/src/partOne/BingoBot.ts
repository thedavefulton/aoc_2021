import { BingoBoard } from './BingoBoard';
import { parse } from 'ts-jest/dist/utils/json';

export class BingoBot {
  #lines: string[];
  #chosenNumbers: number[];
  #boardInputs: number[][];
  #boards: BingoBoard[];

  constructor(lines: string[]) {
    this.#lines = lines;
    this.#chosenNumbers = [];
    this.#boardInputs = [];
    this.#boards = [];

    this.parseLines();
  }

  parseLines() {
    this.parseChosenNumbers();
    this.parseBoardInputs();
    this.buildBoards();
  }

  parseChosenNumbers() {
    this.#chosenNumbers = this.#lines[0].split(',').map((numStr) => parseInt(numStr));
  }

  parseBoardInputs() {
    this.#boardInputs = this.#lines
      .slice(1)
      .reduce((acc, cur) => {
        if (!cur) return acc;

        return [
          ...acc,
          ...cur
            .split(' ')
            .filter((numStr) => !!numStr)
            .map((numStr) => parseInt(numStr.trim())),
        ];
      }, [] as number[])
      .reduce((acc, cur, idx): number[][] => {
        if (idx % 25 === 0) {
          acc.push([cur]);

          return acc;
        }

        const boardIdx = Math.floor(idx / 25);
        acc[boardIdx].push(cur);

        return acc;
      }, [] as number[][]);
  }

  buildBoards() {
    this.#boards = this.#boardInputs.map((input) => new BingoBoard(input));
  }

  chooseWinner() {
    for (const num of this.#chosenNumbers) {
      for (const board of this.#boards) {
        board.markBoard(num);
        if (board.hasWon) {
          return { multiplier: num, board };
        }
      }
    }
  }

  chooseLastWinner() {
    const winners = [];

    for (const num of this.#chosenNumbers) {
      const losers = this.#boards.filter((board) => !board.hasWon);
      if (!losers.length) break;

      for (const board of losers) {
        board.markBoard(num);
        if (board.hasWon) {
          winners.push({ multiplier: num, board });
        }
      }
    }

    return winners.pop();
  }

  calculateScore() {
    const winner = this.chooseWinner();
    if (!winner) {
      throw new Error('no board found :(');
    }

    const { board, multiplier } = winner;

    return board.sumOfUnmarkedSpaces * multiplier;
  }

  calculateLastScore() {
    const winner = this.chooseLastWinner();
    if (!winner) {
      throw new Error('no board found :(');
    }

    const { board, multiplier } = winner;

    return board.sumOfUnmarkedSpaces * multiplier;
  }

  get chosenNumbers() {
    return this.#chosenNumbers;
  }

  get boardInputs() {
    return this.#boardInputs;
  }
}
