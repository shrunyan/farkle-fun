import { h, Component } from "preact";
import { connect } from "unistore/preact";

import { actions } from "../../store";

import Die from "../die";

import style from "./style";
export default connect(
  ["score", "cup", "rolls"],
  actions
)(props => {
  console.log("dice-board", props);

  return (
    <section class={style.DiceBoard}>
      <header>
        PLAYER_NAME: {props.username} {props.score}
      </header>
      <main>
        {props.cup.map((die, i) => {
          return <Die index={i} {...die} />;
        })}
      </main>
      <footer>
        <button class={style.RollDice} onClick={props.shake}>
          Roll Dice
        </button>
        <button class={style.EndTurn} onClick={props.tally}>
          End Turn
        </button>
      </footer>
    </section>
  );
});
