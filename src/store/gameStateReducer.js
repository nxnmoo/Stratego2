const initialState = {
  currentPlayer: 1,
  players: [
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ],
  units: [
    [7, 8, 9, 10, 11, 12],
    [1, 2, 3, 4, 5, 6],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
  ],
  figures: [
    [1, 3, 6, 7, 7, 9, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
};

export function gameStateReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default gameStateReducer;
