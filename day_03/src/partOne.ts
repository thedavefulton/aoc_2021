import { readFile, shout } from './utils';

type Column = string[];
type Bit = '0' | '1';

export class Submarine {
  public columns: Column[];

  constructor() {
    this.columns = [];
  }

  private initColumns(numberOfColumns: number) {
    for (let i = 0; i < numberOfColumns; i++) {
      this.columns.push([]);
    }
  }

  processReading(reading: string) {
    if (!this.columns.length) this.initColumns(reading.length);

    reading.split('').reduce((acc, cur, idx) => {
      acc[idx].push(cur);
      return acc;
    }, this.columns);
  }

  findMostCommonBit(column: Column): Bit {
    const { zeroCount, oneCount } = column.reduce(
      (acc, cur) => {
        if (cur === '0') {
          acc.zeroCount += 1;
        } else {
          acc.oneCount += 1;
        }

        return acc;
      },
      { zeroCount: 0, oneCount: 0 }
    );

    return zeroCount > oneCount ? '0' : '1';
  }

  generateGammaString() {
    return this.columns
      .map((column) => this.findMostCommonBit(column))
      .join('');
  }

  generateEpsilonString() {
    return this.columns
      .map((column) => {
        const commonBit = this.findMostCommonBit(column);
        return commonBit === '0' ? '1' : '0';
      })
      .join('');
  }

  get gammaValue() {
    return parseInt(this.generateGammaString(), 2);
  }

  get epsilonValue() {
    return parseInt(this.generateEpsilonString(), 2);
  }
}

export const partOneShout = async () => {
  const sub = new Submarine();

  const lines = await readFile();
  for (const line of lines) {
    sub.processReading(line);
  }

  shout(sub.gammaValue * sub.epsilonValue);
};
