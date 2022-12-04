import * as R from 'ramda';

interface SectionAssignment {
  start: number;
  end: number;
}

const parseAssignmentPair = (pair: string): SectionAssignment[] => {
  return R.pipe(
    R.split(','),
    R.map(
      R.pipe(R.split('-'), R.map(Number), ([start, end]) => ({ start, end })),
    ),
  )(pair);
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
      const [pairOne, pairTwo] = parseAssignmentPair(assignmentPair);

      return R.ifElse(
        ([pairOne, pairTwo]) => pairComparator(pairOne, pairTwo),
        () => R.inc(totalOverlappingPairs),
        () => totalOverlappingPairs,
      )([pairOne, pairTwo]);
    }, 0),
  )(input);
};

export function part1(input: string) {
  return countSectionPairOverlaps(input, pairFullyOverlaps);
}

export function part2(input: string) {
  return countSectionPairOverlaps(input, pairPartiallyOverlaps);
}
