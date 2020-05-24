import React from "react";
import { connect } from "react-redux";
import { Container, Header } from "semantic-ui-react";
import { NavButton } from "../components/common/NavButton";
import Board from "../components/game/Board";
import FigureStore from "../components/game/FigureStore";
import { AppStates } from "../store/globalActions";

function SetupGameRoute(state) {
  return (
    <>
      <div style={{ height: 20 }}></div>
      <div style={{ width: 630, margin: "auto" }}>
        <Container textAlign="center">
          <Header as="h1">Előkészítő fázis</Header>
          <div style={{ height: 20 }}></div>
          <Board
            cols={state.globalState.boardSizeX}
            rows={state.globalState.boardSizeY}
          />
          <FigureStore
            cols={12}
            rows={1}
            hasHeader={true}
            pTop={5}
            playerId={1}
          />
        </Container>
      </div>
      <div style={{ width: 300, margin: "auto" }}>
        <Container textAlign="center">
          <NavButton
            state={AppStates.IN_GAME}
            enabled={
              state.gameState.figures[0].every((x) => x === 0) &&
              state.globalState.selectedX === -1
            }
            caption="Kész, indulhat a csata!"
            color="green"
            icon="check"
            marginTop="30px"
          />
          <NavButton caption="Kilépés" color="red" />
        </Container>
      </div>
    </>
  );
}

function mapState(state) {
  return state;
}

export default connect(mapState)(SetupGameRoute);
