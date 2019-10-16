import { h } from "preact";
import { connect } from "unistore/preact";

import DiceBoard from "../../components/dice-board";
import NewGame from "../../components/new-game";

import style from "./style";
export default connect(["match_started"])(props => {
  return (
    <div class={style.play}>
      {props.match_started ? <DiceBoard /> : <NewGame />}
    </div>
  );
});
