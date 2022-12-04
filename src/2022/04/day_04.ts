import * as R from 'ramda';

interface SectionAssignment {
  start: number;
  end: number;
}

enum Section {
  START = 'start',
  END = 'end',
}

const parseAssignmentPair = (pair: string) => {
  return R.pipe(
    R.split(','),
    R.map(
      R.pipe(R.split('-'), R.map(Number), ([start, end]) => ({ start, end })),
    ),
  )(pair) as [SectionAssignment, SectionAssignment];
};

const sectionsOverlapBy = (
  pairOrder: Section[],
  pairOne: SectionAssignment,
  pairTwo: SectionAssignment,
): boolean => {
  return R.and(
    R.lte(pairOne[pairOrder[0]], pairTwo[pairOrder[1]]),
    R.gte(pairOne[pairOrder[2]], pairTwo[pairOrder[3]]),
  );
};

const checkPairsForOverlaps = (
  pairOrder: Section[],
  firstPair: SectionAssignment,
  secondPair: SectionAssignment,
): boolean => {
  return R.or(
    sectionsOverlapBy(pairOrder, firstPair, secondPair),
    sectionsOverlapBy(pairOrder, secondPair, firstPair),
  );
};

const pairFullyOverlaps = (
  firstPair: SectionAssignment,
  secondPair: SectionAssignment,
): boolean => {
  return checkPairsForOverlaps(
    [Section.START, Section.START, Section.END, Section.END],
    firstPair,
    secondPair,
  );
};

const pairPartiallyOverlaps = (
  firstPair: SectionAssignment,
  secondPair: SectionAssignment,
): boolean => {
  return checkPairsForOverlaps(
    [Section.START, Section.START, Section.END, Section.START],
    firstPair,
    secondPair,
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
