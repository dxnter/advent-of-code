interface ShapeDetail {
  type: string;
  score: number;
}

type OpponentEncryptedShape = 'A' | 'B' | 'C';
type PlayerEncryptedShape = 'X' | 'Y' | 'Z';

type RoundScore = (shape: ShapeDetail) => number;
