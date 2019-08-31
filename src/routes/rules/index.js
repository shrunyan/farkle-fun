import { h, Component } from "preact";
import style from "./style";

export default class Rules extends Component {
  // Note: `user` comes from the URL, courtesy of our router
  render() {
    return (
      <div class={style.profile}>
        <h1>Rules</h1>

        <p></p>

        <h2>Scoring</h2>

        <p>
          Note that scoring combinations only count when made with a single
          throw. (Example: If a player rolls a 1 and sets it aside and then
          rolls two 1’s on their next throw, they only score 300 points, not
          1000.)
        </p>

        <table>
          <tr>
            <td>1</td> <td>100 points</td>
          </tr>

          <tr>
            <td>5</td> <td>50 points</td>
          </tr>
          <tr>
            <td>Three 1's</td> <td>1,000 points</td>
          </tr>
          <tr>
            <td>Three 2's</td> <td>200 points</td>
          </tr>
          <tr>
            <td>Three 3's</td> <td>300 points</td>
          </tr>
          <tr>
            <td>Three 4's</td> <td>400 points</td>
          </tr>
          <tr>
            <td>Three 5's</td> <td>500 points</td>
          </tr>
          <tr>
            <td>Three 6's</td> <td>600 points</td>
          </tr>
          <tr>
            <td>1-2-3-4-5-6 </td> <td>3000 points</td>
          </tr>
          <tr>
            <td>
              3 Pairs (<em>including 4-of-a-kind and a pair</em>)
            </td>{" "}
            <td>1500 points</td>
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

        <h2>Winning</h2>
        <p>
          The first player to score a total of 10,000 or more points wins,
          provided that no other players with a remaining turn can exceed that
          score.
        </p>
      </div>
    );
  }
}
