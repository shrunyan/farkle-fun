import { h } from "preact";
import { useEffect } from "preact/hooks";
import { connect } from "unistore/preact";

import { actions } from "../../store";

import Die from "../die";

import style from "./style";
export default connect(
  ["score", "cup", "players", "current_turn_score", "current_player"],
  actions
)(props => {
  console.log("dice-board", props);

  useEffect(() => {
    document.getElementById(`player-${props.current_player}`).scrollIntoView();
  }, [props.current_player]);

  return (
    <section class={style.DiceBoard}>
      <main>
        <ul class={style.Players}>
          {props.players.map((player, i) => (
            <li
              id={`player-${i}`}
              class={props.current_player === i ? style.Active : null}
              // autofocus={props.current_player === i ? true : false}
            >
              <span class={style.name}>{player.name}</span>
              <span class={style.score}>{player.score}</span>
            </li>
          ))}
        </ul>
        <div class={style.Cup}>
          {props.cup.map((die, i) => (
            <Die index={i} {...die} />
          ))}
        </div>
      </main>
      <footer>
        <button class={style.RollDice} onClick={props.shake}>
          Roll Dice
        </button>
        <button class={style.EndTurn} onClick={props.endTurn}>
          End Turn
        </button>
      </footer>
    </section>
  );
});
