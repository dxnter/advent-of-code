import { describe, expect, it } from 'vitest';
import { clone } from 'ramda';

import { part1, part2, Monkey } from './day_11';
import input from './input';

const EXAMPLE = [
  new Monkey(
    0,
    [79, 98],
    { operator: '*', value: 19 },
    {
      divisor: 23,
      throw: { onSuccess: 2, onFail: 3 },
    },
  ),
  new Monkey(
    1,
    [54, 65, 75, 74],
    { operator: '+', value: 6 },
    {
      divisor: 19,
      throw: { onSuccess: 2, onFail: 0 },
    },
  ),
  new Monkey(
    2,
    [79, 60, 97],
    { operator: '^2' },
    {
      divisor: 13,
      throw: { onSuccess: 1, onFail: 3 },
    },
  ),
  new Monkey(
    3,
    [74],
    { operator: '+', value: 3 },
    {
      divisor: 17,
      throw: { onSuccess: 0, onFail: 1 },
    },
  ),
];

describe('2022 - Day 11', () => {
  describe.concurrent('Part 1', () => {
    it('example', () => {
      expect(part1(clone(EXAMPLE))).to.equal(10605);
    });

    it('input', () => {
      expect(part1(clone(input))).to.equal(58322);
    });
  });

  describe.concurrent('Part 2', () => {
    it('example', () => {
      expect(part2(EXAMPLE)).to.equal(2713310158);
    });

    it('input', () => {
      expect(part2(input)).to.equal(13937702909);
    });
  });
});
