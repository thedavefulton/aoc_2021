const chalk = require("chalk");
interface NumberStringMap {
  _0: string;
  _1: string;
  _2: string;
  _3: string;
  _4: string;
  _5: string;
  _6: string;
  _7: string;
  _8: string;
  _9: string;
}

interface SegmentLetterMap {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
  g: string;
}

interface InputLengthMap {
  _2: string;
  _3: string;
  _4: string;
  _5: string[];
  _6: string[];
  _7: string;
}

export class Display {
  inputs: string[];
  outputs: string[];
  segmentLetterMap: SegmentLetterMap;
  numberStringMap: NumberStringMap;
  inputLengthMap!: InputLengthMap;

  constructor([inputs, outputs]: string[][]) {
    this.inputs = inputs.map(this.orderNumberString);
    this.outputs = outputs.map(this.orderNumberString);
    this.segmentLetterMap = { a: "", b: "", c: "", d: "", e: "", f: "", g: "" };
    this.numberStringMap = {
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
    this.setInputLengthMap();
    this.setUniqueNumbers();

    this.printKeyValue("inputs: ", this.inputs);
    this.printKeyValue("outputs: ", this.outputs);

    this.printCurrentStatus();

    this.decodeInputs();
  }

  setUniqueNumbers() {
    this.numberStringMap._1 = this.inputLengthMap._2;
    this.numberStringMap._4 = this.inputLengthMap._4;
    this.numberStringMap._7 = this.inputLengthMap._3;
    this.numberStringMap._8 = this.inputLengthMap._7;
  }

  setInputLengthMap() {
    this.inputLengthMap = this.inputs.reduce(
      (acc, cur) => {
        if (cur.length === 2) {
          acc._2 = cur;
        } else if (cur.length === 3) {
          acc._3 = cur;
        } else if (cur.length === 4) {
          acc._4 = cur;
        } else if (cur.length === 5) {
          acc._5.push(cur);
        } else if (cur.length === 6) {
          acc._6.push(cur);
        } else {
          acc._7 = cur;
        }

        return acc;
      },
      { _2: "", _3: "", _4: "", _5: [], _6: [], _7: "" } as InputLengthMap
    );
  }

  get output() {
    return this.outputs
      .map((output) => this.decodeOutput(output))
      .map((output) => output[0])
      .map((output) => output.split("_").join(""))
      .join("");
  }

  decodeOutput(output: string) {
    return Object.entries(this.numberStringMap).filter(
      (entry) => entry[1] === output
    )[0];
  }

  decodeInputs() {
    this.setA();
    this.set3();
    this.setB();
    this.setD();
    this.setG();
    this.set5andF();
    this.set2();
    this.setC();
    this.setE();
    this.set0and6and9();
  }

  set0and6and9() {
    const { a, b, c, d, e, f, g } = this.segmentLetterMap;
    const lengthSixes = this.inputLengthMap._6;

    const zeroTestString = [a, b, c, e, f, g].sort().join("");
    const sixTestString = [a, b, d, e, f, g].sort().join("");
    const nineTestString = [a, b, c, d, f, g].sort().join("");
    this.numberStringMap._0 = lengthSixes.filter(
      (option) => option === zeroTestString
    )[0];
    this.numberStringMap._6 = lengthSixes.filter(
      (option) => option === sixTestString
    )[0];
    this.numberStringMap._9 = lengthSixes.filter(
      (option) => option === nineTestString
    )[0];

    this.printCurrentStatus();
  }
  //
  setE() {
    const { _8 } = this.numberStringMap;
    const { a, b, c, d, f, g } = this.segmentLetterMap;
    this.segmentLetterMap.e = _8
      .split("")
      .filter((char) => ![a, b, c, d, f, g].includes(char))[0];

    this.printCurrentStatus();
  }
  //
  setC() {
    const { _1 } = this.numberStringMap;
    const { a, b, d, f, g } = this.segmentLetterMap;
    this.segmentLetterMap.c = _1
      .split("")
      .filter((char) => ![a, b, d, f, g].includes(char))[0];

    this.printCurrentStatus();
  }
  //
  set2() {
    const { _3, _5 } = this.numberStringMap;
    const [x, y, z] = this.inputLengthMap._5;

    this.numberStringMap._2 = [x, y, z].filter(
      (option) => option !== _3 && option !== _5
    )[0];

    this.printCurrentStatus();
  }
  //
  set5andF() {
    const { a, b, d, g } = this.segmentLetterMap;
    const testString = [a, b, d, g].join("");
    const [x, y, z] = this.inputLengthMap._5;
    this.numberStringMap._5 =
      this.getOverlap(x, testString) === 4
        ? x
        : this.getOverlap(y, testString) === 4
        ? y
        : z;

    this.segmentLetterMap.f = this.numberStringMap._5
      .split("")
      .filter((char) => !testString.includes(char))[0];
    this.printCurrentStatus();
  }
  //
  setG() {
    const { _1, _3 } = this.numberStringMap;
    const { a, d } = this.segmentLetterMap;
    this.segmentLetterMap.g = _3
      .split("")
      .filter((char) => ![a, d, ..._1.split("")].includes(char))[0];

    this.printCurrentStatus();
  }
  //
  setD() {
    const { _1, _4 } = this.numberStringMap;
    const { b } = this.segmentLetterMap;
    this.segmentLetterMap.d = _4
      .split("")
      .filter((char) => ![b, ..._1.split("")].includes(char))[0];

    this.printCurrentStatus();
  }
  //
  setB() {
    const { _3, _4 } = this.numberStringMap;
    this.segmentLetterMap.b = _4
      .split("")
      .filter((char) => !_3.includes(char))[0];

    this.printCurrentStatus();
  }
  //
  set3() {
    const [x, y, z] = this.inputLengthMap._5;
    this.numberStringMap._3 =
      this.getOverlap(x, y) === 3 ? z : this.getOverlap(y, z) === 3 ? x : y;

    this.printCurrentStatus();
  }
  //
  setA() {
    const { _1, _7 } = this.numberStringMap;

    this.segmentLetterMap.a = _7
      .split("")
      .filter((char) => !_1.includes(char))[0];

    this.printCurrentStatus();
  }

  orderNumberString(numberString: string) {
    return [...numberString.split("")].sort().join("");
  }

  printCurrentStatus() {
    this.printNumberStringList();
    this.printSegmentLetterList();
  }

  printSegmentLetterList() {
    this.printKeyValue(
      "segmentLetterList: ",
      Object.entries(this.segmentLetterMap)
    );
  }

  printNumberStringList() {
    this.printKeyValue(
      "numberStringList: ",
      Object.entries(this.numberStringMap)
    );
  }

  printKeyValue(key: any, value: any) {
    console.log(chalk.red(key), chalk.bgRed(value));
  }

  getOverlap(a: string, b: string) {
    return a.split("").filter((char) => b.includes(char)).length;
  }
}
