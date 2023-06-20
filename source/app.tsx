import {Component} from "preact";
import {BigDate, Calendar} from "./components/exports.js";
import {DateWrapper} from "./date/date.js";

export class App extends Component {
  render() {
    const today = new DateWrapper(new Date());

    return (
      <>
        <p class="subtitle">Today is:</p>
        <BigDate today={today} />
        <Calendar today={today} />
      </>
    );
  }
}
