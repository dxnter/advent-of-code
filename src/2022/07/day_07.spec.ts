import { describe, expect, it } from 'vitest';
import { getInputForDate } from '../../utils/index';

import { part1, part2 } from './day_07';

const EXAMPLE = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const input = getInputForDate({ year: '2022', day: '07' });

describe('2022 - Day 07', () => {
  describe.concurrent('Part 1', () => {
    it('example', () => {
      expect(part1(EXAMPLE)).to.equal(95437);
    });

    it('input', () => {
      expect(part1(input)).to.equal(1644735);
    });
  });

  describe.concurrent('Part 2', () => {
    it('example', () => {
      expect(part2(EXAMPLE)).to.equal(24933642);
    });

    it('input', () => {
      expect(part2(input)).to.equal(1300850);
    });
  });
});
