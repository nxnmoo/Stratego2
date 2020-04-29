import React from "react";
import { Container, Header, Image, Input } from "semantic-ui-react";
import { NavButton } from "../components/common/NavButton";

export function ConnectToGameRoute() {
  return (
    <>
      <div style={{ height: 20 }}></div>
      <div style={{ width: 400, margin: "auto" }}>
        <Container textAlign="center">
          <Header as="h1">Csatlakozás szobához</Header>
          <div style={{ height: 20 }}></div>
          <Header as="h3">Szobaszám:</Header>
          <Input size="huge" fluid />
        </Container>
        <div style={{ height: 30 }}></div>
        <h3>
          Add meg az első játékostól kapott szobaszámot a játék kezdéséhez!
        </h3>
        <h3>(A funkció még nem elérhető.)</h3>
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
          <NavButton />
        </Container>
      </div>
    </>
  );
}
