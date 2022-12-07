import fs from 'fs';

import {
  findLatestYear,
  findNextPuzzleDay,
  isInvalidDate,
  scaffoldPuzzleFiles,
} from './utils.js';
import {
  yearDirectoryMissingMessage,
  maxPuzzleReachedMessage,
  commandErrorHelpMessage,
  puzzleFilesCreatedTestInfoMessage,
} from './output.js';

(() => {
  let year;
  let day;

  const dateArg = process.argv.slice(2).at(0);

  if (!dateArg) {
    year = findLatestYear();

    day = findNextPuzzleDay(year);

    if (!year) {
      console.log(yearDirectoryMissingMessage);
      process.exit(1);
    }

    if (Number(day) >= 26) {
      console.log(maxPuzzleReachedMessage);
      process.exit();
    }
  }

  if (!year || !day) {
    [year, day] = dateArg!.split('/');
  }

  if (isInvalidDate(year, day)) {
    console.log(commandErrorHelpMessage);
    process.exit(1);
  }

  const yearDirectory = `${process.cwd()}/src/${year}`;
  const fullDateDirectory = `${process.cwd()}/src/${year}/${day}`;
  if (!fs.existsSync(fullDateDirectory)) {
    if (!fs.existsSync(yearDirectory)) {
      fs.mkdirSync(yearDirectory);
    }
    fs.mkdirSync(fullDateDirectory);
  }

  scaffoldPuzzleFiles(fullDateDirectory, year, day);

  console.log(puzzleFilesCreatedTestInfoMessage(year, day));
})();
