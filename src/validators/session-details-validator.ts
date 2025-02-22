import * as Yup from "yup";
const timingSchema = Yup.object().shape({
  timing: Yup.array()
    .of(
      Yup.object().shape({
        day: Yup.string()
          .matches(
            /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/,
            "Invalid day name",
          )
          .required("Day is required"),
        slots: Yup.array()
          .of(
            Yup.string()
              .matches(
                /^(0?[1-9]|1[0-9]|2[0-3]):?([0-5][0-9])?-(0?[1-9]|1[0-9]|2[0-3]):?([0-5][0-9])?$/,
                "Slots must be in the format 'H-H', 'H:MM-H:MM', or 'H:MM-H'",
              )
              .test(
                "valid-slot-range",
                "Slot range must be min-max",
                (slot) => {
                  const [start, end] = slot.split("-");
                  const startParts = start.split(":").map(Number);
                  const endParts = end.split(":").map(Number);
                  const startMinutes =
                    startParts[0] * 60 + (startParts[1] || 0);
                  const endMinutes = endParts[0] * 60 + (endParts[1] || 0);
                  return startMinutes < endMinutes;
                },
              ),
          )
          .test(
            "no-conflicting-slots",
            "Slots have conflicting timings on the same day",
            (slots) => {
              if (!slots) return true;
              const ranges = slots.map((slot) => {
                const [start, end] = slot.split("-");
                const startParts = start.split(":").map(Number);
                const endParts = end.split(":").map(Number);
                return {
                  start: startParts[0] * 60 + (startParts[1] || 0),
                  end: endParts[0] * 60 + (endParts[1] || 0),
                };
              });
              for (let i = 0; i < ranges.length; i++) {
                for (let j = i + 1; j < ranges.length; j++) {
                  if (
                    (ranges[i].start < ranges[j].end &&
                      ranges[i].end > ranges[j].start) ||
                    (ranges[j].start < ranges[i].end &&
                      ranges[j].end > ranges[i].start)
                  ) {
                    return false;
                  }
                }
              }
              return true;
            },
          ),
        id: Yup.string().optional(),
      }),
    )
    .test("no-duplicate-days", "Duplicate days are not allowed", (timing) => {
      const days = timing.map((entry) => entry.day);
      return new Set(days).size === days.length;
    })
    .required("Timing is required"),
});

export { timingSchema };
