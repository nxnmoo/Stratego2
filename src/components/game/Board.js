import React from "react";
import { Grid } from "semantic-ui-react";
import BoardGrid from "./BoardGrid.js";

const rowStyle = {
  paddingTop: "0px",
  paddingBottom: "5px",
};

const columnStyle = {
  paddingLeft: "0px",
  paddingRight: "5px",
};

class Board extends React.Component {
  createBoard = () => {
    let board = [];
    for (let i = 0; i < this.props.rows; i++) {
      let grids = [];
      for (let j = 0; j < this.props.cols; j++) {
        grids.push(
          <Grid.Column style={columnStyle} key={"col_" + j}>
            <BoardGrid x={j} y={i} />
          </Grid.Column>
        );
      }
      board.push(
        <Grid.Row style={rowStyle} key={"row_" + i}>
          {grids}
        </Grid.Row>
      );
    }
    return board;
  };

  render() {
    return <Grid columns={this.props.cols}>{this.createBoard()}</Grid>;
  }
}

export default Board;
