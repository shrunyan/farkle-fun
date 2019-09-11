import { h } from "preact";
import { Link } from "preact-router/match";
import style from "./style";

const Header = () => (
  <header class={style.header}>
    <h1>
      <Link activeClassName={style.active} href="/">
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
