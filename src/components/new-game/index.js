import { h } from "preact";
import { connect } from "unistore/preact";

import Button from "../button";
import Input from "../input";
import { actions } from "../../store";

import style from "./style";
export default connect(
  ["players"],
  actions
)(props => {
  return (
    <section class={style.NewGame}>
      <header>
        <h1>Add Match Players</h1>

        <div class={style.actions}>
          <Button onClick={props.addSlot}>
            <img
              src="/assets/icons/white/streamline-icon-add-square@24x24.png"
              alt="Add a player"
            />
            Add player
          </Button>
          <Button
            kind="primary"
            onClick={props.startMatch}
            disabled={props.players.length < 2}
          >
            <img
              src="/assets/icons/white/streamline-icon-button-play-1@24x24.png"
              alt="Start game"
            />
            Start Game
          </Button>
        </div>
      </header>

      <main>
        <ul>
          {props.players.map((player, index) => {
            return (
              <li>
                <Input
                  type="text"
                  data-index={index}
                  value={player.name}
                  onChange={props.addPlayer}
                />
                <Button kind="warn" onClick={() => props.removePlayer(index)}>
                  <img
                    src="/assets/icons/white/streamline-icon-remove-square-1@24x24.png"
                    alt="Remove added player"
                  />
                </Button>
              </li>
            );
          })}
        </ul>
      </main>
    </section>
  );
});
