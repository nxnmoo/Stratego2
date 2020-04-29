import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import App from "./components/App";
import { store } from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
