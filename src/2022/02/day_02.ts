const ROCK: ShapeDetail = {
  type: 'rock',
  score: 1,
};

const PAPER: ShapeDetail = {
  type: 'paper',
  score: 2,
};

const SCISSORS: ShapeDetail = {
  type: 'scissors',
  score: 3,
};

const OpponentShapesMap: Record<OpponentEncryptedShape, ShapeDetail> = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
};

const PlayerShapesMap: Record<PlayerEncryptedShape, ShapeDetail> = {
  X: ROCK,
  Y: PAPER,
  Z: SCISSORS,
};

const WinningScenarios: Readonly<ShapeDetail[][]> = [
  [PAPER, SCISSORS],
  [SCISSORS, ROCK],
  [ROCK, PAPER],
];

enum RoundOutcome {
  Lose = 'Lose',
  Draw = 'Draw',
  Win = 'Win',
}

enum ExpectedRoundOutcome {
  Lose = 'X',
  Draw = 'Y',
  Win = 'Z',
}

const scoreCalculator: Record<RoundOutcome, RoundScore> = {
  [RoundOutcome.Lose]: (shape) => shape.score + 0,
  [RoundOutcome.Draw]: (shape) => shape.score + 3,
  [RoundOutcome.Win]: (shape) => shape.score + 6,
};

function isWinningPair(shapePair: [ShapeDetail, ShapeDetail]): boolean {
  return WinningScenarios.some(([losingShape, winningShape]) => {
    return [losingShape, winningShape].every(
      (shape, index) => shape.type === shapePair[index].type,
    );
  });
}

function calculateRoundScore(
  opponentShape: ShapeDetail,
  playerShape: ShapeDetail,
) {
  if (opponentShape.type === playerShape.type) {
    return scoreCalculator.Draw(playerShape);
  }

  if (isWinningPair([opponentShape, playerShape])) {
    return scoreCalculator.Win(playerShape);
  }

  return scoreCalculator.Lose(playerShape);
}

function shapeForExpectedOutcome(
  opponentShape: ShapeDetail,
  playerEncryptedShape: PlayerEncryptedShape,
): ShapeDetail {
  if (playerEncryptedShape === ExpectedRoundOutcome.Draw) {
    return opponentShape;
  }

  if (playerEncryptedShape === ExpectedRoundOutcome.Win) {
    return WinningScenarios.find(([losingShape]) => {
      return losingShape.type === opponentShape.type;
    })!.at(1)!;
  }

  return WinningScenarios.find(([, winningShape]) => {
    return winningShape.type === opponentShape.type;
  })!.at(0)!;
}

export function part1(input: string) {
  const playerScoresPerRound = input
    .trim()
    .split('\n')
    .map((round) => {
      const [opponentShape, playerShape] = round.split(' ') as [
        OpponentEncryptedShape,
        PlayerEncryptedShape,
      ];
      return calculateRoundScore(
        OpponentShapesMap[opponentShape],
        PlayerShapesMap[playerShape],
      );
    });
  return playerScoresPerRound.reduce((sum, round) => sum + round);
}

export function part2(input: string) {
  const playerScoresPerRound = input
    .trim()
    .split('\n')
    .map((round) => {
      const [opponentShape, playerShape] = round.split(' ') as [
        OpponentEncryptedShape,
        PlayerEncryptedShape,
      ];

      const expectedPlayerShape = shapeForExpectedOutcome(
        OpponentShapesMap[opponentShape],
        playerShape,
      );

      return calculateRoundScore(
        OpponentShapesMap[opponentShape],
        expectedPlayerShape,
      );
    });
  return playerScoresPerRound.reduce((sum, round) => sum + round);
}
