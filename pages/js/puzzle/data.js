/* 2024-07-28 */ const puzzleData = { blocks: [ { p: [0, 0], h: 2, v: 1, }, { p: [4, 0], h: 1, v: 3, }, { p: [5, 0], h: 1, v: 2, }, { p: [1, 1], h: 1, v: 2, }, { p: [2, 1], h: 2, v: 1, }, { p: [2, 3], h: 1, v: 2, }, { p: [4, 3], h: 2, v: 1, }, { p: [0, 4], h: 2, v: 1, }, { p: [3, 4], h: 1, v: 2, }, { p: [0, 5], h: 3, v: 1, }, ], key: { p: [2, 2], h: 2, v: 1, }, operations: [ { b: 0, h: 2 }, { b: 3, v: -1 }, { h: -2 }, { b: 5, v: -1 }, { b: 8, v: -2 }, { b: 7, h: 4 }, { b: 9, h: 3 }, { b: 5, v: 2 }, { b: 8, v: 1 }, { h: 2 }, { b: 3, v: 4 }, { b: 0, h: -2 }, { b: 4, h: -2 }, { h: -2 }, { b: 5, v: -4 }, { b: 8, v: -3 }, { h: 2 }, { b: 6, h: -2 }, { b: 3, v: -2 }, { b: 7, h: -2 }, { b: 9, h: -2 }, { b: 1, v: 3 }, { h: 2 }, ], guides: [ [2, 0, 2, 0, 1], [1, 0, 0, 1, -1], [0, 2, 2, 0, -1], [2, 2, 0, 1, -1], [3, 2, 0, 2, -1], [2, 4, 4, 0, 1], [3, 5, 3, 0, 1], [2, 4, 0, 2, 1], [3, 4, 0, 1, 1], [2, 2, 2, 0, 1], [1, 2, 0, 4, 1], [0, 0, 2, 0, -1], [0, 1, 2, 0, -1], [0, 2, 2, 0, -1], [2, 0, 0, 4, -1], [3, 0, 0, 3, -1], [2, 2, 2, 0, 1], [2, 3, 2, 0, -1], [1, 2, 0, 2, -1], [2, 4, 2, 0, -1], [1, 5, 2, 0, -1], [4, 3, 0, 3, 1], [4, 2, 2, 0, 1], ], }