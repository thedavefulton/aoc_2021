import { Point } from './Point';

test('point parses input', () => {
  const point = new Point('2,5');

  expect(point.x).toBe(2);
  expect(point.y).toBe(5);
});
