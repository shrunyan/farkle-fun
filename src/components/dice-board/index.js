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
    const score = this.engine(rollResult);

    console.log("SCORE", score);

    // TODO farkle
    if (score === 0) {
      console.log("FARKLE");
    }

    this.setState({
      dice: rollResult
    });
  };

  engine = selections => {
    // console.log("engine", selections);
    let score = 0;

    // Sort default is alphabetical
    // We provide custom sort function to sort numerically
    const numericallySorted = selections.sort((a, b) => a - b);

    // Find all die value matches
    const matches = numericallySorted.reduce((acc, val) => {
      if (acc[val]) {
        acc[val].count = acc[val].count + 1;
      } else {
        acc[val] = {
          count: 1
        };
      }
      return acc;
    }, {});

    const matchedDice = Object.keys(matches);

    console.log("matches", matches);
    console.log("matched key count", matchedDice.length);

    // Check for flush
    if (numericallySorted.join("-") === "1-2-3-4-5-6") {
      console.log("flush: 1-2-3-4-5-6");
      score = 3000;
      return score;
    }

    // 2 sets of 3 of a kind
    // If we were given a full set of dice and there are only 2 match groups
    if (numericallySorted.length === 6 && matchedDice.length === 2) {
      // and each group contains a count of 3 then we have 2 sets of 3 of a kind
      let pair = matchedDice.filter(die => matches[die].count === 3);
      if (pair.length === 2) {
        console.log("2 sets of 3 of a kind");
        score = 2500;
        return score;
      }
    }

    // 3 sets of 2 of a kind
    // a.k.a triple pair
    if (numericallySorted.length === 6 && matchedDice.length === 3) {
      let triple = matchedDice.filter(die => matches[die].count === 2);
      if (triple.length === 3) {
        console.log("triple pair");
        score = 1500;
        return score;
      }
    }

    // All other cases
    score = matchedDice.reduce((acc, die, index) => {
      let count = matches[die].count;

      switch (String(count)) {
        case "6":
          console.log("six of a kind");
          acc += 3000;
          break;

        case "5":
          console.log("five of a kind");
          acc += 2000;
          break;

        case "4":
          console.log("four of a kind");
          acc += 1000;
          break;

        // In the case of a triple pair. e.g. 5-5-5-5-4-4
        // Which has a higher score is captured by the edge case
        // checks before this main switch statement

        case "3":
          console.log("three of a kind");
          switch (die) {
            case "6":
              acc += 600;
              break;
            case "5":
              acc += 500;
              break;
            case "4":
              acc += 400;
              break;
            case "3":
              acc += 300;
              break;
            case "2":
              acc += 200;
              break;
            case "1":
              acc += 1000;
              break;
          }
          break;

        case "2":
          console.log("1 & 5 pairs");

          // NOTE: triple pairs are handled by the preceding edge case check

          // handle 1-1 & 5-5 cases where there isn't a triple pair
          // but these would score as 200 & 100 respectively

          if (die == 5) {
            acc += 100;
          }
          if (die == 1) {
            acc += 200;
          }
          break;

        case "1":
          console.log("1 or 5 die");
          if (die == 5) {
            acc += 50;
          }
          if (die == 1) {
            acc += 100;
          }
          break;

        default:
          // no score
          // 0 points
          break;
      }

      console.table({
        index,
        die,
        count,
        score: acc
      });

      // Building up score
      return acc;
    }, 0);

    return score;
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
