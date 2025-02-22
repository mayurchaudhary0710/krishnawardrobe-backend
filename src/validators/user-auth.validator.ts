import * as yup from "yup";
const registerUserValidator = yup.object({
  firstName: yup.string(),
  gender: yup.string(),
});

export { registerUserValidator };
