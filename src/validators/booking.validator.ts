import * as yup from "yup";
import moment from "moment";
import { SESSIONTYPE } from "@constants";

const addBookingValidator = yup.object({
  date: yup
    .string()
    .test("is-date-valid", "Date should not be in the past", (value) => {
      return moment(value, "YYYY-MM-DD", true).isSameOrAfter(moment(), "day");
    })
    .required("Date is required"),
  therapistId: yup.string().required(),
  scheduleSlotId: yup
    .array()
    .of(yup.string().uuid("Invalid scheduleSlotId format"))
    .required("Schedule Slot IDs are required"),
  sessionType: yup
    .mixed<SESSIONTYPE>()
    .oneOf(Object.values(SESSIONTYPE))
    .required(),
});

const updateBookingValidator = yup.object({
  date: yup
    .string()
    .test("is-date-valid", "Date should not be in the past", (value) => {
      return moment(value, "YYYY-MM-DD", true).isSameOrAfter(moment(), "day");
    })
    .required("Date is required"),
  newScheduleSlotId: yup
    .array()
    .of(yup.string().uuid("Invalid newScheduleSlotId format"))
    .required("Schedule Slot IDs are required"),
  reasonForReshedule: yup.string().nullable().default("").notRequired(),
});

export { updateBookingValidator, addBookingValidator };
