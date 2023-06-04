// Third-party imports.
import {Component} from "preact";
// First-party imports.
import {type SharedProps} from "./shared.js";

export class BigDate extends Component<SharedProps> {
  render() {
    const {today} = this.props;

    const date = [
      ["year", today.date.getFullYear().toString()],
      ["month", today.paddedMonth()],
      ["day", today.paddedDay()],
    ]
      .map(([name, value]) => <span class={name}>{value}</span>)
      // Add a dash between each part of the date.
      // eslint-disable-next-line unicorn/no-array-reduce
      .reduce((accumulator, current) => (
        <>
          {accumulator}
          <span class="dash">-</span>
          {current}
        </>
      ));

    return <h1 class="big-date">{date}</h1>;
  }
}
