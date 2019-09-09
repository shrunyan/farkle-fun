// process.env.NODE_ENV = "development";
// require("preact/debug");

import { h, Component } from "preact";
import { Router } from "preact-router";
import { Provider } from "unistore/preact";

import store from "./store";

// Code-splitting is automated for routes
import Home from "./routes/home";
import Play from "./routes/play";
import Rules from "./routes/rules";
import About from "./routes/about";

import Header from "./components/header";

import style from "./style";
export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = evt => {
    this.currentUrl = evt.url;
  };

  render() {
    return (
      <Provider store={store}>
        <div id="app">
          <Header />
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <Play path="/play" />
            <Rules path="/rules" />
            <About path="/about" />
          </Router>
        </div>
      </Provider>
    );
  }
}
