import { h, Component } from "preact";

import style from "./style";
export default class About extends Component {
  render() {
    return (
      <div class={style.about}>
        <h1>About</h1>
        <p>
          Weekend project by{" "}
          <a href="https://twitter.com/stuartrunyan">@stuartrunyan</a>
        </p>
        <p>Because I can't all ways remember to bring my dice to the bar. </p>

        <h2>Built With</h2>
        <ul>
          <li>
            <a href="https://preactjs.com/">Preact</a>: Because it is small and
            mobile friendly.
          </li>
          <li>
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">
              <abbr title="Cascading Style Sheets">CSS</abbr>
            </a>
            : I'm old school.
          </li>
        </ul>
      </div>
    );
  }
}
