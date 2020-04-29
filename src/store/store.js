import { createStore, combineReducers } from "redux";
import { globalStateReducer } from "./globalStateReducer";
import { gameStateReducer } from "./gameStateReducer";

const initialState = {};

const reducer = combineReducers({
  globalState: globalStateReducer,
  gameState: gameStateReducer,
});

export const store = createStore(reducer, initialState);
