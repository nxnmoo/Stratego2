import React from "react";
import { Container, Divider, Header, Icon, Image } from "semantic-ui-react";
import { NavButton } from "../components/common/NavButton";
import { AppStates } from "../store/actions";

export function MainPageRoute() {
  return (
    <>
      <div style={{ height: 20 }}></div>
      <div style={{ width: 300, margin: "auto" }}>
        <Container textAlign="center">
          <Header as="h1">Stratego</Header>
          <div style={{ height: 20 }}></div>
          <Image
            src={require("../images/stratego-general.png")}
            size="tiny"
            centered
          />
          <div style={{ height: 50 }}></div>
          <Divider horizontal>
            <Header as="h4">
              <Icon name="list" />
              Főmenü
            </Header>
          </Divider>
          <NavButton
            state={AppStates.RULES_PAGE}
            caption="Játékszabály"
            color="olive"
            icon="book"
          />
          <NavButton
            state={AppStates.WAITING_FOR_SECOND_PLAYER}
            caption="Új játék indítása"
            color="orange"
            icon="chess pawn"
          />
          <NavButton
            state={AppStates.CONNECTING_TO_GAME}
            caption="Csatlakozás szobához"
            color="teal"
            icon="chess"
          />
        </Container>
      </div>
    </>
  );
}
