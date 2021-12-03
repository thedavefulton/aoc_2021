import { readFile, shout } from './utils';

export class LifeSupport {
  _readings: string[];
  readings: string[];

  constructor(readings: string[]) {
    this._readings = readings;
    this.readings = readings;
  }

  separateReadingsByColumnIndex(columnIndex: number) {
    return this.readings.reduce(
      (acc, cur) => {
        if (cur[columnIndex] == '0') {
          acc.zeros.push(cur);
        } else {
          acc.ones.push(cur);
        }

        return acc;
      },
      { zeros: [] as string[], ones: [] as string[] }
    );
  }

  filterMaxReadingsByColumnIndex(columnIndex: number) {
    const { zeros, ones } = this.separateReadingsByColumnIndex(columnIndex);
    console.log({ zeros, ones });

    this.readings = zeros.length > ones.length ? zeros : ones;
  }

  filterMinReadingsByColumnIndex(columnIndex: number) {
    const { zeros, ones } = this.separateReadingsByColumnIndex(columnIndex);
    console.log({ zeros, ones });

    this.readings = ones.length < zeros.length ? ones : zeros;
  }

  get readingLength() {
    return this._readings[0] || 0;
  }

  get generatorRating() {
    this.readings = [...this._readings];

    for (let i = 0; i < this.readingLength; i++) {
      this.filterMaxReadingsByColumnIndex(i);

      if (this.readings.length === 1) break;
    }

    return parseInt(this.readings[0], 2);
  }

  get scrubberRating() {
    this.readings = [...this._readings];

    for (let i = 0; i < this.readingLength; i++) {
      this.filterMinReadingsByColumnIndex(i);

      if (this.readings.length === 1) break;
    }

    return parseInt(this.readings[0], 2);
  }

  get lifeSupportRating() {
    return this.generatorRating * this.scrubberRating;
  }
}

export const partTwoShout = async () => {
  const lines = await readFile();
  shout(new LifeSupport(lines).lifeSupportRating);
};
