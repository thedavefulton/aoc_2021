import { BingoBot } from './BingoBot';

interface BingoSpace {
  row: number;
  col: number;
  marked: boolean;
}

type BingoRow = BingoSpace[];

export class BingoBoard {
  #boardInput: number[];
  #board: { [key: number]: BingoSpace };
  #rowTotals: number[];
  #colTotals: number[];
  hasWon: boolean;

  constructor(boardInput: number[]) {
    this.#boardInput = boardInput;
    this.#board = {};
    this.#rowTotals = [0, 0, 0, 0, 0];
    this.#colTotals = [0, 0, 0, 0, 0];
    this.hasWon = false;

    this.buildBoard();
  }

  buildBoard() {
    this.#board = this.#boardInput.reduce((acc, cur, idx) => {
      acc[cur] = {
        row: idx % 5,
        col: Math.floor(idx / 5),
        marked: false,
      };

      return acc;
    }, {} as { [key: number]: BingoSpace });
  }

  markBoard(space: number) {
    if (!this.#boardInput.includes(space)) return;

    const { row, col } = this.#board[space];
    this.#board[space].marked = true;
    this.#rowTotals[row] += 1;
    this.#colTotals[col] += 1;

    if (this.#rowTotals[row] === 5 || this.#colTotals[col] === 5) {
      this.hasWon = true;
    }
  }

  get board() {
    return this.#board;
  }

  get sumOfUnmarkedSpaces() {
    return Object.keys(this.#board)
      .filter((key) => !this.#board[parseInt(key)].marked)
      .map((key) => parseInt(key))
      .reduce((acc, cur) => {
        acc += cur;

        return acc;
      }, 0);
  }
}
