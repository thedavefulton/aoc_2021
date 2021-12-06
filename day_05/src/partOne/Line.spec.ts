import { Line } from './Line';

test('line correctly parses input', () => {
  const verticalLine = new Line('2,5 -> 2,8');

  expect(verticalLine.isVertical).toBe(true);
  expect(verticalLine.isHorizontal).toBe(false);

  const horizontalLine = new Line('5,2 -> 8,2');

  expect(horizontalLine.isHorizontal).toBe(true);
  expect(horizontalLine.isVertical).toBe(false);

  const diagonalLine = new Line('5,2 -> 2,5');

  expect(diagonalLine.isHorizontal).toBe(false);
  expect(diagonalLine.isVertical).toBe(false);
});
