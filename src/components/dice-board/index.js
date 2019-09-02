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
    console.log("roll");

    const rollResult = this.state.dice.map(_ => {
      return Math.floor(Math.random() * this.state.dice.length) + 1;
    });

    // TODO calculate score
    // const score =

    this.engine(rollResult);

    this.setState({
      dice: rollResult
    });
  };

  engine = selections => {
    // console.log("engine", selections);

    // Sort default is alphabetically
    // We provide custom sort function to sort numerically
    const numericalSort = selections.sort((a, b) => a - b);
    const matches = numericalSort.reduce((acc, val) => {
      if (acc[val]) {
        acc[val].count = acc[val].count + 1;
      } else {
        acc[val] = {
          count: 1
        };
      }
      return acc;
    }, {});

    console.log("matches", matches);

    const score = Object.keys(matches).reduce((acc, die) => {
      let count = matches[die].count;

      console.log("die", die);
      console.log("count", count);

      switch (count) {
        case 6:
          // six of a kind
          acc += 3000;
        case 5:
          // five of a kind
          acc += 2000;
        case 4:
          // four of a kind
          acc += 1000;
        case 3:
          // three of a kind
          switch (die) {
            case 6:
              acc += 600;
            case 5:
              acc += 500;
            case 4:
              acc += 400;
            case 3:
              acc += 300;
            case 2:
              acc += 200;
            case 1:
              acc += 1000;
          }
        case 2:
          console.log("pair");

        // pair
        // 1500 points

        // TODO count pairs
        // TODO count 4 of kind and pair

        case 1:
          if (die === 5) {
            acc += 50;
          }
          if (die === 1) {
            acc += 100;
          }

        default:
        // no score
        // 0 points
      }

      // Building up score
      return acc;
    }, 0);

    // TODO figure out 2 sets of 3 of a kind
    // TODO figure out flush: 1 2 3 4 5 6

    console.log("score", score);
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
          <button class={style.RollDice} onClick={this.roll}>
            Roll Dice
          </button>
          <button class={style.EndTurn}>End Turn</button>
        </footer>
      </section>
    );
  }
}
