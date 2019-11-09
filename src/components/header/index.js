import { h } from "preact";
import { Link } from "preact-router/match";

import style from "./style";
const Header = () => (
  <header class={style.header}>
    <h1>
      <Link activeClassName={style.active} href="/">
        <img
          src="/assets/icons/white/streamline-icon-board-game-dice-1@24x24.png"
          alt="Add a player"
        />
        farkle.fun
      </Link>
    </h1>

    <nav>
      <div class={style.Icon}>
        <div></div>
      </div>
      <div class={style.Links}>
        <Link activeClassName={style.active} href="/play">
          Play
        </Link>
        <Link activeClassName={style.active} href="/rules">
          Rules
        </Link>
        <Link activeClassName={style.active} href="/about">
          About
        </Link>
      </div>
    </nav>
  </header>
);

export default Header;
