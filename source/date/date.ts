export class DateWrapper {
  public date: Date;

  constructor(date: Date | string) {
    this.date = date instanceof Date ? date : new Date(date);
  }

  /**
   * Adds the specified number of days to the inner date.
   *
   * @param days The amount of days to add, can also be negative to subtract.
   */
  public addDays(days: number): void {
    this.date.setDate(this.date.getDate() + days);
  }

  /** Clone the current date and return a completely new DateWrapper. */
  public clone(): DateWrapper {
    return new DateWrapper(new Date(this.iso()));
  }

  /** Get the day of the week with Monday starting as 1. */
  public dayOfTheWeek(): number {
    const day = this.date.getDay();
    return day === 0 ? 7 : day;
  }

  /** Get the date as an ISO-formatted string. */
  public iso(): string {
    return this.date.toISOString();
  }

  /** Get the day padded with a leading zero when necessary. */
  public paddedDay(): string {
    const day = this.date.getDate();
    return day.toString().padStart(2, "0");
  }

  /** Get the month padded with a leading zero when necessary. */
  public paddedMonth(): string {
    const month = this.date.getMonth() + 1;
    return month.toString().padStart(2, "0");
  }

  /**
   * Get the week of the year the date is in.
   *
   * Code adapted from https://weeknumber.net/how-to/javascript.
   * */
  public week(): number {
    const date = new Date(this.date.getTime());
    date.setHours(0, 0, 0, 0);

    // Thursday in the current week decides the year.
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));

    // January 4 is always in week 1.
    const firstWeek = new Date(date.getFullYear(), 0, 4);

    // Get the difference between the first week and the current date in days.
    const dayDifference = (date.getTime() - firstWeek.getTime()) / 86_400_000;

    // Adjust the day difference to Thursday and then get the number of weeks.
    return (
      1 + Math.round((dayDifference - 3 + ((firstWeek.getDay() + 6) % 7)) / 7)
    );
  }
}
