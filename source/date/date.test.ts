import {setup} from "@holllo/test";
import {DateWrapper} from "./date.js";

await setup("DateWrapper", async (group) => {
  group.test("Add Days", async (test) => {
    const samples = [
      [1, 23],
      [10, 1],
      [-1, 21],
      [-10, 12],
    ];
    for (const [daysToAdd, expectedDay] of samples) {
      const wrapper = new DateWrapper("2023-05-22T12:00:00Z");
      wrapper.addDays(daysToAdd);
      test.equals(wrapper.date.getDate(), expectedDay, wrapper.iso());
    }
  });

  group.test("Constructor", async (test) => {
    const stringConstructor = new DateWrapper("2023-05-22T12:00:00Z");
    test.true(stringConstructor.date instanceof Date, "String constructor");
    const dateConstructor = new DateWrapper(new Date("2023-05-22T12:00:00Z"));
    test.true(dateConstructor.date instanceof Date, "Date constructor");
  });

  group.test("Day of the Week", async (test) => {
    const wrapper = new DateWrapper("2023-05-22T12:00:00Z");
    for (let expected = 1; expected <= 7; expected++) {
      test.equals(wrapper.dayOfTheWeek(), expected, wrapper.iso());
      wrapper.addDays(1);
    }
  });

  group.test("Padded Functions", async (test) => {
    const samples: Array<[DateWrapper, string, string]> = [
      [new DateWrapper("2023-05-02T12:00:00Z"), "05", "02"],
      [new DateWrapper("2023-05-22T12:00:00Z"), "05", "22"],
      [new DateWrapper("2023-11-02T12:00:00Z"), "11", "02"],
      [new DateWrapper("2023-11-22T12:00:00Z"), "11", "22"],
    ];
    for (const [wrapper, month, day] of samples) {
      test.equals(wrapper.paddedMonth(), month, wrapper.iso());
      test.equals(wrapper.paddedDay(), day, wrapper.iso());
    }
  });
});
