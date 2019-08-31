import { h, Component } from "preact";
import style from "./style";

import Die from "../die";

export default class DiceBoard extends Component {
  // Note: `user` comes from the URL, courtesy of our router
  render() {
    return (
      <section class={style.DiceBoard}>
        <header>PLAYER_NAME</header>
        <main>
          <Die />
          <Die />
          <Die />
          <Die />
          <Die />
          <Die />
        </main>
        <footer>
          <button>Roll Dice</button>
        </footer>
      </section>
    );
  }
}
