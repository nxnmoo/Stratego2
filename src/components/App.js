import React from "react";
import { connect } from "react-redux";
import { MainPageRoute } from "../routes/MainPageRoute";
import { RulesRoute } from "../routes/RulesRoute";
import { LobbyRoute } from "../routes/LobbyRoute";
import { ConnectToGameRoute } from "../routes/ConnectToGameRoute";
import SetupGameRoute from "../routes/SetupGameRoute";
import IngameRoute from "../routes/IngameRoute";
import { AppStates } from "../store/actions";

const bkgImage = require("../images/background.jpg");
const containerStyle = {
  width: "100%",
  height: "938px",
  backgroundImage: `url(${bkgImage})`,
  backgroundSize: "cover",
  overflow: "hidden",
};

function App(state) {
  //console.log("appState: " + state.globalState.appState);
  return <div style={containerStyle}>{getMainRoute(state)}</div>;
}

function getMainRoute(state) {
  switch (state.globalState.appState) {
    case AppStates.MAIN_PAGE:
      return <MainPageRoute />;
    case AppStates.RULES_PAGE:
      return <RulesRoute />;
    case AppStates.WAITING_FOR_SECOND_PLAYER:
      return <LobbyRoute />;
    case AppStates.CONNECTING_TO_GAME:
      return <ConnectToGameRoute />;
    case AppStates.PREPARE_GAME:
      return <SetupGameRoute />;
    case AppStates.IN_GAME:
      return <IngameRoute />;
    default:
      return <div>Hoppá! Valami hiba történt...</div>;
  }
}

function mapState(state) {
  return state;
}

export default connect(mapState)(App);
