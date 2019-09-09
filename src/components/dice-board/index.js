import { h, Component } from "preact";
import { connect } from "unistore/preact";

import { actions } from "../../store";

import Die from "../die";

import style from "./style";
export default connect(
  ["score", "cup", "players", "current_turn_score", "current_player"],
  actions
)(props => {
  console.log("dice-board", props);

  return (
    <section class={style.DiceBoard}>
      <header>
        <table>
          {props.players.map((player, i) => (
            <td>
              {player.name.slice(0, 3)}: {player.score}
            </td>
          ))}
        </table>
        <h3>Current Score: {props.current_turn_score}</h3>
      </header>
      <main>
        {props.cup.map((die, i) => (
          <Die index={i} {...die} />
        ))}
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
