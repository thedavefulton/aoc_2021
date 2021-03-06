import { Line } from './Line';

test('line correctly parses input', () => {
  const verticalLine = new Line([2, 5, 2, 8]);

  expect(verticalLine.isVertical).toBe(true);

  const horizontalLine = new Line([5, 2, 8, 2]);

  expect(horizontalLine.isVertical).toBe(false);
});

test('line.points is correctly generated', () => {
  const line = new Line([0, 0, 0, 2]);
  expect(line.points[0].x).toBe(0);
  expect(line.points[0].y).toBe(0);

  expect(line.points[2].x).toBe(0);
  expect(line.points[2].y).toBe(2);
});
