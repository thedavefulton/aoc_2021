const chalk = require("chalk");
import { Segment } from "../index";

type SegmentMap = { [key in Segment]: Segment | null };

export class Display {
  inputs: string[];
  outputs: string[];
  digits: { [key: string]: string };
  segments: SegmentMap;
  numberStringList: string[];

  twoOrFive!: string[];
  sixOrNine!: string[];

  constructor([inputs, outputs]: string[]) {
    this.inputs = inputs
      .split(" ")
      .map((input) => [...input.split("")].sort().join(" "));
    this.outputs = outputs
      .split(" ")
      .map((output) => [...output.split("")].sort().join(" "));
    this.digits = this.initDigits();
    this.segments = this.initSegments();
    this.numberStringList = this.initNumberStringList();

    this.decodeInputs();
    this.decodeOutputs();
    // console.log(chalk.bgGreen("inputs"));
    // console.log(chalk.green(this.inputs));
    // console.log(chalk.bgRed("outputs"));
    // console.log(chalk.red(this.outputs));
    // console.log(chalk.bgYellow("segments"));
    // console.log(chalk.yellow(Object.entries(this.segments)));
  }

  decodeOutputs() {
    const outputNumbers = this.outputs.map((output) =>
      this.decodeOutput(output)
    );
    // console.log(chalk.red(outputNumbers));
  }

  decodeOutput(output: string): string {
    const _output = [...output.split("")].sort().join("");
    // @ts-ignore
    return Object.entries(this.digits).find(
      ([, value]) => _output === value
    )[0][1] as string;
  }

  initDigits() {
    return {
      _0: "",
      _1: "",
      _2: "",
      _3: "",
      _4: "",
      _5: "",
      _6: "",
      _7: "",
      _8: "",
      _9: "",
    };
  }

  initSegments(): SegmentMap {
    return {
      a: null,
      b: null,
      c: null,
      d: null,
      e: null,
      f: null,
      g: null,
    };
  }

  initNumberStringList() {
    return ["", "", "", "", "", "", "", "", "", ""];
  }

  decodeInputs() {
    this.setUniqueDigits();
    this.phaseOne();
    this.phaseTwo();
    this.orderDigits();
  }

  orderDigits() {
    this.digits = Object.entries(this.digits)
      .map(([key, value]) => [key, value.split("").sort().join("")])
      .reduce((acc, cur) => {
        // @ts-ignore
        acc[cur[0]] = cur[1];
        return acc;
      }, {});
  }

  overlapCount(a: string, b: string) {
    return a.split("").reduce((acc, cur) => {
      if (b.includes(cur)) acc += 1;

      return acc;
    }, 0);
  }

  getInputOfLength(length: number) {
    return this.inputs.find((input) => input.length === length) as string;
  }

  setUniqueDigits() {
    this.digits._1 = this.getInputOfLength(2);
    this.digits._4 = this.getInputOfLength(4);
    this.digits._7 = this.getInputOfLength(3);
    this.digits._8 = this.getInputOfLength(7);
  }

  // 1 & 7 are unique and comparing them
  // gives us segment "a"
  stepOne() {
    this.segments.a = this.digits._7
      .split("")
      .filter((char) => !this.digits._1.includes(char))[0] as Segment;
  }

  // 2 & 5 can be used to determine
  // what 3 is
  stepTwo() {
    this.setTwoOrFive();
    this.setThree();
  }

  // 6 & 9 can be used to determine
  // what 0 is
  stepThree() {
    this.setSixOrNine();
    this.setZero();
  }

  // 0 & 3 can be used to determine
  // what "d" is, which can itself
  // be used to determine "g"
  stepFour() {
    this.setD();
    this.setG();
  }

  // We now have ["a", "d", "g"]
  // and [0, 1, 3, 4, 7, 8]
  phaseOne() {
    this.stepOne();
    this.stepTwo();
    this.stepThree();
    this.stepFour();
  }

  // Filtering 1 & "d" from 4 can
  // determine "b"
  stepFive() {
    this.setB();
  }

  // Using "a", "b", "d", "g" we can determine
  // 5 & 2, which can be used to determine
  // "f"
  stepSix() {
    const [x, y] = this.twoOrFive;
    const { a, b, d, g } = this.segments;

    this.digits._5 = this.overlapCount(x, [a, b, d, g].join("")) === 4 ? x : y;
    this.digits._2 = this.digits._5 === x ? y : x;

    this.segments.f = this.digits._5
      .split("")
      .find((char) => ![a, b, d, g].includes(char as Segment)) as Segment;
  }
  // We now have ["a", "b", "d", "f", "g"]
  // and [0, 1, 2, 3, 4, 5, 7, 8]

  // Using ["b", "d", "f"] & 4 we can determine
  // what "c" is
  stepSeven() {
    this.setC();
    this.setE();
    this.setSixAndNine();
  }

  phaseTwo() {
    this.stepFive();
    this.stepSix();
    this.stepSeven();
  }

  setC() {
    const { b, d, f } = this.segments;
    this.segments.c = this.digits._4
      .split("")
      .find((char) => ![b, d, f].includes(char as Segment)) as Segment;
  }

  setE() {
    const { a, b, c, d, f, g } = this.segments;
    this.segments.e = this.digits._8
      .split("")
      .find((char) => ![a, b, c, d, f, g].includes(char as Segment)) as Segment;
  }
  // We now have ["a", "b", "c", "d", "e", "f", "g"]
  // and [0, 1, 2, 3, 4, 5, 7, 8]

  // Finally, set 6 & 9
  setSixAndNine() {
    const [x, y] = this.sixOrNine;
    const { a, b, d, e, f, g } = this.segments;
    const sixString = [a, b, d, e, f, g].join("");
    this.digits._6 = x === sixString ? x : y;
    this.digits._9 = x === this.digits._6 ? y : x;
  }
  // 2 & 5 and 6 & 9 can be determined by
  // filtering out 3 & 0, respectively
  findOverlappingTwoOfThreeOfLength(length: number, overlap: number) {
    const [a, b, c] = this.inputs.filter((input) => input.length === length);
    return this.overlapCount(a, b) === overlap
      ? [a, b]
      : this.overlapCount(b, c) === overlap
      ? [b, c]
      : [c, a];
  }

  findOneNotLikeTheOthers(length: number, others: string[]) {
    return this.inputs
      .filter((input) => input.length === length)
      .find((option) => !others.includes(option));
  }

  setTwoOrFive() {
    this.twoOrFive = this.findOverlappingTwoOfThreeOfLength(5, 3);
  }

  setThree() {
    this.digits._3 = this.findOneNotLikeTheOthers(5, this.twoOrFive) as string;
  }

  setSixOrNine() {
    this.sixOrNine = this.findOverlappingTwoOfThreeOfLength(6, 5);
  }

  setZero() {
    this.digits._0 = this.findOneNotLikeTheOthers(6, this.sixOrNine) as string;
  }

  setD() {
    const { _0, _3 } = this.digits;
    this.segments.d = _3
      .split("")
      .find((char) => !_0.includes(char)) as Segment;
  }

  setG() {
    const [x, y, z] = this.inputs.filter((input) => input.length === 5);
    const { a, d } = this.segments;

    this.segments.g = x
      .split("")
      .filter((char) => y.includes(char) && z.includes(char))
      .filter((char) => char !== a && char && d)[0] as Segment;
  }

  setB() {
    const { d } = this.segments;
    const { _1, _4 } = this.digits;
    this.segments.b = _4
      .split("")
      .find((char) => ![d, ..._1.split("")].includes(char)) as Segment;
  }
}
