import { h, Component } from "preact";
import { useState } from "preact/hooks";
import { connect } from "unistore/preact";

import { actions } from "../../store";

import style from "./style";

export default connect(
  ["players"],
  actions
)(props => {
  console.log("NewGame");

  return (
    <div class={style.NewGame}>
      <h1>Add Match Players</h1>

      <div>
        <button onClick={props.addSlot}>Add new player</button>
        {props.players.length >= 2 && (
          <button onClick={props.startMatch}>Start Game</button>
        )}
      </div>

      <ul>
        {props.players.map((player, index) => {
          return (
            <li>
              <input
                type="text"
                data-index={index}
                value={player.name}
                onChange={props.addPlayer}
              />
              <button onClick={() => props.removePlayer(index)}>remove</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
});
