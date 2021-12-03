import { Submarine } from '../partOne';

export const mockReadings = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
];

function initSub() {
  const sub = new Submarine();
  for (const reading of mockReadings) {
    sub.processReading(reading);
  }

  return sub;
}

test('processReading', () => {
  const sub = new Submarine();
  sub.processReading(mockReadings[0]);
  expect(sub.columns).toStrictEqual([['0'], ['0'], ['1'], ['0'], ['0']]);

  sub.processReading(mockReadings[1]);
  expect(sub.columns).toStrictEqual([
    ['0', '1'],
    ['0', '1'],
    ['1', '1'],
    ['0', '1'],
    ['0', '0'],
  ]);
});

test('findMostCommonBit', () => {
  const sub = initSub();

  expect(sub.findMostCommonBit(sub.columns[0])).toBe('1');
});

test('generateGammaString', () => {
  const sub = initSub();

  expect(sub.generateGammaString()).toBe('10110');
});

test('generateEpsilonString', () => {
  const sub = initSub();

  expect(sub.generateEpsilonString()).toBe('01001');
});

test('get gammaValue', () => {
  const sub = initSub();

  expect(sub.gammaValue).toBe(22);
});

test('get epsilonValue', () => {
  const sub = initSub();

  expect(sub.epsilonValue).toBe(9);
});
