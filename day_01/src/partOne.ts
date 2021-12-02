import {readFile, shout} from './utils';

export function reduceDepthsToIncreaseCount(depths: number[]): number {
    return depths.reduce((acc, cur, index, arr): number => {
        if (index === 0) return acc;

        if (cur > arr[index-1]) return acc + 1;

        return acc;
    }, 0)
}

export async function partOneMain() {
    const lines = await readFile();
    shout(reduceDepthsToIncreaseCount(lines.map(l => parseInt(l))))
}
