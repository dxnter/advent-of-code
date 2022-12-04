import * as R from 'ramda';

interface SectionAssignment {
  start: number;
  end: number;
}

const parseAssignmentPair = (pair: string) => {
  return R.pipe(
    R.match(/^(\d+)-(\d+),(\d+)-(\d+)$/),
    R.map(Number),
    ([, sectionOneStart, sectionOneEnd, sectionTwoStart, sectionTwoEnd]) => [
      { start: sectionOneStart, end: sectionOneEnd },
      { start: sectionTwoStart, end: sectionTwoEnd },
    ],
  )(pair) as [SectionAssignment, SectionAssignment];
};

const pairFullyOverlaps = (
  firstPair: SectionAssignment,
  secondPair: SectionAssignment,
): boolean => {
  return R.or(
    R.and(
      R.lte(firstPair.start, secondPair.start),
      R.gte(firstPair.end, secondPair.end),
    ),
    R.and(
      R.lte(secondPair.start, firstPair.start),
      R.gte(secondPair.end, firstPair.end),
    ),
  );
};

const pairPartiallyOverlaps = (
  firstPair: SectionAssignment,
  secondPair: SectionAssignment,
): boolean => {
  return R.or(
    R.and(
      R.lte(firstPair.start, secondPair.start),
      R.gte(firstPair.end, secondPair.start),
    ),
    R.and(
      R.lte(secondPair.start, firstPair.start),
      R.gte(secondPair.end, firstPair.start),
    ),
  );
};

const countSectionPairOverlaps = (
  input: string,
  pairComparator: (
    pairOne: SectionAssignment,
    pairTwo: SectionAssignment,
  ) => boolean,
): number => {
  return R.pipe(
    R.trim,
    R.split('\n'),
    R.reduce((totalOverlappingPairs, assignmentPair) => {
      return R.ifElse(
        ([pairOne, pairTwo]) => pairComparator(pairOne, pairTwo),
        () => R.inc(totalOverlappingPairs),
        () => totalOverlappingPairs,
      )([...parseAssignmentPair(assignmentPair)]);
    }, 0),
  )(input);
};

export function part1(input: string) {
  return countSectionPairOverlaps(input, pairFullyOverlaps);
}

export function part2(input: string) {
  return countSectionPairOverlaps(input, pairPartiallyOverlaps);
}
