import React from "react";
import { Container, Header, Image } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import { NavButton } from "../components/common/NavButton";
import ClipboardControl from "../components/common/ClipboardControl";
import { AppStates } from "../store/globalActions";

export function LobbyRoute() {
  const uuid = uuidv4();
  return (
    <>
      <div style={{ height: 20 }}></div>
      <div style={{ width: 400, margin: "auto" }}>
        <Container textAlign="center">
          <Header as="h1">Új játék indítása</Header>
          <div style={{ height: 20 }}></div>
          <Header as="h3">Szobaszám:</Header>
          <ClipboardControl value={uuid} />
        </Container>
        <div style={{ height: 30 }}></div>
        <h3>
          Add meg a szobaszámot a második játékosnak, aki a főmenüből tud
          csatlakozni a "Csatlakozás szobához" menüponttal. Ha csatlakozott, a
          játék automatikusan elkezdődik.
        </h3>
        <div style={{ height: 30 }}></div>
        <Image
          src={require("../images/stratego-flag.png")}
          size="tiny"
          centered
        />
        <div style={{ height: 20 }}></div>
      </div>
      <div style={{ width: 300, margin: "auto" }}>
        <Container textAlign="center">
          <NavButton
            state={AppStates.PREPARE_GAME}
            caption="Offline játék indítása"
            color="orange"
            icon="chess"
          />
          <NavButton />
        </Container>
      </div>
    </>
  );
}
