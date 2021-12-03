import { readFile, shout } from './utils';

type AimCommand = 'up' | 'down';
type Command = 'forward' | AimCommand;
type Step = [Command, number];

class Submarine {
  private aim: number;
  private depth: number;
  private distance: number;

  constructor() {
    this.aim = 0;
    this.depth = 0;
    this.distance = 0;
  }

  processAimStep(val: number) {
    this.aim += val;
  }

  processForwardStep(val: number) {
    this.distance += val;
    this.depth += this.aim * val;
  }

  processStep([command, val]: Step) {
    if (command === 'forward') {
      this.processForwardStep(val);
    } else {
      val = command === 'down' ? val : -1 * val;
      this.processAimStep(val);
    }
  }

  getProduct() {
    return this.depth * this.distance;
  }
}

export const partTwoShout = async () => {
  const lines = await readFile();
  const sub = new Submarine();

  // @ts-ignore
  lines
    .map((line) => line.split(' '))
    .map(([a, b]) => [a, parseInt(b)])
    .reduce((acc: Submarine, cur: Step) => {
      sub.processStep(cur);
      return sub;
    }, sub);

  shout(sub.getProduct());
};
