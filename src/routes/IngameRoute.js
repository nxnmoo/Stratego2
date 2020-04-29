import React from "react";
import { connect } from "react-redux";
import { Container, Header } from "semantic-ui-react";
import { NavButton } from "../components/common/NavButton";
import Board from "../components/game/Board";

function IngameRoute(state) {
  return (
    <>
      <div style={{ height: 20 }}></div>
      <div style={{ width: 630, margin: "auto" }}>
        <Container textAlign="center">
          <Header as="h1">Játék</Header>
          <div style={{ height: 20 }}></div>
          <Board
            cols={state.globalState.boardSizeX}
            rows={state.globalState.boardSizeY}
          />
        </Container>
      </div>
      <div style={{ width: 300, margin: "auto" }}>
        <Container textAlign="center">
          <NavButton caption="Kilépés" color="red" marginTop="30px" />
        </Container>
      </div>
    </>
  );
}

function mapState(state) {
  return state;
}

export default connect(mapState)(IngameRoute);
