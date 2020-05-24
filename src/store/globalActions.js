export const AppStates = {
  MAIN_PAGE: "MAIN_PAGE",
  RULES_PAGE: "RULES_PAGE",
  WAITING_FOR_SECOND_PLAYER: "WAITING_FOR_SECOND_PLAYER",
  CONNECTING_TO_GAME: "CONNECTING_TO_GAME",
  PREPARE_GAME: "PREPARE_GAME",
  IN_GAME: "IN_GAME",
};

export const CHANGE_APP_STATE = "CHANGE_APP_STATE";
export const SET_HOVERED_GRID = "SET_HOVERED_GRID";
export const SET_SELECTED_GRID = "SET_SELECTED_GRID";

export function changeAppState(newAppState) {
  console.log("changeAppState: " + newAppState);
  return {
    type: CHANGE_APP_STATE,
    newAppState,
  };
}

export function setHoveredGrid(x, y) {
  return {
    type: SET_HOVERED_GRID,
    x,
    y,
  };
}

export function setSelectedGrid(x, y) {
  return {
    type: SET_SELECTED_GRID,
    x,
    y,
  };
}
