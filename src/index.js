// process.env.NODE_ENV = "development";
// require("preact/debug");

import { h, render, Component } from "preact";
import { Provider } from "unistore/preact";

import store from "./store";

import Play from "./views/play";

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Play />
      </Provider>
    );
  }
}

render(<App />, document.getElementById("game"));
