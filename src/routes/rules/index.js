import { h, Component } from "preact";
import style from "./style";

export default class Rules extends Component {
  // Note: `user` comes from the URL, courtesy of our router
  render() {
    return (
      <div class={style.profile}>
        <h1>Rules</h1>
      </div>
    );
  }
}
