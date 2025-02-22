import { AFFIRMATIONSTATUS, BACKGROUNDTRACKSTATUS } from "@constants";
import * as yup from "yup";

const createBackgroundTrackValidator = yup.object({
  trackUrl: yup.string().required(),
  trackStatus: yup
    .mixed<BACKGROUNDTRACKSTATUS>()
    .oneOf(Object.values(BACKGROUNDTRACKSTATUS), "Invalid track status")
    .default(BACKGROUNDTRACKSTATUS.INACTIVE),
  backgroundTrackFeature: yup.boolean().nullable().default(false),
});

const createAffirmationValidator = yup.object({
  imageUrl: yup.string().required(),
  affirmationDetails: yup.string().required(),
  status: yup
    .string()
    .nullable()
    .oneOf(Object.values(AFFIRMATIONSTATUS), "Invalid affirmation status"),
});

const updateAffirmationValidator = yup.object({
  imageUrl: yup.string().required(),
  affirmationDetails: yup.string().nullable(),
  status: yup
    .string()
    .nullable()
    .oneOf(Object.values(AFFIRMATIONSTATUS), "Invalid affirmation status"),
});
export {
  createBackgroundTrackValidator,
  createAffirmationValidator,
  updateAffirmationValidator,
};
