import { and, uniq, equals, slice, add } from 'ramda';

function findMessageStartForN(input: string, n: number): number {
  return input.split('').reduce((processed, char, idx, buffer) => {
    const window = slice(idx, idx + n, buffer);

    return and(equals(window, uniq(window)), processed === 0)
      ? add(processed, idx + n)
      : processed;
  }, 0);
}

export function part1(input: string) {
  return findMessageStartForN(input, 4);
}

export function part2(input: string) {
  return findMessageStartForN(input, 14);
}
