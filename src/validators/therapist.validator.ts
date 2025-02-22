import { GENDER, PRONOUNS, SESSIONTYPE, THERAPISTROLE } from "@constants";
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

const therapistPriceValidator = yup.object({
  sessionType: yup
    .mixed<SESSIONTYPE>()
    .oneOf(Object.values(SESSIONTYPE))
    .required(),
  sessionPriceForClient: yup.number().required(),
  humanCommision: yup
    .number()
    .required()
    .min(1, "Human Commission must be at least 1")
    .max(100, "Human Commission must be at most 100"),
  humanEarning: yup.number().required(),
  therapistEarning: yup.number().required(),
});
const updateTherapistPriceValidator = yup.object({
  id: yup.string().required(),
  isDiscoveryCall: yup.boolean().nullable(),
  sessionType: yup
    .mixed<SESSIONTYPE>()
    .oneOf(Object.values(SESSIONTYPE))
    .required(),
  sessionPriceForClient: yup.number().required(),
  humanCommision: yup
    .number()
    .required()
    .min(1, "Human Commission must be at least 1")
    .max(100, "Human Commission must be at most 100"),
  humanEarning: yup.number().required(),
  therapistEarning: yup.number().required(),
});
const createTherapistValidator = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  dateOfBirth: dateStringValidator.required(),
  joiningDate: dateStringValidator.required(),
  profilePicture: yup.string(),
  therapistRole: yup
    .mixed<THERAPISTROLE>()
    .oneOf(Object.values(THERAPISTROLE))
    .required(),
  uploadContract: yup.string(),
  pricingDetails: yup.array(therapistPriceValidator).required(),
  isDiscoveryCall: yup.boolean().nullable(),
});

const udpateTherapistValidator = yup.object({
  firstName: yup.string().nullable(),
  lastName: yup.string().nullable(),
  gender: yup.mixed<GENDER>().oneOf(Object.values(GENDER)).nullable(),
  phoneNumber: yup.string().nullable(),
  dateOfBirth: dateStringValidator.nullable(),
  joiningDate: dateStringValidator.nullable(),
  profilePicture: yup.string().nullable(),
  therapistRole: yup
    .mixed<THERAPISTROLE>()
    .oneOf(Object.values(THERAPISTROLE))
    .nullable(),
  uploadContract: yup.string().nullable(),
  pronouns: yup.mixed<PRONOUNS>().oneOf(Object.values(PRONOUNS)).nullable(),
  location: yup.string().nullable(),
  academicBackground: yup.object().nullable(),
  qualification: yup.object().nullable(),
  moreAbout: yup.object().nullable(),
  workExperience: yup.object().nullable(),
  pricingDetails: yup.array(updateTherapistPriceValidator).nullable(),
  issuesSpecializedIn: yup.array(yup.string()).nullable(),
  languagesSpoken: yup.array(yup.string()).nullable(),
  favoriteBooks: yup.array(yup.string()).nullable(),
  hobbies: yup.array(yup.string()).nullable(),
  religiousChoice: yup.string().nullable(),
  whatMakesUsHumann: yup.array(yup.string()).nullable(),
  snapshots: yup.array(yup.string()).nullable(),
  updatedBy: yup.string().nullable(),
  comfortWithDifferentAgeGroups: yup.array(yup.string()).nullable(),
  modalities: yup.array(yup.string()).nullable(),
  whyILoveBeingTherapist: yup.string().nullable(),
  inMySessionsYouWouldHearMeSay: yup.string().nullable(),
  changeStatus: yup.boolean().nullable(),
  nameOfOrganization: yup.string().nullable(),
  anyAdditionalPractice: yup.string().nullable(),
  isPractiseAlternativeTherapy: yup.boolean().nullable(),
  specializationsTrainingCertifications: yup.array(yup.string()).nullable(),
  rciId: yup.string().nullable(),
  ifscCode: yup.string().nullable(),
  accountNumber: yup.string().nullable(),
  bankBranchName: yup.string().nullable(),
  whatToExpectFromTherapy: yup.string().nullable(),
  additionalPhotos: yup.array(yup.string()).nullable(),
  totalWorkExperience: yup.string().nullable(),
  availabilityOnWeekends: yup.array(yup.string()).nullable(),
  isDiscoveryCall: yup.boolean().nullable(),
  isProfileSetup: yup.boolean().nullable(),
  accountHolderName: yup.string().nullable(),
});

type UpdateTherapistDTO = yup.InferType<typeof udpateTherapistValidator>;

export {
  dateStringValidator,
  createTherapistValidator,
  udpateTherapistValidator,
  UpdateTherapistDTO,
};
