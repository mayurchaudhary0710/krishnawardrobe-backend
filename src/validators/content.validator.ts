import { MODALTIY } from "@constants";
import * as yup from "yup";

const createContentValidator = yup.object({
  contentType: yup.string().required(),
  image: yup.string().required(),
  title: yup.string().required(),
  subText: yup.string().required(),
  isPublish: yup.boolean().required(),
  modality: yup
    .mixed<MODALTIY>()
    .oneOf(Object.values(MODALTIY), "Invalid Modality Type"),
  linkUrl: yup.string().required(),
  description: yup.string().required(),
});

const updatecontentValidator = yup.object({
  contentType: yup.string(),
  image: yup.string(),
  title: yup.string(),
  subText: yup.string(),
  isPublish: yup.boolean(),
  modality: yup
    .mixed<MODALTIY>()
    .oneOf(Object.values(MODALTIY), "Invalid Modality Type"),
  linkUrl: yup.string(),
  description: yup.string(),
});
export { createContentValidator, updatecontentValidator };
