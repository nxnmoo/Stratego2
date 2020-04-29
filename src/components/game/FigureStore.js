import React from "react";
import { Grid } from "semantic-ui-react";
import Figure from "./Figure.js";

const rowStyle = {
  paddingTop: "0px",
  paddingBottom: "5px",
};

const columnStyle = {
  paddingLeft: "0px",
  paddingRight: "5px",
};

class FigureStore extends React.Component {
  createFigureStore = () => {
    let board = [];
    for (let i = 0; i < this.props.rows; i++) {
      let grids = [];
      for (let j = 0; j < this.props.cols; j++) {
        grids.push(
          <Grid.Column style={columnStyle} key={"col_" + j}>
            <Figure id={i * this.props.cols + j} />
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
    return (
      <>
        <h4>Egységeid:</h4>
        <div style={{ height: 5 }}></div>
        <Grid columns={this.props.cols}>{this.createFigureStore()}</Grid>
      </>
    );
  }
}

export default FigureStore;
