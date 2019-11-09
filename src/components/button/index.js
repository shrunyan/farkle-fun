import { h } from "preact";
import cx from "classnames";

import style from "./style.css";
export default function Button(props) {
  return (
    <button
      class={cx(style.button, style[props.kind], props.class)}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
