import React from "react";
import { connect } from "react-redux";
import { Container, Header } from "semantic-ui-react";
import { NavButton } from "../components/common/NavButton";
import Board from "../components/game/Board";
import FigureStore from "../components/game/FigureStore";
import { GameStates } from "../store/gameActions";

function IngameRoute(state) {
  return (
    <>
      <div style={{ height: 20 }}></div>
      <div style={{ width: 630, margin: "auto" }}>
        <Container textAlign="center">
          <Header as="h1">{displayHeader(state)}</Header>
          <div style={{ height: 20 }}></div>
          <FigureStore cols={12} rows={1} playerId={2} />
          <Board
            cols={state.globalState.boardSizeX}
            rows={state.globalState.boardSizeY}
          />
          <FigureStore cols={12} rows={1} pTop={28} playerId={1} />
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

function displayHeader(state) {
  let header;
  if (state.gameState.gameState !== GameStates.BATTLE) {
    header =
      (state.gameState.currentPlayer === 1 ? "Az" : "A") +
      " " +
      state.gameState.currentPlayer +
      ". játékos ";
    if (state.gameState.gameState === GameStates.IN_PROGRESS) {
      header += "következik!";
    } else {
      header += "megnyerte a játékot!";
    }
  } else {
    header = "Csata!";
  }
  return header;
}

function mapState(state) {
  return state;
}

export default connect(mapState)(IngameRoute);
