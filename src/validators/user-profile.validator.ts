import { GENDER, REALTIONSTATUS, WORKSTATUS } from "@constants";
import * as yup from "yup";

const dateStringValidator = yup
  .string()
  .nullable()
  .notRequired()
  .matches(
    /^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/,
    "Date must be in the format DD/MM/YYYY",
  )
  .test("is-valid-date", "Date is not valid", (value) => {
    if (!value) return true;
    const [day, month, year] = value.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  });

const userProfileUpdateValidator = yup.object({
  firstName: yup.string(),
  gender: yup.mixed<GENDER>().oneOf(Object.values(GENDER)),
  profilePicture: yup.string(),
  birthDate: dateStringValidator,
  workStatus: yup
    .mixed<WORKSTATUS>()
    .oneOf(Object.values(WORKSTATUS))
    .nullable(),
  realtionStatus: yup
    .mixed<REALTIONSTATUS>()
    .oneOf(Object.values(REALTIONSTATUS))
    .nullable(),
});

export { userProfileUpdateValidator };
