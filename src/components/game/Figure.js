import React from "react";
import { Button } from "semantic-ui-react";
import { setHoveredGrid } from "../../store/actions";
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
    const { id } = this.props;
    const hover = globalState.hoverX === id && globalState.hoverY === -2;
    const unit = gameState.figures[gameState.currentPlayer - 1][id];

    return (
      <Button
        basic={!hover === (unit === 0)}
        color={gameState.currentPlayer === 1 ? "orange" : "teal"}
        style={gridStyle}
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        {this.unitNumber(unit)}
      </Button>
    );
  }

  handleMouseEnter() {
    store.dispatch(setHoveredGrid(this.props.id, -2));
  }

  handleMouseLeave() {
    store.dispatch(setHoveredGrid(-1, -1));
  }
}

export default Figure;
