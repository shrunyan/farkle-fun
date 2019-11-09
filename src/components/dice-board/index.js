import { h } from "preact";
import { connect } from "unistore/preact";

import { actions } from "../../store";

import Button from "../button";
import Players from "./players";
import Cup from "./cup";

import style from "./style";
export default connect(
  [],
  actions
)(props => {
  return (
    <section class={style.DiceBoard}>
      <main>
        <Players />
        <Cup />
      </main>
      <footer>
        <Button kind="primary" class={style.RollDice} onClick={props.roll}>
          <img src="/assets/icons/white/streamline-icon-board-game-dice-1@24x24.png" />
          Roll
        </Button>
        <Button kind="" onClick={props.endTurn}>
          <img src="/assets/icons/white/streamline-icon-button-next@24x24.png" />
          Next Player
        </Button>
        <Button kind="warn" onClick={props.endMatch}>
          <img src="/assets/icons/white/streamline-icon-button-stop@24x24.png" />
        </Button>
      </footer>
    </section>
  );
});
