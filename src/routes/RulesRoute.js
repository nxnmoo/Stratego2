import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import { NavButton } from "../components/common/NavButton";

export function RulesRoute() {
  return (
    <>
      <div style={{ height: 20 }}></div>
      <div style={{ width: 630, margin: "auto" }}>
        <Container textAlign="center">
          <Header as="h1">Játékszabály</Header>
          <div style={{ height: 20 }}></div>
          <p>A Stratego hivatalos játékszabálya:</p>
          <Segment placeholder>
            <embed
              src={require("../files/Stratego.pdf")}
              type="application/pdf"
              width="600px"
              height="600px"
            />
          </Segment>
        </Container>
      </div>
      <div style={{ width: 300, margin: "auto" }}>
        <Container textAlign="center">
          <NavButton />
        </Container>
      </div>
    </>
  );
}
