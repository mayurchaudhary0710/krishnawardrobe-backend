import * as yup from "yup";

const feedbackValidator = yup.object({
  bookingId: yup.string(),
  empathetic: yup.string(),
  nonJudgmental: yup.string(),
  trustworthy: yup.string(),
  engagedListener: yup.string(),
  ethical: yup.string(),
  approachable: yup.string(),
  additionalComment: yup.string(),
});

export { feedbackValidator };
