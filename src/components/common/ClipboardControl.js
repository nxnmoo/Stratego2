import React from "react";
import { Button, Input } from "semantic-ui-react";

class ClipboardControl extends React.Component {
  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand("copy");
    e.target.focus();
  };

  render() {
    return (
      <>
        <Input
          ref={(textarea) => (this.textArea = textarea)}
          size="huge"
          value={this.props.value}
          readOnly={true}
          transparent
          fluid
        />
        {document.queryCommandSupported("copy") && (
          <>
            <br />
            <Button onClick={this.copyToClipboard}>Másolás vágólapra</Button>
          </>
        )}
      </>
    );
  }
}

export default ClipboardControl;
