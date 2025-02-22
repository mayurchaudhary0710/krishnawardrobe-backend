import { SESSIONTYPE } from "@constants";
import * as yup from "yup";
export const TherapistPricingDetailsSchema = yup.object({
  priceForClient: yup
    .number()
    .nullable()
    .positive("Price for client must be a positive number")
    .typeError("Price for client must be a number"),

  userId: yup
    .string()
    .uuid("Invalid UUID format for userId")
    .nullable()
    .typeError("userId must be a valid UUID"),

  humannCommission: yup
    .number()
    .nullable()
    .positive("Humann commission must be a positive number")
    .typeError("Humann commission must be a number"),

  sessionType: yup
    .mixed()
    .oneOf(Object.values(SESSIONTYPE), "Invalid session type")
    .nullable()
    .typeError("Session type must be a valid value"),
});
