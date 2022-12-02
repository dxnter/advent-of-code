import { default as c } from 'chalk';

export const commandErrorHelpMessage = `\n${c.bold(
  c.inverse(c.red(' ERROR ')),
)}${c.red(' Please provide a valid year and date\n')}
${c.bold('Example usage: ')}
    ${c.bold.green('generate')} 2022/01
    ${c.bold.green('generate')} 2022/25
    `;

export const yearDirectoryMissingMessage = `\n${c.bold(
  c.inverse(c.red(' ERROR ')),
)}${c.red(' No year directory found\n')}
${c.red('• Create a directory for the desired year in ./src/\n')}
${c.bold('Example: ')}
    ./src/2022/
    `;

export const maxPuzzleReachedMessage = `\n${c.bold(
  c.inverse(c.blue(' INFO ')),
)}${c.blue(
  ' There are no remaining puzzles to generate for the year. Congratulations!\n',
)}`;

export const puzzleFilesExistErrorMessage = (year: string, day: string) =>
  `\n${c.bold(c.inverse(c.red(' ERROR ')))}${c.red(
    ` The directory ${c.bold.yellow(
      `src/${year}/${day}`,
    )} already exists and contains one or more of the desired scaffolding files\n`,
  )}`;

export const puzzleFilesCreatedMessage = `\n${c.bold(
  c.inverse(c.green(' SUCCESS ')),
)}${c.green(' Puzzle files created\n')}`;
