import fs from 'fs';
import { default as c } from 'chalk';

import { createTemplate } from './template.js';
import {
  puzzleFilesExistErrorMessage,
  puzzleFilesCreatedMessage,
} from './output.js';

const VALID_YEARS = /^\d{4}$/;
const VALID_DATES = /^0[1-9]|1[0-9]|2[0-5]$/;

export const findLatestYear = (): string => {
  const latestYear = Math.max(
    ...fs
      .readdirSync(`${process.cwd()}/src`)
      .filter((dir) => VALID_YEARS.test(dir))
      .map(Number),
  );

  if (!isFinite(latestYear)) return '';

  return latestYear.toString();
};

export const isInvalidDate = (year: string, day: string): boolean => {
  return !VALID_YEARS.test(year) || !VALID_DATES.test(day);
};

export const findNextPuzzleDay = (year: string): string => {
  const nextPuzzleDay =
    Math.max(
      ...fs
        .readdirSync(`${process.cwd()}/src/${year}`)
        .filter((dir) => VALID_DATES.test(dir))
        .map(Number),
    ) + 1;

  if (!isFinite(nextPuzzleDay)) return '01';

  return nextPuzzleDay.toString().padStart(2, '0');
};

export const fileExists = (path: string) => (file: string) =>
  fs.existsSync(`${path}/${file}`);

export const writeToPath =
  (path: string) => (fileName: string, content: string) => {
    const filePath = `${path}/${fileName}`;

    fs.writeFile(filePath, content, (err) => {
      if (err) throw err;
      console.log(`${c.green('+ ')}`, filePath);
      return true;
    });
  };

export function scaffoldPuzzleFiles(
  dateDirectory: string,
  year: string,
  day: string,
) {
  const files = {
    solution: `day_${day}.ts`,
    test: `day_${day}.spec.ts`,
    benchmark: `day_${day}.bench.ts`,
    input: 'input.txt',
  };

  const writeFile = writeToPath(dateDirectory);
  const isFileMissing = (file: string) => !fileExists(dateDirectory)(file);

  const allFilesAreMissing = Object.values(files)
    .map(isFileMissing)
    .every((file) => file);

  if (!allFilesAreMissing) {
    console.log(puzzleFilesExistErrorMessage(year, day));
    process.exit(1);
  }

  console.log(puzzleFilesCreatedMessage);
  Object.entries(files).forEach(([type, fileName]) => {
    writeFile(fileName, createTemplate[type](year, day));
  });
}
