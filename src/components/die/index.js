import { h } from "preact";
import { connect } from "unistore/preact";
import cx from "classnames";

import { actions } from "../../store";

const WIDTH = "64px";
const HEIGHT = "64px";
const ANGLES = {
  1: [90, 0],
  2: [0, 90],
  3: [180, 0],
  4: [0, 0],
  5: [0, -90],
  6: [-90, 0]
};

import style from "./style";
export default connect(
  [],
  actions
)(props => {
  const angle = ANGLES[props.value];

  // Default position before rolling
  let transform = "rotateX(90deg) rotateZ(0deg)";
  if (angle) {
    transform = `rotateX(${angle[0]}deg) rotateZ(${angle[1]}deg)`;
  }

  return (
    <div class={cx(style.outer)} onClick={() => props.lock(props.die)}>
      <div class={style.dice} style={`transform: ${transform};`}>
        <svg
          class={cx(style.face, props.locked ? style.Locked : null)}
          width={WIDTH}
          height={HEIGHT}
        >
          <circle cx="32" cy="32" r="6" fill="red"></circle>
        </svg>
        <svg
          class={cx(style.face, props.locked ? style.Locked : null)}
          width={WIDTH}
          height={HEIGHT}
        >
          <circle cx="16" cy="16" r="3"></circle>
          <circle cx="48" cy="48" r="3"></circle>
        </svg>
        <svg
          class={cx(style.face, props.locked ? style.Locked : null)}
          width={WIDTH}
          height={HEIGHT}
        >
          <circle cx="16" cy="16" r="3"></circle>
          <circle cx="32" cy="32" r="3"></circle>
          <circle cx="48" cy="48" r="3"></circle>
        </svg>
        <svg
          class={cx(style.face, props.locked ? style.Locked : null)}
          width={WIDTH}
          height={HEIGHT}
        >
          <circle cx="16" cy="16" r="3"></circle>
          <circle cx="48" cy="48" r="3"></circle>
          <circle cx="16" cy="48" r="3"></circle>
          <circle cx="48" cy="16" r="3"></circle>
        </svg>
        <svg
          class={cx(style.face, props.locked ? style.Locked : null)}
          width={WIDTH}
          height={HEIGHT}
        >
          <circle cx="16" cy="16" r="3"></circle>
          <circle cx="32" cy="32" r="3"></circle>
          <circle cx="48" cy="48" r="3"></circle>
          <circle cx="16" cy="48" r="3"></circle>
          <circle cx="48" cy="16" r="3"></circle>
        </svg>
        <svg
          class={cx(style.face, props.locked ? style.Locked : null)}
          width={WIDTH}
          height={HEIGHT}
        >
          <circle cx="16" cy="16" r="3"></circle>
          <circle cx="48" cy="48" r="3"></circle>
          <circle cx="16" cy="32" r="3"></circle>
          <circle cx="48" cy="32" r="3"></circle>
          <circle cx="16" cy="48" r="3"></circle>
          <circle cx="48" cy="16" r="3"></circle>
        </svg>
      </div>
    </div>
  );
});
