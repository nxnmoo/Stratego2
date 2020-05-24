export const GameStates = {
  IN_PROGRESS: "IN_PROGRESS",
  BATTLE: "BATTLE",
  ENDED: "ENDED",
};

export const START_NEW_GAME = "START_NEW_GAME";
export const CHANGE_GAME_STATE = "CHANGE_GAME_STATE";
export const SET_BOARD = "SET_BOARD";
export const CLEAR_VALIDATION = "CLEAR_VALIDATION";
export const SET_VALIDATION = "SET_VALIDATION";
export const NEXT_PLAYER = "NEXT_PLAYER";

export function startNewGame() {
  return {
    type: START_NEW_GAME,
  };
}

export function changeGameState(newGameState) {
  console.log("changeGameState: " + newGameState);
  return {
    type: CHANGE_GAME_STATE,
    newGameState,
  };
}

export function setBoard(players, units, figures) {
  return {
    type: SET_BOARD,
    players,
    units,
    figures,
  };
}

export function clearValidation() {
  return {
    type: CLEAR_VALIDATION,
  };
}

export function setValidation(v, vf) {
  return {
    type: SET_VALIDATION,
    v,
    vf,
  };
}

export function nextPlayer(p) {
  return {
    type: NEXT_PLAYER,
    p,
  };
}
