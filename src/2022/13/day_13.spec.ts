import { describe, expect, it } from 'vitest';
import { getInputForDate } from '../../utils/index';

import { part1, part2 } from './day_13';

const EXAMPLE = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

const input = getInputForDate({ year: '2022', day: '13' });

describe('2022 - Day 13', () => {
  describe.concurrent('Part 1', () => {
    it('example', () => {
      expect(part1(EXAMPLE)).to.equal(13);
    });

    it('input', () => {
      expect(part1(input)).to.equal(5208);
    });
  });

  describe.concurrent('Part 2', () => {
    it('example', () => {
      expect(part2(EXAMPLE)).to.equal(140);
    });

    it('input', () => {
      expect(part2(input)).to.equal(25792);
    });
  });
});
