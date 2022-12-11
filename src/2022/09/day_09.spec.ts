import { describe, expect, it } from 'vitest';
import { getInputForDate } from '../../utils/index';

import { part1, part2 } from './day_09';

const EXAMPLE = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const EXAMPLE2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

const input = getInputForDate({ year: '2022', day: '09' });

describe('2022 - Day 09', () => {
  describe.concurrent('Part 1', () => {
    it('example', () => {
      expect(part1(EXAMPLE)).to.equal(13);
    });

    it('input', () => {
      expect(part1(input)).to.equal(6269);
    });
  });

  describe.concurrent('Part 2', () => {
    it('example', () => {
      expect(part2(EXAMPLE2)).to.equal(36);
    });

    it('input', () => {
      expect(part2(input)).to.equal(2557);
    });
  });
});
