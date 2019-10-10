import { h, Component } from "preact";
import { connect } from "unistore/preact";

import style from "./style";

import DiceBoard from "../../components/dice-board";
import NewGame from "../../components/new-game";

export default connect(["match_started"])(props => {
  return (
    <div class={style.play}>
      {props.match_started ? <DiceBoard /> : <NewGame />}
    </div>
  );
});

// export default class Play extends Component {
//   render() {

//   }
// }
