import {
  GameStates,
  START_NEW_GAME,
  CHANGE_GAME_STATE,
  SET_BOARD,
  CLEAR_VALIDATION,
  SET_VALIDATION,
  NEXT_PLAYER,
} from "./gameActions";

function initialPlayers() {
  return [
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    //[1, 1, 1, 1, 1, 1],
    //[1, 1, 1, 1, 1, 1],
  ];
}

function initialUnits() {
  return [
    [7, 8, 9, 10, 11, 12],
    [1, 2, 3, 4, 5, 6],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    //[5, 5, 6, 8, 10, 12],
    //[1, 2, 2, 3, 4, 4],
  ];
}

function initialFigures() {
  return [
    [1, 2, 2, 3, 4, 4, 5, 5, 6, 8, 10, 12],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
}

const v = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

const vf = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const initialState = {
  gameState: GameStates.IN_PROGRESS,
  currentPlayer: 1,
  players: initialPlayers(),
  units: initialUnits(),
  setup: [
    [2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ],
  valid: v,
  figures: initialFigures(),
  validFigures: vf,
};

export function gameStateReducer(state = initialState, action) {
  switch (action.type) {
    case START_NEW_GAME:
      return Object.assign({}, state, {
        gameState: GameStates.IN_PROGRESS,
        currentPlayer: 1,
        players: initialPlayers(),
        units: initialUnits(),
        figures: initialFigures(),
      });
    case CHANGE_GAME_STATE:
      return Object.assign({}, state, { gameState: action.newGameState });
    case SET_BOARD:
      return Object.assign({}, state, {
        players: action.players,
        units: action.units,
        figures: action.figures,
      });
    case CLEAR_VALIDATION:
      return Object.assign({}, state, { valid: v, validFigures: vf });
    case SET_VALIDATION:
      return Object.assign({}, state, {
        valid: action.v,
        validFigures: action.vf,
      });
    case NEXT_PLAYER:
      return Object.assign({}, state, { currentPlayer: action.p });
    default:
      return state;
  }
}

export default gameStateReducer;
