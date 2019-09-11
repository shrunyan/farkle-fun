import { h } from "preact";
import { connect } from "unistore/preact";

import { actions } from "../../store";

import Players from "./players";
import Cup from "./cup";

import style from "./style";
export default connect(
  [],
  actions
)(props => {
  console.log("dice-board", props);

  return (
    <section class={style.DiceBoard}>
      <main>
        <Players />
        <Cup />
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
