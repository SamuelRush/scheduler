import React from "react";
import "components/DayListItem.scss";
const classNames = require("classnames");

export default function DayListItem(props) {
  let dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected === true,
    "day-list__item--full": props.spots === 0
  });

  let formatSpots = x => {
    let message;
    if (x === 0) {
      message = "no spots remaining";
    } else if (x === 1) {
      message = "1 spot remaining";
    } else {
      message = `${x} spots remaining`;
    }
    return message;
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
