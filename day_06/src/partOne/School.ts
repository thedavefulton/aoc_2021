export class School {
  fish: number[];
  days: number;

  constructor(fish: number[], days = 1) {
    this.fish = fish;
    this.days = days;

    this.ageAllDays();
  }

  ageFish(fish: number) {
    return fish > 0 ? fish - 1 : 6;
  }

  ageOneDay() {
    const newborns: number[] = [];
    const agedFish = this.fish.map((fish) => {
      if (fish === 0) newborns.push(8);

      return this.ageFish(fish);
    });

    return [...agedFish, ...newborns];
  }

  ageAllDays() {
    for (let i = 0; i < this.days; i++) {
      this.fish = this.ageOneDay();
    }
  }
}
