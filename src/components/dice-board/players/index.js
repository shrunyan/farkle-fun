import { h } from "preact";
import { useEffect } from "preact/hooks";
import { connect } from "unistore/preact";

import style from "./style";
export default connect(["players", "current_player"])(props => {
  useEffect(() => {
    document.getElementById(`player-${props.current_player}`).scrollIntoView();
  }, [props.current_player]);

  return (
    <ul class={style.Players}>
      {props.players.map((player, i) => (
        <li
          id={`player-${i}`}
          class={props.current_player === i ? style.Active : null}
        >
          <ul class={style.farkleCount}>
            {new Array(player.farkles).fill(1).map(el => (
              <li>&nbsp;</li>
            ))}
          </ul>
          <span class={style.stats}>
            <span class={style.name}>{player.name}</span>
            <span class={style.score}>{player.score}</span>
          </span>
        </li>
      ))}
    </ul>
  );
});
