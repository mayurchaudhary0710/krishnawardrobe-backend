import moment from "moment";
export function formatDate(
  dateString: string | Record<string, any>,
  withTime: boolean = true,
) {
  if (!dateString) return {};
  const format = "%d.%m.%Y";
  return {
    $cond: {
      if: { $gte: [dateString, null] },
      then: {
        $dateToString: {
          format,
          date: { $toDate: dateString },
        },
      },
      else: "",
    },
  };
}

export function calculateAge(dateOfBirth: Date) {
  const dob = moment(dateOfBirth);
  const today = moment();
  return today.diff(dob, "years"); // Calculate age in years
}
