import { processSteps, splitSteps } from '../partOne';

export const mockSubSteps = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2'];

test('splitSteps', () => {
  expect(splitSteps(mockSubSteps)).toStrictEqual([
    ['forward', '5'],
    ['down', '5'],
    ['forward', '8'],
    ['up', '3'],
    ['down', '8'],
    ['forward', '2'],
  ]);
});

test('processSteps', () => {
  expect(processSteps(splitSteps(mockSubSteps))).toStrictEqual({ depth: 10, distance: 15 });
});
