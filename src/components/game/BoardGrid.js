import React from "react";
import { Button } from "semantic-ui-react";
import { setHoveredGrid } from "../../store/actions";
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
    const player = gameState.players[y][x];
    const unit =
      player > 0 && player !== gameState.currentPlayer
        ? 13
        : gameState.units[y][x];

    return (
      <Button
        basic={!hover === (player === 0)}
        color={player === 0 ? "olive" : player === 1 ? "orange" : "teal"}
        style={gridStyle}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        <div style={gridMarkerStyle}>
          <p style={{ verticalAlign: "middle" }}>{this.unitNumber(unit)}</p>
        </div>
        <div style={this.gridIconStyle(unit)}></div>
      </Button>
    );
  }

  handleMouseEnter() {
    store.dispatch(setHoveredGrid(this.props.x, this.props.y));
  }

  handleMouseLeave() {
    store.dispatch(setHoveredGrid(-1, -1));
  }
}

export default BoardGrid;
