import "./style";
// import App from './components/app';

// export default App;

import { h, Component } from "preact";
import { Router } from "preact-router";

import Header from "./components/header";

// Code-splitting is automated for routes
import Home from "./routes/home";
import Play from "./routes/play";
import Rules from "./routes/rules";
import About from "./routes/about";

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
      <div id="app">
        <Header />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Play path="/play" />
          <Rules path="/rules" />
          <About path="/about" />
        </Router>
      </div>
    );
  }
}
