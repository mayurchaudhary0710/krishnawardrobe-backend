import {
  BOOKING_OR_SESSION_RELATED,
  ISSUE_STATUS,
  ISSUETYPE,
  PAYMENT_RELATED,
  TECHNICAL_ISSUE,
  THERAPIST_CONCERN,
} from "@constants";
import * as yup from "yup";
const SPECIFIC_ISSUE_ENUM = yup
  .string()
  .oneOf([
    ...Object.values(PAYMENT_RELATED),
    ...Object.values(THERAPIST_CONCERN),
    ...Object.values(BOOKING_OR_SESSION_RELATED),
    ...Object.values(TECHNICAL_ISSUE),
  ]);
const createIssueReportValidator = yup.object({
  issueType: yup.mixed<ISSUETYPE>().oneOf(Object.values(ISSUETYPE)).required(),
  therapistId: yup.string().nullable(),
  bookingId: yup.string().nullable(),
  message: yup.string().required(),
  status: yup
    .mixed<ISSUE_STATUS>()
    .oneOf(Object.values(ISSUE_STATUS))
    .nullable(),
  specificIssue: SPECIFIC_ISSUE_ENUM.required(),
});

const createIssueReportAdmin = yup.object({
  issueType: yup.mixed<ISSUETYPE>().oneOf(Object.values(ISSUETYPE)).required(),
  therapistId: yup.string().required(),
  bookingId: yup.string().required(),
  message: yup.string().required(),
  status: yup
    .mixed<ISSUE_STATUS>()
    .oneOf(Object.values(ISSUE_STATUS))
    .nullable(),
  specificIssue: SPECIFIC_ISSUE_ENUM.required(),
});

export { createIssueReportValidator, createIssueReportAdmin };
