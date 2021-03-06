import createStore from "unistore";

// TODO make env var?
const DICE_COUNT = 6;
const DICE_SIDES = 6;
const DICE_INITIAL_VALUE = 0;
const MAX_SCORE = 10000;
const BASELINE_SCORE = 500;

export default createStore({
  cup: startingDice(),
  combos: [],
  players: [
    // {
    //   name: "Stuart",
    //   score: 0,
    //   turns: [], // TODO at end of every turn push rolls here
    //   farkles: 0
    // }
  ],
  current_player: 0, // index in players array
  current_turn_score: 0,
  max_score: MAX_SCORE,
  match_started: false
});

export const actions = store => {
  return {
    startMatch() {
      store.setState({
        match_started: true
      });
    },

    endMatch() {
      store.setState({
        match_started: false
      });
    },

    addSlot(state) {
      store.setState({
        players: [
          ...state.players,
          {
            name: null,
            score: 0,
            turns: [],
            farkles: 0
          }
        ]
      });
    },

    addPlayer(state, evt) {
      let players = [...state.players];
      players[evt.target.dataset.index] = {
        name: evt.target.value,
        score: 0,
        turns: [],
        farkles: 0
      };

      store.setState({
        players
      });
    },

    removePlayer(state, index) {
      let players = [...state.players];
      players.splice(index, 1);
      store.setState({
        players
      });
    },

    lock(state, die) {
      // console.log("lock die position", die);

      // Can't lock dice until they've been rolled
      if (state.combos.length) {
        let cup = [...state.cup];
        let selectedDie = cup.find(el => el.die === die);

        let combos = [...state.combos];
        let currentCombo = [...combos[combos.length - 1]];

        if (selectedDie.locked) {
          selectedDie.locked = false;
          currentCombo = currentCombo.filter(el => el.die !== die);
        } else {
          selectedDie.locked = true;
          let containsDie = currentCombo.find(el => el.die === die);
          if (!containsDie) {
            currentCombo.push(selectedDie);
          }
        }

        combos[combos.length - 1] = currentCombo;

        store.setState({ cup, combos });
      }
    },

    roll: state => {
      console.log("roll", state);

      let cup = shake(state.cup);
      let combos = [...state.combos, []];
      let currentPlayer = state.players[state.current_player];

      let potentialRollScore = sum(
        cup.filter(die => !die.locked).map(die => die.value)
      );

      // console.log("potentialRollScore", potentialRollScore);

      // if every die is locked and all combos score then the dice are hot
      let hotDice = false;
      let unLocked = cup.filter(die => !die.locked);
      if (unLocked.length === 0) {
        // confirm all combos score
        for (let index = 0; index < state.combos.length; index++) {
          const combo = state.combos[index];
          const score = sum(combo);

          console.log("LOOP", score, combo);
          // If any combo doesn't score then the dice are not hot
          if (!score) {
            hotDice = false;
            break;
          } else {
            hotDice = true;
          }
        }
      }

      if (hotDice) {
        console.log("Dice are hot!");

        // Reset game board and keep same current player
        store.setState({
          cup: shake(startingDice()),
          combos
        });
      } else if (potentialRollScore) {
        // Allow player to select score
        store.setState({
          combos,
          cup
        });
      } else {
        // Player roll has no score potential so turn is over.

        // Player can only farkle when on the board
        if (currentPlayer.score >= BASELINE_SCORE) {
          alert("Farkle");
          currentPlayer.farkles = currentPlayer.farkles + 1;
        }

        // Capture players turn
        // currentPlayer.turns = [
        //   ...currentPlayer.turns,
        //   {
        //     combos: state.combos,
        //     score: score
        //   }
        // ];

        // determine next player
        const nextPlayer =
          state.current_player + 1 > state.players.length - 1
            ? 0 // go back to player one
            : state.current_player + 1;

        // Reset game board
        store.setState({
          cup: startingDice(),
          combos: [],
          current_player: nextPlayer
        });
      }
    },

    endTurn: state => {
      console.log("endTurn", state);

      // determine next player
      const nextPlayer =
        state.current_player + 1 > state.players.length - 1
          ? 0 // go back to player one
          : state.current_player + 1;

      const currentPlayer = state.players[state.current_player];

      // Tally score
      const score = tally(state.combos);

      // save players rolls
      // let players = [...state.players];

      // In order to put points on the board you have land
      // a role of the BASELINE_SCORE or greater. Once scored all points
      // go on the board
      if (currentPlayer.score || score >= BASELINE_SCORE) {
        currentPlayer.score = currentPlayer.score + score;
      }

      if (score) {
        currentPlayer.farkles = 0;
      }

      // Capture players turn
      currentPlayer.turns = [
        ...currentPlayer.turns,
        {
          combos: state.combos,
          score: score
        }
      ];

      store.setState({
        cup: startingDice(),
        combos: [],
        current_player: nextPlayer
        // players
      });
    }
  };
};

function startingDice(amount, sides, initialValue) {
  return new Array(DICE_COUNT).fill().map((_, i) => {
    return {
      die: i,
      sides: DICE_SIDES,
      value: DICE_INITIAL_VALUE,
      locked: false
    };
  });
}

function shake(dice) {
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
export function tally(combos) {
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
  console.log("sum", values);

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

  // Edge Case: flush
  if (numericallySorted.join("-") === "1-2-3-4-5-6") {
    console.log("flush: 1-2-3-4-5-6");
    score = 3000;
    return score;
  }

  // Edge Case: double triple
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

  // Edge Case: triple pair
  // 3 sets of 2 of a kind
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
        // BUG currently selecting 6 die regardless of their kind triggers a 6 of a kind match
        // TODO confirm the 6 are of the same kind
        console.log("six of a kind", count, matches);
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
        // NOTE: triple pairs are handled by the "tiple pair" edge case

        // handle 1-1 & 5-5 cases where there isn't a triple pair
        // but these would score as 200 & 100 respectively

        if (value == 5) {
          console.log("5 pair");

          acc += 100;
        }
        if (value == 1) {
          console.log("1 pairs");

          acc += 200;
        }
        break;

      case "1":
        if (value == 5) {
          console.log("one 5 die value");

          acc += 50;
        }
        if (value == 1) {
          console.log("one 1 die value");

          acc += 100;
        }
        break;

      default:
        // no score
        // 0 points
        break;
    }

    // console.table({
    //   index,
    //   value,
    //   count,
    //   score: acc
    // });

    // Building up score
    return acc;
  }, 0);

  console.log("SCORE: ", score);

  return score;
}
