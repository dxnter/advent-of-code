import {
  pipe,
  match,
  map,
  or,
  lte,
  gte,
  and,
  trim,
  split,
  reduce,
  ifElse,
  inc,
} from 'ramda';

interface SectionAssignment {
  start: number;
  end: number;
}

const parseAssignmentPair = (pair: string) => {
  return pipe(
    match(/^(\d+)-(\d+),(\d+)-(\d+)$/),
    map(Number),
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
  return or(
    and(
      lte(firstPair.start, secondPair.start),
      gte(firstPair.end, secondPair.end),
    ),
    and(
      lte(secondPair.start, firstPair.start),
      gte(secondPair.end, firstPair.end),
    ),
  );
};

const pairPartiallyOverlaps = (
  firstPair: SectionAssignment,
  secondPair: SectionAssignment,
): boolean => {
  return or(
    and(
      lte(firstPair.start, secondPair.start),
      gte(firstPair.end, secondPair.start),
    ),
    and(
      lte(secondPair.start, firstPair.start),
      gte(secondPair.end, firstPair.start),
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
  return pipe(
    trim,
    split('\n'),
    reduce((totalOverlappingPairs, assignmentPair) => {
      return ifElse(
        ([pairOne, pairTwo]) => pairComparator(pairOne, pairTwo),
        () => inc(totalOverlappingPairs),
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
