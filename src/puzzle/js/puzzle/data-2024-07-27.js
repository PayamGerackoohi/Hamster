const puzzleData = {
  blocks: [
    {
      p: [1, 0],
      h: 3,
      v: 1,
    },
    {
      p: [5, 0],
      h: 1,
      v: 2,
    },
    {
      p: [2, 1],
      h: 1,
      v: 2,
    },
    {
      p: [3, 1],
      h: 1,
      v: 3,
    },
    {
      p: [4, 1],
      h: 1,
      v: 2,
    },
    {
      p: [2, 3],
      h: 1,
      v: 2,
    },
    {
      p: [4, 3],
      h: 2,
      v: 1,
    },
    {
      p: [3, 4],
      h: 2,
      v: 1,
    },
    {
      p: [5, 4],
      h: 1,
      v: 2,
    },
    {
      p: [1, 5],
      h: 2,
      v: 1,
    },
  ],
  key: {
    p: [0, 2],
    h: 2,
    v: 1,
  },
  operations: [
    { b: 0, h: -1 },
    { b: 9, h: -1 },
    { b: 3, v: -1 },
    { b: 5, v: 1 },
    { b: 6, h: -4 },
    { b: 1, v: 1 },
    { b: 3, v: 1 },
    { b: 0, h: 3 },
    { b: 2, v: -1 },
    { b: 5, v: -2 },
    { b: 7, h: -3 },
    { b: 5, v: 2 },
    { b: 3, v: 2 },
    { b: 4, v: 2 },
    { h: 3 },
    { b: 2, v: 1 },
    { b: 0, h: -1 },
    { b: 1, v: -1 },
    { h: 1 },
  ],
  guides: [
    [0, 0, 1, 0, -1],
    [0, 5, 1, 0, -1],
    [3, 0, 0, 1, -1],
    [2, 5, 0, 1, 1],
    [0, 3, 4, 0, -1],
    [5, 2, 0, 1, 1],
    [3, 3, 0, 1, 1],
    [3, 0, 3, 0, 1],
    [2, 0, 0, 1, -1],
    [2, 2, 0, 2, -1],
    [0, 4, 3, 0, -1],
    [2, 4, 0, 2, 1],
    [3, 4, 0, 2, 1],
    [4, 3, 0, 2, 1],
    [2, 2, 3, 0, 1],
    [2, 2, 0, 1, 1],
    [2, 0, 1, 0, -1],
    [5, 0, 0, 1, -1],
    [5, 2, 1, 0, 1],
  ],
}
