import createStore from "unistore";

// TODO make env var?
const DICE_COUNT = 6;
const DICE_SIDES = 6;
const DICE_INITIAL_VALUE = 0;
const MAX_SCORE = 10000;

export default createStore({
  cup: startingDice(),
  rolls: [],
  combos: [],
  players: [
    {
      name: "Nicole",
      score: 0,
      turns: [] // TODO at end of every turn push rolls here
    },
    {
      name: "Jenna",
      score: 0,
      turns: [] // TODO at end of every turn push rolls here
    },
    {
      name: "Christina",
      score: 0,
      turns: [] // TODO at end of every turn push rolls here
    },
    {
      name: "Stuart",
      score: 0,
      turns: [] // TODO at end of every turn push rolls here
    },
    {
      name: "TEST ONE",
      score: 0,
      turns: [] // TODO at end of every turn push rolls here
    },
    {
      name: "TEST Two",
      score: 0,
      turns: [] // TODO at end of every turn push rolls here
    },
    {
      name: "TEST Three",
      score: 0,
      turns: [] // TODO at end of every turn push rolls here
    }
  ],
  current_player: 0, // index in players array
  current_turn_score: 0,
  max_score: MAX_SCORE
});

export const actions = store => {
  return {
    lock(state, index) {
      console.log("lock", index);

      // Can't lock dice until they've been rolled
      if (state.rolls.length) {
        let cup = [...state.cup];

        cup[index] = {
          ...cup[index],
          locked: !cup[index].locked
        };

        store.setState({ cup });
      }
    },

    shake: state => {
      console.log("shake", state);

      let combos = [...state.combos];
      if (state.rolls.length) {
        // Make copy so we don't modify in place the state value
        let rolls = [...state.rolls];
        let priorRoll = rolls.pop();

        // TODO I think I need to diff prior rol to the cups latest locked die.
        // But rolls aren't maintaing the index mapping so not sure how that will work

        // Get newly locked die from prior roll
        combos.push(priorRoll.filter(die => die.locked));
      }

      const cup = roll(state.cup);
      const rolledDice = cup.filter(die => !die.locked);

      store.setState({
        rolls: [...state.rolls, [...rolledDice]],
        combos,
        cup
      });
    },

    endTurn: state => {
      console.log("endTurn", state);

      // determine next player
      const nextPlayer =
        state.current_player + 1 > state.players.length - 1
          ? 0 // go back to player one
          : state.current_player + 1;

      // Tally score
      const score = tally(state.combos);

      // save players rolls
      let players = [...state.players];

      // Tally players total score
      players[state.current_player].score =
        players[state.current_player].score + score;

      // Capture players turn
      players[state.current_player].turns = [
        ...players[state.current_player].turns,
        {
          rolls: state.rolls,
          combos: state.combos,
          score: score
        }
      ];

      store.setState({
        cup: startingDice(),
        rolls: [],
        combos: [],
        current_player: nextPlayer,
        // current_turn_score: 0,
        players
      });
    }
  };
};

function startingDice(amount, sides, initialValue) {
  return new Array(DICE_COUNT).fill({
    sides: DICE_SIDES,
    value: DICE_INITIAL_VALUE,
    locked: false
  });
}

function roll(dice) {
  return dice.map(die => {
    if (!die.locked) {
      return {
        ...die,
        value: Math.floor(Math.random() * die.sides) + 1
      };
    } else {
      return die;
    }
  });
}

// Adds up combos into numerical score
function tally(combos) {
  return combos.reduce((acc, combo) => {
    const selected = combo.filter(die => die.locked);
    const values = selected.map(die => die.value);

    acc = acc + sum(values);
    return acc;
  }, 0);
}

// Determines a set of dices score
// Rules engine
export function sum(values) {
  let score = 0;

  // Order dice by numerical value
  const numericallySorted = values.sort((a, b) => a - b);

  // Find all value matches
  const matches = numericallySorted.reduce((acc, value) => {
    if (acc[value]) {
      acc[value].count = acc[value].count + 1;
    } else {
      acc[value] = {
        count: 1
      };
    }
    return acc;
  }, {});

  const matchedDice = Object.keys(matches);

  // console.log("matches", matches);
  // console.log("matched key count", matchedDice.length);

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
    let pair = matchedDice.filter(value => matches[value].count === 3);
    if (pair.length === 2) {
      console.log("2 sets of 3 of a kind");
      score = 2500;
      return score;
    }
  }

  // 3 sets of 2 of a kind
  // a.k.a triple pair
  if (numericallySorted.length === 6 && matchedDice.length === 3) {
    let triple = matchedDice.filter(value => matches[value].count === 2);
    if (triple.length === 3) {
      console.log("triple pair");
      score = 1500;
      return score;
    }
  }

  // All other cases
  score = matchedDice.reduce((acc, value, index) => {
    let count = matches[value].count;

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
        switch (value) {
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

        if (value == 5) {
          acc += 100;
        }
        if (value == 1) {
          acc += 200;
        }
        break;

      case "1":
        console.log("1 or 5 die value");
        if (value == 5) {
          acc += 50;
        }
        if (value == 1) {
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
      value,
      count,
      score: acc
    });

    // Building up score
    return acc;
  }, 0);

  return score;
}

// class Die {
//   constructor(sides = 6, value = 1) {
//     console.log("Die", this);

//     this.value = value;
//     this.locked = false;
//     this.sides = sides;
//   }

//   roll() {
//     if (!this.locked) {
//       this.value = Math.floor(Math.random() * this.sides) + 1;
//     }
//   }
// }

// class DiceCup {
//   constructor(diceCount = 6) {
//     console.log("DiceCup", this);

//     this.diceCount = diceCount;
//     this.dice = new Array(diceCount).fill(new Die());
//   }

//   shake = () => {
//     console.log("DiceCup:shake");

//     this.dice = this.dice.map(die => {
//       die.roll();
//       return die;
//     });
//   };
// }

// class Engine {
//   constructor() {}
//   sortDiceNumerically(dice) {
//     return dice.sort((a, b) => a.value - b.value);
//   }
//   dieMatches(dice) {
//     return dice.reduce((acc, val) => {
//       if (acc[val]) {
//         acc[val].count = acc[val].count + 1;
//       } else {
//         acc[val] = {
//           count: 1
//         };
//       }
//       return acc;
//     }, {});
//   }
//   score(state) {
//     const numericallySorted = this.sortDiceNumerically(state.dice);
//     const matches = this.dieMatches(numericallySorted);

//     const matchedDice = Object.keys(matches);

//     console.log("matches", matches);
//     console.log("matched key count", matchedDice.length);

//     // Check for flush
//     if (numericallySorted.join("-") === "1-2-3-4-5-6") {
//       console.log("flush: 1-2-3-4-5-6");
//       score = 3000;
//       return score;
//     }

//     // 2 sets of 3 of a kind
//     // If we were given a full set of dice and there are only 2 match groups
//     if (numericallySorted.length === 6 && matchedDice.length === 2) {
//       // and each group contains a count of 3 then we have 2 sets of 3 of a kind
//       let pair = matchedDice.filter(die => matches[die].count === 3);
//       if (pair.length === 2) {
//         console.log("2 sets of 3 of a kind");
//         score = 2500;
//         return score;
//       }
//     }

//     // 3 sets of 2 of a kind
//     // a.k.a triple pair
//     if (numericallySorted.length === 6 && matchedDice.length === 3) {
//       let triple = matchedDice.filter(die => matches[die].count === 2);
//       if (triple.length === 3) {
//         console.log("triple pair");
//         score = 1500;
//         return score;
//       }
//     }

//     // All other cases
//     score = matchedDice.reduce((acc, die, index) => {
//       let count = matches[die].count;

//       switch (String(count)) {
//         case "6":
//           console.log("six of a kind");
//           acc += 3000;
//           break;

//         case "5":
//           console.log("five of a kind");
//           acc += 2000;
//           break;

//         case "4":
//           console.log("four of a kind");
//           acc += 1000;
//           break;

//         // In the case of a triple pair. e.g. 5-5-5-5-4-4
//         // Which has a higher score is captured by the edge case
//         // checks before this main switch statement

//         case "3":
//           console.log("three of a kind");
//           switch (die) {
//             case "6":
//               acc += 600;
//               break;
//             case "5":
//               acc += 500;
//               break;
//             case "4":
//               acc += 400;
//               break;
//             case "3":
//               acc += 300;
//               break;
//             case "2":
//               acc += 200;
//               break;
//             case "1":
//               acc += 1000;
//               break;
//           }
//           break;

//         case "2":
//           console.log("1 & 5 pairs");

//           // NOTE: triple pairs are handled by the preceding edge case check

//           // handle 1-1 & 5-5 cases where there isn't a triple pair
//           // but these would score as 200 & 100 respectively

//           if (die == 5) {
//             acc += 100;
//           }
//           if (die == 1) {
//             acc += 200;
//           }
//           break;

//         case "1":
//           console.log("1 or 5 die");
//           if (die == 5) {
//             acc += 50;
//           }
//           if (die == 1) {
//             acc += 100;
//           }
//           break;

//         default:
//           // no score
//           // 0 points
//           break;
//       }

//       console.table({
//         index,
//         die,
//         count,
//         score: acc
//       });

//       // Building up score
//       return acc;
//     }, 0);

//     return score;
//   }
// }
