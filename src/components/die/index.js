import { h } from "preact";
import { connect } from "unistore/preact";
import cx from "classnames";

import { actions } from "../../store";

import style from "./style";
export default connect(
  [],
  actions
)(props => {
  return (
    <div
      class={cx(style.Die, props.locked ? style.Locked : null)}
      onClick={() => props.lock(props.die)}
    >
      {props.value}
    </div>
  );
});
