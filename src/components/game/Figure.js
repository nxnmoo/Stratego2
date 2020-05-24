import React from "react";
import { Button } from "semantic-ui-react";
import {
  AppStates,
  setHoveredGrid,
  setSelectedGrid,
} from "../../store/globalActions";
import {
  setBoard,
  clearValidation,
  setValidation,
} from "../../store/gameActions";
import { store } from "../../store/store";

const gridStyle = {
  width: "50px",
  height: "50px",
};

class Figure extends React.Component {
  unitNumber = function (id) {
    if (id === 0) return null;
    else if (id === 1) return "Z";
    else if (id === 2) return "B";
    else if (id === 13) return "?";
    else return id - 2;
  };

  render() {
    const { globalState, gameState } = store.getState();
    const { id, playerId } = this.props;
    const hover =
      globalState.hoverX === id && globalState.hoverY === -4 + playerId;
    const selected =
      globalState.selectedX === id && globalState.selectedY === -4 + playerId;
    const validated = gameState.validFigures[id] === 1;
    const unit = gameState.figures[playerId - 1][id];

    return (
      <Button
        disabled={globalState.appState !== AppStates.PREPARE_GAME}
        basic={((unit === 0 && !hover) || selected) && !validated}
        color={validated ? "red" : playerId === 1 ? "orange" : "teal"}
        style={gridStyle}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
        onClick={() => this.handleClick()}
      >
        {this.unitNumber(unit)}
      </Button>
    );
  }

  handleMouseEnter() {
    const { globalState } = store.getState();
    if (globalState.appState !== AppStates.PREPARE_GAME) return;

    const { playerId } = this.props;
    store.dispatch(setHoveredGrid(this.props.id, -4 + playerId));
  }

  handleMouseLeave() {
    const { globalState } = store.getState();
    if (globalState.appState !== AppStates.PREPARE_GAME) return;

    store.dispatch(setHoveredGrid(-1, -1));
  }

  handleClick() {
    const { globalState, gameState } = store.getState();
    if (globalState.appState !== AppStates.PREPARE_GAME) return;

    const { id, playerId } = this.props;
    const p = playerId - 1;
    const sx = globalState.selectedX;
    const sy = globalState.selectedY;
    const selected = sx === id && sy === -4 + playerId;

    // Click when self is not selected
    if (!selected) {
      // Something else is currently selected and clicked on empty grid
      if (sx !== -1 && gameState.figures[p][id] === 0) {
        // Placement is now constrained to empty grids, but swapping mechanics are ready on demand
        if (gameState.validFigures[id] === 1) {
          const fig = gameState.figures[p][id]; // temp for swap
          let players = gameState.players;
          let units = gameState.units;
          let figures = gameState.figures;
          // That something is on the board
          if (sy !== -4 + playerId) {
            players[sy][sx] = figures[p][id] === 0 ? 0 : playerId;
            figures[p][id] = units[sy][sx];
            units[sy][sx] = fig;
          }
          // That something is in the figure tray
          else {
            figures[p][id] = figures[p][sx];
            figures[p][sx] = fig;
          }
          store.dispatch(setBoard(players, units, figures));
          // Anyhow, deselect after operation
          store.dispatch(setSelectedGrid(-1, -1));
          store.dispatch(clearValidation());
        }
      }
      // Select figure
      else {
        store.dispatch(setSelectedGrid(id, -4 + playerId));
        const v = [
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          gameState.units[4].map((g) => (g === 0 ? 1 : 0)),
          gameState.units[5].map((g) => (g === 0 ? 1 : 0)),
        ];
        const vf = gameState.figures[p].map((g) => (g === 0 ? 1 : 0));
        store.dispatch(setValidation(v, vf));
      }
    }
    // Click on self when currently selected -> deselect
    else {
      store.dispatch(setSelectedGrid(-1, -1));
      store.dispatch(clearValidation());
    }
  }
}

export default Figure;
