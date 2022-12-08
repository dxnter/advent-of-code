import { test, join, last, split, reverse, head, slice, when } from 'ramda';

const isListCommand = (command: string) => test(/\$ ls/, command);
const isChangingDirectories = (command: string) => test(/\$ cd/, command);
const shouldNavigateToBase = (command: string) => test(/\$ cd \//, command);
const shouldNavigateToParent = (command: string) => test(/\$ cd \.\./, command);
const isNotDirectoryListing = (command: string) =>
  test(/^((?!(dir)).)*$/, command);

const getAbsolutePath = (path: string[]) => `/${join('/', path)}`;

function calculateDirectorySizes(input: string): Map<string, number> {
  const directorySizes = new Map<string, number>();
  let currentDirectory: string[] = [];

  split('\n', input).forEach((line) => {
    if (isListCommand(line)) return;

    if (isChangingDirectories(line)) {
      const directory = last(split(' ', line))!;

      if (shouldNavigateToBase(line)) return (currentDirectory = []);
      if (shouldNavigateToParent(line)) return currentDirectory.pop();

      return currentDirectory.push(directory);
    }

    const path = getAbsolutePath(currentDirectory);

    if (!directorySizes.has(path)) directorySizes.set(path, 0);

    when(isNotDirectoryListing, () => {
      const fileSize = Number(head(split(' ', line)));
      directorySizes.set(path, directorySizes.get(path)! + fileSize);

      reverse(currentDirectory).forEach((directory, idx) => {
        const parentDirectory = getAbsolutePath(
          slice(0, idx, currentDirectory),
        );

        directorySizes.set(
          parentDirectory,
          directorySizes.get(parentDirectory)! + fileSize,
        );
      });
    })(line);
  });

  return directorySizes;
}

export function part1(input: string) {
  const directorySizes = calculateDirectorySizes(input);

  return [...directorySizes.values()]
    .filter((size) => size <= 100000)
    .reduce((acc, curr) => acc + curr, 0);
}

export function part2(input: string) {
  const directorySizes = calculateDirectorySizes(input);

  return [...directorySizes.values()]
    .filter((size) => size >= 30000000 - (70000000 - directorySizes.get('/')!))
    .sort((a, b) => a - b)
    .shift();
}
