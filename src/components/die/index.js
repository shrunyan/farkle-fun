import { h, Component } from "preact";
import style from "./style";

export default class Die extends Component {
  // Note: `user` comes from the URL, courtesy of our router
  render() {
    return <div class={style.Die}>Die</div>;
  }
}
