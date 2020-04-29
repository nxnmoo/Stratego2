import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { AppStates, changeAppState } from "../../store/actions";
import { store } from "../../store/store";

export function NavButton({
  state = AppStates.MAIN_PAGE,
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
        color={color}
        icon
        labelPosition="left"
        fluid
        onClick={() => store.dispatch(changeAppState(state))}
      >
        <Icon name={icon} />
        {caption}
      </Button>
      <div style={{ height: marginBottom }}></div>
    </>
  );
}
