import { h, Component } from "preact";

import style from "./style";
export default class Rules extends Component {
  // Note: `user` comes from the URL, courtesy of our router
  render() {
    return (
      <div class={style.rules}>
        <h1>Rules</h1>

        <p>
          Farkle is played by two or more players, with each player in
          succession having a turn at throwing the dice. Each player's turn
          results in a score, and the scores for each player accumulate to some
          winning total (usually 10,000).
        </p>

        <h2>Game Flow</h2>
        <ul>
          <li>
            At the beginning of each turn, the player throws all the dice at
            once.
          </li>
          <li>
            After each throw, one or more scoring dice must be set aside (see
            sections on scoring below).
          </li>
          <li>
            The player may then either end their turn and bank the score
            accumulated so far, or continue to throw the remaining dice.
          </li>
          <li>
            If the player has scored all six dice, they have "hot dice" and may
            continue their turn with a new throw of all six dice, adding to the
            score they have already accumulated. There is no limit to the number
            of "hot dice" a player may roll in one turn.
          </li>
          <li>
            If none of the dice score in any given throw, the player has
            "farkled" and all points for that turn are lost.
          </li>
          <li>
            At the end of the player's turn, the dice are handed to the next
            player in succession (usually in clockwise rotation), and they have
            their turn.
          </li>
        </ul>

        <h2>Scoring</h2>
        <p>
          You cannot count any of your points until you reach at least 500
          points in a single round. When you reach 500 points for the first
          time, you may choose to immediately end your turn to prevent losing
          the points.
        </p>

        <h3>Point combinations</h3>
        <table>
          <tr>
            <td>5</td> <td>50 points</td>
          </tr>
          <tr>
            <td>1</td> <td>100 points</td>
          </tr>
          <tr>
            <td>1, 1, 1</td> <td>1,000 points</td>
          </tr>
          <tr>
            <td>2, 2, 2</td> <td>200 points</td>
          </tr>
          <tr>
            <td>3, 3, 3</td> <td>300 points</td>
          </tr>
          <tr>
            <td>4, 4, 4</td> <td>400 points</td>
          </tr>
          <tr>
            <td>5, 5, 5</td> <td>500 points</td>
          </tr>
          <tr>
            <td>6, 6, 6</td> <td>600 points</td>
          </tr>

          <tr>
            <td>Four of a Kind </td> <td>1,000 points</td>
          </tr>
          <tr>
            <td>Five of a Kind </td> <td>2,000 points</td>
          </tr>
          <tr>
            <td>Six of a Kind </td> <td>3,000 points</td>
          </tr>

          <tr>
            <td>
              3 Pairs (<em>including 4-of-a-kind and a pair</em>)
            </td>{" "}
            <td>1500 points</td>
          </tr>
          <tr>
            <td>Two sets of Three of a Kind</td> <td>2,500 points</td>
          </tr>

          <tr>
            <td>1-2-3-4-5-6 </td> <td>3,000 points</td>
          </tr>
        </table>

        <p>
          Sometimes a single roll will provide multiple ways to score. For
          example, a player rolling 1-2-4-5-5-5 could score one of the
          following:
        </p>

        <ul>
          <li>100 points for the 1</li>
          <li>150 points for the 1 and a 5</li>
          <li>500 points for the three 5's</li>
          <li>600 points for the 1 and the three 5's</li>
        </ul>

        <p>
          <em>
            Note that scoring combinations only count when made with a single
            throw.
          </em>
        </p>
        <p>
          For example, If a player rolls a 1 and sets it aside and then rolls
          two 1’s on their next throw, they only score 300 points, not 1000.
        </p>

        <h2>Winning</h2>

        <p>
          Once a player has achieved a winning point total, each other player
          has one last turn to score enough points to surpass that high-score.
        </p>

        <p>The player with the high-score after final rolls is the winner.</p>
      </div>
    );
  }
}
