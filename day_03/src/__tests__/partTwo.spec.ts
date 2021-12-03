import { mockReadings } from './partOne.spec';
import { LifeSupport } from '../partTwo';

test('loadReadings', async () => {
  const lifeSupport = new LifeSupport(mockReadings);

  expect(lifeSupport.readings).toStrictEqual(mockReadings);
});

test('filterMaxReadingsByColumnIndex', () => {
  const lifeSupport = new LifeSupport(mockReadings);

  lifeSupport.filterMaxReadingsByColumnIndex(0);

  expect(lifeSupport.readings).toStrictEqual([
    '11110',
    '10110',
    '10111',
    '10101',
    '11100',
    '10000',
    '11001',
  ]);
});
test('filterMinReadingsByColumnIndex', () => {
  const lifeSupport = new LifeSupport(mockReadings);

  lifeSupport.filterMinReadingsByColumnIndex(0);

  expect(lifeSupport.readings).toStrictEqual([
    '00100',
    '01111',
    '00111',
    '00010',
    '01010',
  ]);
});

test('get generatorRating', () => {
  const lifeSupport = new LifeSupport(mockReadings);

  expect(lifeSupport.generatorRating).toBe(23);
});

test('get scrubberRating', () => {
  const lifeSupport = new LifeSupport(mockReadings);

  expect(lifeSupport.scrubberRating).toBe(10);
});
