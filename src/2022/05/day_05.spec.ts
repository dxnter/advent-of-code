import { describe, expect, it } from 'vitest';
import { getInputForDate } from '../../utils/index';

import { part1, part2 } from './day_05';

const EXAMPLE = `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const input = getInputForDate({ year: '2022', day: '05' });

describe('2022 - Day 05', () => {
  describe.concurrent('Part 1', () => {
    it('example', () => {
      expect(part1(EXAMPLE)).to.equal('CMZ');
    });

    it('input', () => {
      expect(part1(input)).to.equal('VRWBSFZWM');
    });
  });

  describe.concurrent('Part 2', () => {
    it('example', () => {
      expect(part2(EXAMPLE)).to.equal('MCD');
    });

    it('input', () => {
      expect(part2(input)).to.equal('RBTWJWMCF');
    });
  });
});
