import fs from 'fs';
import path from 'path';

interface PuzzleInputDate {
  year: string;
  day: string;
}

export const getInputForDate = ({ year, day }: PuzzleInputDate): string => {
  const inputPath = path.resolve(`src/${year}/${day}/input.txt`);
  return fs.existsSync(inputPath) ? fs.readFileSync(inputPath, 'utf8') : '';
};
