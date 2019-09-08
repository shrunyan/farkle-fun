import { h, Component } from "preact";
import { connect } from "unistore/preact";
import cx from "classnames";

import { actions } from "../../store";

import style from "./style";

export default connect(
  [],
  actions
)((props, state) => {
  return (
    <div
      class={cx(style.Die, props.locked ? style.Locked : null)}
      onClick={() => props.lock(props.index)}
    >
      {props.value}
    </div>
  );
});

// export default class Die extends Component {
//   // Note: `user` comes from the URL, courtesy of our router
//   render({ value }) {
//     return <div class={style.Die} onClick={props.lock}>{value}</div>;
//   }
// }
