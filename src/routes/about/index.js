import { h, Component } from "preact";
import { Link } from "preact-router/match";

import style from "./style";

export default class About extends Component {
  render() {
    return (
      <div class={style.profile}>
        <h1>About</h1>
        <p>
          Weekend project by{" "}
          <Link href="https://twitter.com/stuartrunyan">@stuartrunyan</Link>
        </p>
        <p>Because I can't all ways remember to bring my dice to the bar. </p>

        <h2>Built With</h2>
        <ul>
          <li>
            <Link href="https://preactjs.com/">Preact</Link>: Because it is
            small and mobile friendly.
          </li>
          <li>
            <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS">
              <abbr title="Cascading Style Sheets">CSS</abbr>
            </Link>
            : I'm old school.
          </li>
        </ul>
      </div>
    );
  }
}
