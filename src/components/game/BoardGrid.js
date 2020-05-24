import React from "react";
import { Button } from "semantic-ui-react";
import {
  AppStates,
  setHoveredGrid,
  setSelectedGrid,
} from "../../store/globalActions";
import {
  GameStates,
  changeGameState,
  setBoard,
  clearValidation,
  setValidation,
  nextPlayer,
} from "../../store/gameActions";
import { store } from "../../store/store";

const gridStyle = {
  width: "105px",
  height: "105px",
};

const gridMarkerStyle = {
  display: "box",
  position: "relative",
  float: "right",
  left: "10px",
  top: "-25px",
  width: "30px",
  height: "30px",
  fontSize: "30px",
  fontStyle: "bold",
  textAlign: "right",
};

const unitImage = require("../../images/unit_icons.png");

class BoardGrid extends React.Component {
  gridIconStyle = function (id) {
    return {
      display: "box",
      position: "relative",
      left: "-10px",
      top: "10px",
      width: "62px",
      height: "62px",
      backgroundImage: `url(${unitImage})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "868px 62px",
      backgroundPosition: `-${id * 62}px 0px`,
    };
  };

  unitNumber = function (id) {
    if (id === 0) return null;
    else if (id === 1) return "Z";
    else if (id === 2) return "B";
    else if (id === 13) return "?";
    else return id - 2;
  };

  render() {
    const { globalState, gameState } = store.getState();
    const { x, y } = this.props;
    const hover = globalState.hoverX === x && globalState.hoverY === y;
    const selected = x === globalState.selectedX && y === globalState.selectedY;
    const validated = gameState.valid[y][x] === 1;
    const player = gameState.players[y][x];
    const unit =
      player > 0 &&
      player !== gameState.currentPlayer &&
      (x !== globalState.selectedX || y !== globalState.selectedY)
        ? 13
        : gameState.units[y][x];

    return (
      <Button
        basic={((player === 0 && !hover) || selected) && !validated}
        color={
          validated
            ? "red"
            : player === 0
            ? "olive"
            : player === 1
            ? "orange"
            : "teal"
        }
        style={gridStyle}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
        onClick={() => this.handleClick()}
      >
        <div style={gridMarkerStyle}>
          <p style={{ verticalAlign: "middle" }}>{this.unitNumber(unit)}</p>
        </div>
        <div style={this.gridIconStyle(unit)}></div>
      </Button>
    );
  }

  handleMouseEnter() {
    const { gameState } = store.getState();
    if (gameState.gameState !== GameStates.IN_PROGRESS) return;

    store.dispatch(setHoveredGrid(this.props.x, this.props.y));
  }

  handleMouseLeave() {
    const { gameState } = store.getState();
    if (gameState.gameState !== GameStates.IN_PROGRESS) return;

    store.dispatch(setHoveredGrid(-1, -1));
  }

  handleClick() {
    const { globalState, gameState } = store.getState();
    if (gameState.gameState !== GameStates.IN_PROGRESS) return;

    const { x, y } = this.props;
    const playerId = gameState.currentPlayer - 1;
    const sx = globalState.selectedX;
    const sy = globalState.selectedY;
    const selected = x === sx && y === sy;

    // Click when self is not selected
    if (!selected) {
      // Something else is currently selected...
      if (sx !== -1 && gameState.valid[y][x] === 1) {
        const plr = gameState.players[y][x]; // temp for swap
        const fig = gameState.units[y][x]; // temp for swap
        let players = gameState.players;
        let units = gameState.units;
        let figures = gameState.figures;
        // ...and clicked on empty grid
        if (gameState.units[y][x] === 0) {
          // That something is on the board
          if (sy >= 0) {
            players[y][x] = players[sy][sx];
            players[sy][sx] = plr;
            units[y][x] = units[sy][sx];
            units[sy][sx] = fig;
          }
          // That something is in the figure tray
          else {
            players[y][x] = playerId + 1;
            units[y][x] = figures[playerId][sx];
            figures[playerId][sx] = fig;
          }
          this.nextPlayer();
          store.dispatch(setBoard(players, units, figures));
          store.dispatch(setSelectedGrid(-1, -1));
          store.dispatch(clearValidation());
        }
        // ...and clicked on enemy grid
        else if (gameState.players[y][x] !== playerId + 1) {
          const attacker = units[sy][sx];
          const defender = units[y][x];
          console.log("Battle!");
          console.log(
            "Attacker: " + gameState.currentPlayer + ", with unit: " + attacker
          );
          console.log(
            "Defender: " + players[y][x] + ", with unit: " + defender
          );
          store.dispatch(setSelectedGrid(x, y));
          store.dispatch(clearValidation());
          store.dispatch(changeGameState(GameStates.BATTLE));
          setTimeout(
            function () {
              // Capture the flag :)
              if (defender === 1) {
                console.log("Flag captured!");
                this.captureUnit(players, units, figures, x, y, sx, sy);
              }
              // Boom! (?)
              else if (defender === 2) {
                if (attacker !== 5) {
                  console.log("Boom!");
                  this.moveUnitToTray(players, units, figures, sx, sy);
                  players[sy][sx] = 0;
                  units[sy][sx] = 0;
                } else {
                  console.log("Bomb defused.");
                  this.captureUnit(players, units, figures, x, y, sx, sy);
                }
                this.nextPlayer();
              }
              // Spy action
              else if (attacker === 3 && defender === 12) {
                console.log("Spy action!");
                this.captureUnit(players, units, figures, x, y, sx, sy);
                this.nextPlayer();
              }
              // Default rules
              else {
                if (attacker > defender) {
                  console.log("Attacker wins.");
                  this.captureUnit(players, units, figures, x, y, sx, sy);
                } else if (attacker < defender) {
                  console.log("Defender wins.");
                  this.moveUnitToTray(players, units, figures, sx, sy);
                  players[sy][sx] = 0;
                  units[sy][sx] = 0;
                } else {
                  console.log("It's an absolute slaughter, everyone died.");
                  this.captureUnit(players, units, figures, x, y, sx, sy);
                  // As an empty grid was left behind when the attacker "captured" the defender, we can have the empty grid "capture" the attacker, resulting in both players losing their units
                  this.captureUnit(players, units, figures, x, y, sx, sy);
                }
                this.nextPlayer();
              }
              store.dispatch(setBoard(players, units, figures));
              store.dispatch(setSelectedGrid(-1, -1));
              store.dispatch(
                changeGameState(
                  defender === 1 ? GameStates.ENDED : GameStates.IN_PROGRESS
                )
              );
            }.bind(this),
            3000
          );
        }
      }
      // Nothing is currently selected AND self is a figure of the current player -> select self
      else if (gameState.players[y][x] === playerId + 1) {
        store.dispatch(setSelectedGrid(x, y));
        let v, vf;
        if (globalState.appState === AppStates.PREPARE_GAME) {
          v = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            gameState.units[4].map((g) => (g === 0 ? 1 : 0)),
            gameState.units[5].map((g) => (g === 0 ? 1 : 0)),
          ];
          vf = gameState.figures[playerId].map((g) => (g === 0 ? 1 : 0));
        } else if (globalState.appState === AppStates.IN_GAME) {
          v = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ];
          let xx, yy;
          // Movement rules
          switch (gameState.units[y][x]) {
            // Flag, bomb
            case 1:
            case 2:
              break;
            // Scout
            case 4:
              for (xx = x - 1; xx >= 0; xx--) {
                if (gameState.players[y][xx] !== playerId + 1) v[y][xx] = 1;
                if (gameState.units[y][xx] !== 0) break;
              }
              for (xx = x + 1; xx < globalState.boardSizeX; xx++) {
                if (gameState.players[y][xx] !== playerId + 1) v[y][xx] = 1;
                if (gameState.units[y][xx] !== 0) break;
              }
              for (yy = y - 1; yy >= 0; yy--) {
                if (gameState.players[yy][x] !== playerId + 1) v[yy][x] = 1;
                if (gameState.units[yy][x] !== 0) break;
              }
              for (yy = y + 1; yy < globalState.boardSizeY; yy++) {
                if (gameState.players[yy][x] !== playerId + 1) v[yy][x] = 1;
                if (gameState.units[yy][x] !== 0) break;
              }
              break;
            // All other units
            default:
              for (yy = 0; yy < globalState.boardSizeY; yy++) {
                for (xx = 0; xx < globalState.boardSizeX; xx++) {
                  if (
                    (xx === x && Math.abs(yy - y) === 1) ||
                    (yy === y && Math.abs(xx - x) === 1)
                  ) {
                    if (gameState.players[yy][xx] !== playerId + 1)
                      v[yy][xx] = 1;
                  }
                }
              }
              break;
          }
          vf = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        store.dispatch(setValidation(v, vf));
      }
    }
    // Click on self when currently selected -> deselect
    else {
      store.dispatch(setSelectedGrid(-1, -1));
      store.dispatch(clearValidation());
    }
  }

  captureUnit = function (players, units, figures, x, y, sx, sy) {
    this.moveUnitToTray(players, units, figures, x, y);
    players[y][x] = players[sy][sx];
    players[sy][sx] = 0;
    units[y][x] = units[sy][sx];
    units[sy][sx] = 0;
  };

  moveUnitToTray = function (players, units, figures, x, y) {
    for (let i = 0; i < 12; i++) {
      if (figures[players[y][x] - 1][i] === 0) {
        figures[players[y][x] - 1][i] = units[y][x];
        break;
      }
    }
  };

  nextPlayer = function () {
    const { globalState, gameState } = store.getState();
    if (globalState.appState === AppStates.IN_GAME) {
      let p = gameState.currentPlayer + 1;
      if (p > 2) p = 1;
      store.dispatch(nextPlayer(p));
    }
  };
}

export default BoardGrid;
