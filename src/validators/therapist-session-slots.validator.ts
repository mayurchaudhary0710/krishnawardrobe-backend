import * as yup from "yup";

const validateTimeRange = (timeRange: string) => {
  const regex = /^([0-9]|1[0-9]|2[0-3])-([0-9]|1[0-9]|2[0-3])$/;
  if (!regex.test(timeRange)) {
    throw new Error(`Invalid time range format: ${timeRange}`);
  }

  const [start, end] = timeRange.split("-").map(Number);
  if (start >= end) {
    throw new Error(
      `Invalid time range: start (${start}) must be less than end (${end})`,
    );
  }
  return { start, end };
};

const validateAndCheckConflicts = (timeRanges: string[]) => {
  const parsedRanges = timeRanges.map(validateTimeRange);
  for (let i = 0; i < parsedRanges.length; i++) {
    for (let j = i + 1; j < parsedRanges.length; j++) {
      const range1 = parsedRanges[i];
      const range2 = parsedRanges[j];

      if (range1.start < range2.end && range1.end > range2.start) {
        throw new Error(
          `Conflicting time ranges: ${timeRanges[i]} and ${timeRanges[j]}`,
        );
      }
    }
  }
};

const createTherapistSessionSlotValidator = yup.object().test({
  name: "validate-dynamic-weekdays",
  message: "Invalid or conflicting time ranges for one or more weekdays",
  test(value) {
    if (typeof value !== "object" || value === null) {
      throw new Error("Invalid input format");
    }
    for (const [weekDay, timeRangesArray] of Object.entries(value)) {
      if (!Array.isArray(timeRangesArray)) {
        throw new Error(
          `Invalid data for ${weekDay}: must be an array of strings`,
        );
      }

      const allTimeRanges = timeRangesArray.flatMap((val) => val.split(","));
      validateAndCheckConflicts(allTimeRanges);
    }

    return true;
  },
});

export { createTherapistSessionSlotValidator };
