import createStore from "unistore";

// TODO make env var?
const DICE_COUNT = 6;
const DICE_SIDES = 6;
const DICE_INITIAL_VALUE = 1;

export default createStore({
  cup: new Array(DICE_COUNT).fill({
    sides: DICE_SIDES,
    value: DICE_INITIAL_VALUE,
    locked: false
  }),
  rolls: [],
  players: [],
  started: false,
  score: 0
});

export const actions = store => {
  return {
    lock(state, index) {
      console.log("lock", index);

      // Can't lock dice until they've been rolled
      if (state.rolls.length) {
        let dice = [...state.cup];

        dice[index] = {
          ...dice[index],
          locked: !dice[index].locked
        };

        // Update roll with locked dice
        const rolls = [...state.rolls];
        rolls.pop();
        rolls.push(dice);

        store.setState({
          cup: dice,
          rolls
        });
      }
    },

    shake: state => {
      console.log("shake", state);

      const dice = roll(state.cup);

      store.setState({
        started: true,
        rolls: [...state.rolls, dice],
        cup: dice
      });
    },

    tally: state => {
      console.log("tally", state);

      store.setState({
        score: state.rolls.reduce((acc, roll) => {
          acc = acc + sum(roll);
          return acc;
        }, 0)
      });
    }
  };
};

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

function sum(dice) {
  let score = 0;

  const selected = dice.filter(die => die.locked);

  // Order dice by numerical value
  const numericallySorted = selected.sort((a, b) => a.value - b.value);

  // Find all die value matches
  const matches = numericallySorted.reduce((acc, die) => {
    if (acc[die.value]) {
      acc[die.value].count = acc[die.value].count + 1;
    } else {
      acc[die.value] = {
        count: 1
      };
    }
    return acc;
  }, {});

  const matchedDice = Object.keys(matches);

  console.log("matches", matches);
  console.log("matched key count", matchedDice.length);

  // Check for flush
  if (numericallySorted.map(die => die.value).join("-") === "1-2-3-4-5-6") {
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
