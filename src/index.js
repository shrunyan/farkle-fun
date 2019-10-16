// process.env.NODE_ENV = "development";
// require("preact/debug");

import { h, Component } from "preact";
import { Provider } from "unistore/preact";

import store from "./store";

import Play from "./views/play";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div id="game">
          <Play />
        </div>
      </Provider>
    );
  }
}
