const opens = ["[", "{", "(", "<"];
const openCloseMap: { [key: string]: string } = {
  "[": "]",
  "{": "}",
  "(": ")",
  "<": ">",
};
export const closesPointsMap: { [key: string]: number } = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

export class SyntaxChecker {
  line: string;
  error: string;
  stack!: string[];
  remainder: string;

  constructor(line: string) {
    this.line = line;
    this.error = "";
    this.remainder = "";

    this.check();
    if (!this.error) {
      this.complete();
    }
  }

  complete() {
    this.remainder = this.stack
      .map((open) => openCloseMap[open])
      .reverse()
      .join("");
    // console.log(this.remainder);
  }

  check() {
    const openStack: string[] = [];
    for (const char of this.line.split("")) {
      if (opens.includes(char)) {
        openStack.push(char);
      } else {
        const cur = openStack[openStack.length - 1];
        if (openCloseMap[cur] === char) {
          openStack.pop();
        } else {
          this.error = char;
          break;
        }
      }
    }
    this.stack = openStack;
  }

  get score() {
    return this.remainder
      .split("")
      .map((char) => closesPointsMap[char])
      .reduce((acc, cur) => acc * 5 + cur, 0);
  }
}
