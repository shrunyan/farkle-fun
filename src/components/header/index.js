import { h } from "preact";
import { Link } from "preact-router/match";
import style from "./style";

const Header = () => (
  <header class={style.header}>
    <h1>
      <Link activeClassName={style.active} href="/">
        Farkle Fun
      </Link>
    </h1>
    <nav>
      <Link activeClassName={style.active} href="/play">
        Play
      </Link>
      <Link activeClassName={style.active} href="/rules">
        Rules
      </Link>
      <Link activeClassName={style.active} href="/about">
        About
      </Link>
    </nav>
  </header>
);

export default Header;
