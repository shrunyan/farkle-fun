import { h, Component } from "preact";
import style from "./style";

import DiceBoard from "../../components/dice-board";

export default class Play extends Component {
  render() {
    return (
      <div class={style.profile}>
        <DiceBoard />
      </div>
    );
  }
}
