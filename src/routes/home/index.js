import { h } from "preact";
import { Link } from "preact-router/match";

import style from "./style";

const Home = () => (
  <div class={style.home}>
    <h2 class={style.title}>A dice game</h2>
    <h3 class={style.tagline}>Find a few friends and get started.</h3>

    <Link class={style.PlayNow} href="/play">
      Play Now!
    </Link>
  </div>
);

export default Home;
