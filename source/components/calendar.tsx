import {Component} from "preact";
import {type SharedProps} from "./shared.js";

export class Calendar extends Component<SharedProps> {
  render() {
    const {today} = this.props;

    const dayNames = ["", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const currentWeekDayName = dayNames[today.dayOfTheWeek()];

    // Create the row with the names of the day.
    const dayNameRow = dayNames.map((name) => {
      const classes = [
        currentWeekDayName === name ? "current-week-day-name" : "",
        name === "" ? "week-number" : "week-day-name",
      ];
      return <p class={classes.join(" ").trim()}>{name}</p>;
    });

    // Create the start of the calendar and set it to the first day of the
    // month.
    const start = today.clone();
    start.date.setDate(1);

    // Subtract the amount of days in the week we are in from the start.
    // Add 1 to account for Monday starting at 1.
    const subtractDays = -start.dayOfTheWeek() + 1;

    // If the subtraction ends up being 0 it means the first day of the month is
    // a Monday, in which case we want to subtract a whole week instead.
    start.addDays(subtractDays === 0 ? -7 : subtractDays);

    const weekRows = [];

    // Loop over 6 weeks to include in the calendar.
    for (let weekCounter = 0; weekCounter < 6; weekCounter++) {
      // Get the current week and add the week we're in to it.
      const currentWeek = start.week() + weekCounter;

      // Clone the start date and add the amount of weeks we've looped over.
      const weekDay = start.clone();
      weekDay.addDays(weekCounter * 7);

      const currentWeekClasses = [
        today.week() === weekDay.week() ? "current-week" : "",
        "week-number",
      ];

      // Add the week number as the first column of the grid.
      weekRows.push(
        <p class={currentWeekClasses.join(" ").trim()}>{currentWeek}</p>,
      );

      // Loop over each day in the week.
      for (let dayCounter = 0; dayCounter < 7; dayCounter++) {
        // Create CSS classes for the current day, weekday and month.
        const classes = [
          today.iso().startsWith(weekDay.iso().slice(0, 10))
            ? "current-day"
            : "",
          today.week() === weekDay.week() ? "current-week-day" : "",
          today.date.getMonth() === weekDay.date.getMonth()
            ? "current-month"
            : "other-month",
        ];

        // Add the new week day to the list and advance it by a day.
        weekRows.push(
          <p class={classes.join(" ").trim()}>{weekDay.paddedDay()}</p>,
        );
        weekDay.addDays(1);
      }
    }

    return (
      <div class="calendar">
        {dayNameRow}
        {weekRows}
      </div>
    );
  }
}
