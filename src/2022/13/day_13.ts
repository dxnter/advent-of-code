import { isNil, is, all, max, sum, product } from 'ramda';

type Packet = number[] | number;

function comparePackets(left: Packet, right: Packet): boolean | undefined {
  if (all(is(Number))([left, right])) {
    return left > right ? false : left < right ? true : undefined;
  }

  if (is(Array, left) !== is(Array, right)) {
    return comparePackets(
      is(Array, left) ? left : [left],
      is(Array, right) ? right : [right],
    );
  }

  if (is(Array, left) && is(Array, right)) {
    for (let i = 0, end = max(left.length, right.length); i < end; i++) {
      if (isNil(left[i])) return true;
      if (isNil(right[i])) return false;
      const result = comparePackets(left[i], right[i]);
      if (!isNil(result)) return result;
    }
  }
  return undefined;
}

function findDecoderKey(input: string, ...extraPackets: Packet[][]): number {
  const packets = [
    ...extraPackets,
    ...input
      .trim()
      .split('\n')
      .filter(Boolean)
      .map((packet) => JSON.parse(packet)),
  ].sort((left, right) => {
    const result = comparePackets(left, right);
    return result === undefined ? 0 : result ? -1 : 1;
  });

  return product(
    extraPackets.map(
      (packet: Packet[]) =>
        1 +
        packets.findIndex((p) => JSON.stringify(p) === JSON.stringify(packet)),
    ),
  );
}

export function part1(input: string) {
  const packets = input
    .trim()
    .split('\n\n')
    .map((pair) => pair.split('\n').map((packet) => JSON.parse(packet)));

  return sum(
    packets.map(([left, right], idx) => {
      return comparePackets(left, right) ? idx + 1 : 0;
    }),
  );
}

export function part2(input: string) {
  return findDecoderKey(input, [[2]], [[6]]);
}
