import {readFile, shout} from './utils';

export function splitWindows(windows: number[]) {
    return [windows.slice(0,3), windows.slice(1)]
}

export function compareWindows(a: number[], b: number[]): -1 | 0 | 1 {
    const sumA = sumWindow(a);
    const sumB = sumWindow(b);

    if (sumA > sumB) return 1;
    if (sumA < sumB) return -1;

    return 0
}

export function sumWindow(window: number[]): number {
    return window.reduce((acc, cur) => acc + cur, 0)
}

export function reduceDepthsToWindowIncreaseCount(depths: number[]): number {
    return depths.reduce((acc, cur, idx, arr): number => {
        const windows = arr.slice(idx, idx+4)

        if (windows.length < 4) return acc;

        const [a, b] = splitWindows(windows);

        if (compareWindows(a, b) === -1) return acc + 1;

        return acc;
    }, 0)
}

export const partTwoShout = async () => {
    const lines = await readFile()
     shout(reduceDepthsToWindowIncreaseCount(lines.map(l=>parseInt(l))))
};
