import { h, Component } from "preact";
import style from "./style";

export default class NewGame extends Component {
  constructor() {
    super();
    this.state = {
      players: ["player 1", "player 2"]
    };
  }
  render(props, state) {
    return (
      <div class={style.NewGame}>
        <h1>Add Players</h1>

        {state.players.map(player => {
          return <input type="text" value={player} />;
        })}

        <button>Add another player?</button>

        <button>Start Game</button>
      </div>
    );
  }
}
