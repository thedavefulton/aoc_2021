import { readFile, shout } from './utils';

export function splitSteps(steps: string[]) {
  return steps.map((step) => step.split(' '));
}

export function processSteps(splitSteps: string[][]) {
  return splitSteps.reduce(
    (acc, cur) => {
      const [command, val] = cur;

      if (command === 'forward') {
        acc.distance += parseInt(val);
      } else if (command === 'down') {
        acc.depth += parseInt(val);
      } else {
        acc.depth -= parseInt(val);
      }

      return acc;
    },
    { depth: 0, distance: 0 }
  );
}

export const partOneShout = async () => {
  const lines = await readFile();
  const { depth, distance } = processSteps(splitSteps(lines));

  shout(depth * distance);
};
