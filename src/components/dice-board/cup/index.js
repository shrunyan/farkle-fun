import { h } from "preact";
import { connect } from "unistore/preact";

import Die from "../../die";

import style from "./style";
export default connect(["cup"])(props => {
  console.log("cup");

  return (
    <div class={style.Cup}>
      {props.cup.map(die => (
        <Die {...die} />
      ))}
    </div>
  );
});
