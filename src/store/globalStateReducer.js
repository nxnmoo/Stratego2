import {
  AppStates,
  CHANGE_APP_STATE,
  SET_HOVERED_GRID,
  SET_SELECTED_GRID,
} from "./globalActions";

const initialState = {
  appState: AppStates.MAIN_PAGE,
  boardSizeX: 6,
  boardSizeY: 6,
  hoverX: -1,
  hoverY: -1,
  selectedX: -1,
  selectedY: -1,
};

export function globalStateReducer(state = initialState, action) {
  //console.log("globalStateReducer: " + action.type);
  switch (action.type) {
    case CHANGE_APP_STATE:
      return Object.assign({}, state, { appState: action.newAppState });
    case SET_HOVERED_GRID:
      return Object.assign({}, state, { hoverX: action.x, hoverY: action.y });
    case SET_SELECTED_GRID:
      return Object.assign({}, state, {
        selectedX: action.x,
        selectedY: action.y,
      });
    default:
      return state;
  }
}

export default globalStateReducer;
