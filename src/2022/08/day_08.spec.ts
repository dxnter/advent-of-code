import { describe, expect, it } from 'vitest';
import { getInputForDate } from '../../utils/index';

import { part1, part2 } from './day_08';

const EXAMPLE = `30373
25512
65332
33549
35390
`;

const input = getInputForDate({ year: '2022', day: '08' });

describe('2022 - Day 08', () => {
  describe.concurrent('Part 1', () => {
    it('example', () => {
      expect(part1(EXAMPLE)).to.equal(21);
    });

    it('input', () => {
      expect(part1(input)).to.equal(1736);
    });
  });

  describe.concurrent('Part 2', () => {
    it('example', () => {
      expect(part2(EXAMPLE)).to.equal(8);
    });

    it('input', () => {
      expect(part2(input)).to.equal(268800);
    });
  });
});
