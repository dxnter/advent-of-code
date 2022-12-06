import {
  pipe,
  split,
  without,
  splitWhen,
  startsWith,
  values,
  dropLast,
  times,
  join,
  concat,
  last,
  reverse,
  takeLast,
  remove,
  match,
  map,
} from 'ramda';

interface ProcedureStep {
  quantity: number;
  from: number;
  to: number;
}

type Crate = string;
type Stack = Crate[];

interface StackDiagram {
  [key: number]: Crate[];
}

function parseInput(input: string): [StackDiagram, ProcedureStep[]] {
  return pipe(
    split('\n'),
    without(['']),
    splitWhen(startsWith('move')),
    ([stackDiagram, rearrangementProcedure]) => [
      reverse(remove(-1, 1, stackDiagram)).reduce((stacks, crateRow) => {
        for (let i = 1; i < crateRow.length; i += 4) {
          if (crateRow[i].match(/\w/)) {
            const stackID = Math.ceil(i / 4);
            stacks[stackID] = stacks[stackID]
              ? [...stacks[stackID], crateRow[i]]
              : [crateRow[i]];
          }
        }
        return stacks;
      }, {} as StackDiagram),
      pipe(
        map((step: string) =>
          map(
            Number,
            remove(0, 1, match(/(?!move\s)(\d+).\w+.(\d+).\w+.(\d+)/, step)),
          ),
        ),
        map(([quantity, from, to]): ProcedureStep => ({ quantity, from, to })),
      )(rearrangementProcedure),
    ],
  )(input) as [StackDiagram, ProcedureStep[]];
}

function getTopCratePerStack(stackDiagram: StackDiagram): string {
  return pipe(
    values,
    map((crates: Stack) => last(crates)),
    join(''),
  )(stackDiagram);
}

export function part1(input: string) {
  const [stackDiagram, rearrangementProcedure] = parseInput(input);

  rearrangementProcedure.forEach(({ quantity, from, to }) => {
    times(() => {
      stackDiagram[to] = concat(stackDiagram[to], [last(stackDiagram[from])!]);
      stackDiagram[from] = dropLast(1, stackDiagram[from]);
    }, quantity);
  });

  return getTopCratePerStack(stackDiagram);
}

export function part2(input: string) {
  const [stackDiagram, rearrangementProcedure] = parseInput(input);

  rearrangementProcedure.forEach(({ quantity, from, to }) => {
    stackDiagram[to] = concat(
      stackDiagram[to],
      takeLast(quantity, stackDiagram[from]),
    );
    stackDiagram[from] = dropLast(quantity, stackDiagram[from]);
  });

  return getTopCratePerStack(stackDiagram);
}
