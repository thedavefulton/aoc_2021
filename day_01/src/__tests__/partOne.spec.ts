import {reduceDepthsToIncreaseCount} from "../partOne";
import mockDepths from "../mockDepths";
import {compareWindows, splitWindows, sumWindow} from "../partTwo";

test('reduceDepthsToIncreaseCount', () => {
    expect(reduceDepthsToIncreaseCount(mockDepths)).toBe(7)
})

test('splitWindow', () => {
    expect(splitWindows([0,1,2,3])).toStrictEqual([[0,1,2],[1,2,3]])
})

test('sumWindow', () => {
    expect(sumWindow([1,2,3])).toBe(6)
})

test('compareWindows', () => {
    expect(compareWindows([0,1,2], [1,2,3])).toBe(-1)
    expect(compareWindows([0,1,2], [0,1,2])).toBe(0)
    expect(compareWindows([1,2,3], [0,1,2])).toBe(1)
})
