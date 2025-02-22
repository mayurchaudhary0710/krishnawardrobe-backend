import * as moment from "moment";

function getWeekdayDate(weekday: string) {
  const today = moment();

  const weekdaysMap = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7,
  };

  const desiredWeekday = weekdaysMap[weekday];

  if (!desiredWeekday) {
    throw new Error("Invalid weekday provided");
  }

  const startOfWeek = today.clone().startOf("isoWeek");

  const weekdayDateThisWeek = startOfWeek
    .clone()
    .add(desiredWeekday - 1, "days");

  if (today.isSameOrAfter(weekdayDateThisWeek)) {
    return weekdayDateThisWeek.clone().add(1, "week");
  }

  return weekdayDateThisWeek;
}

export { getWeekdayDate };
