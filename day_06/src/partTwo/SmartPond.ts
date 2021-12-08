import { range } from "../utils";

export class SmartPond {
  fishList: number[];
  days: number;

  constructor(fish: number[], days = 5) {
    this.fishList = this.initFishList();
    this.seedPond(fish);

    this.days = days;
    this.agePond();
  }

  initFishList() {
    return range(0, 8).map((idx) => 0);
  }

  seedPond(fish: number[]) {
    this.fishList = fish.reduce(
      (acc, cur) => {
        acc[cur] += 1;
        return acc;
      },
      [...this.fishList]
    );
  }

  ageOneDay() {
    const [_0, _1, _2, _3, _4, _5, _6, _7, _8] = this.fishList;
    return [_1, _2, _3, _4, _5, _6, _7 + _0, _8, _0];
  }

  agePond() {
    for (let i = 0; i < this.days; i++) {
      this.fishList = this.ageOneDay();
    }
  }

  get fishCount() {
    return this.fishList.reduce((acc, cur) => acc + cur, 0);
  }
}
