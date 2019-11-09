import { h } from "preact";
import cx from "classnames";

import style from "./style.css";
export default function Input(props) {
  return (
    <input
      class={cx(
        style.input,
        // "bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded",
        props.style
      )}
      type={props.type}
      data-index={props["data-index"]}
      value={props.value}
      onChange={props.onChange}
    />
  );
}
