import mockDepths from "../mockDepths";
import {reduceDepthsToWindowIncreaseCount} from "../partTwo";

test('reduceDepthsToWindowIncreaseCount', () => {
  expect(reduceDepthsToWindowIncreaseCount(mockDepths)).toBe(5)
});
