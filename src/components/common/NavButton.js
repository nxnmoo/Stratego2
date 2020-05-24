import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { AppStates, changeAppState } from "../../store/globalActions";
import { startNewGame } from "../../store/gameActions";
import { store } from "../../store/store";

export function NavButton({
  state = AppStates.MAIN_PAGE,
  enabled = true,
  caption = "Vissza",
  color = "olive",
  icon = "angle double left",
  marginTop = "20px",
  marginBottom = "0px",
}) {
  return (
    <>
      <div style={{ height: marginTop }}></div>
      <Button
        disabled={!enabled}
        color={color}
        icon
        labelPosition="left"
        fluid
        onClick={() => {
          if (state === AppStates.PREPARE_GAME) store.dispatch(startNewGame());
          store.dispatch(changeAppState(state));
        }}
      >
        <Icon name={icon} />
        {caption}
      </Button>
      <div style={{ height: marginBottom }}></div>
    </>
  );
}
