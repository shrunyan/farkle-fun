import { h, Component } from "preact";
import style from "./style";

import Die from "../die";

export default class DiceBoard extends Component {
  constructor() {
    super();
    this.state = {
      dice: [0, 0, 0, 0, 0, 0]
    };
  }

  roll = () => {
    const rollResult = this.state.dice.map(_ => {
      return Math.floor(Math.random() * this.state.dice.length) + 1;
    });

    // TODO calculate score
    // const score =

    this.setState({
      dice: rollResult
    });
  };

  render(props, state) {
    return (
      <section class={style.DiceBoard}>
        <header>PLAYER_NAME: {props.username}</header>
        <main>
          {state.dice.map((value, i) => {
            return <Die value={value} />;
          })}
        </main>
        <footer>
          <button onClick={this.roll}>Roll Dice</button>
        </footer>
      </section>
    );
  }
}
