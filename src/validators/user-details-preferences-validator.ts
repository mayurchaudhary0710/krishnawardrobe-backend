import * as Yup from "yup";
import {
  GENDER,
  SESSIONTYPEPREFERENCE,
  SIGNS,
  SPECIFICGOALS,
  THERAPISTPREFEREDLANGUAGES,
  WHATBRINGSYOUHERETODAY,
} from "@constants";

export const userDetailsPreferencesSchema = Yup.object().shape({
  userId: Yup.string(),
  previouslySeenTherapist: Yup.boolean(),
  preferedTherapistGender: Yup.array()
    .of(
      Yup.mixed<GENDER>()
        .oneOf(Object.values(GENDER), "Invalid gender preference")
        .required("Gender preference is required"),
    )
    .min(1, "At least one gender preference is required"),
  preferedTherapiLanguage: Yup.array()
    .of(
      Yup.mixed<THERAPISTPREFEREDLANGUAGES>()
        .oneOf(
          Object.values(THERAPISTPREFEREDLANGUAGES),
          "Invalid preferred language",
        )
        .required("Preferred language is required"),
    )
    .min(1, "At least one preferred language is required"),
  whatBringsYouToTherapyToday: Yup.array()
    .of(
      Yup.mixed<WHATBRINGSYOUHERETODAY>()
        .oneOf(
          Object.values(WHATBRINGSYOUHERETODAY),
          "Invalid reason for therapy",
        )
        .required("What brings you to therapy today is required"),
    )
    .min(1, "At least one reason is required"),
  specificGoalsForTherapy: Yup.array()
    .of(
      Yup.mixed<SPECIFICGOALS>()
        .oneOf(Object.values(SPECIFICGOALS), "Invalid specific therapy goal")
        .required("Specific goal for therapy is required"),
    )
    .min(1, "At least one specific goal is required"),
  currentlyExperiencingSigns: Yup.array()
    .of(
      Yup.mixed<SIGNS>()
        .oneOf(Object.values(SIGNS), "Invalid sign")
        .required("Currently experiencing signs are required"),
    )
    .min(1, "At least one sign is required"),
  therapiSessionPreference: Yup.array()
    .of(
      Yup.mixed<SESSIONTYPEPREFERENCE>()
        .oneOf(
          Object.values(SESSIONTYPEPREFERENCE),
          "Invalid Session Preferences ",
        )
        .required("Currently experiencing signs are required"),
    )
    .min(1, "At least one sign is required"),
});
