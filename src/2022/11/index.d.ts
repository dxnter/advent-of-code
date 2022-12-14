interface Operation {
  operator: string;
  value?: number;
}

interface Test {
  divisor: number;
  throw: {
    onSuccess: number;
    onFail: number;
  };
}
