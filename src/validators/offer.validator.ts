import { OFFERDISCOUNTTYPES, OFFERTYPES } from "@constants";
import { z } from "zod";

const dateStringValidator = z.string().refine(val => !isNaN(Date.parse(val)), {
  message: "Invalid date format",
});

const createOfferSchema = z.object({
  offerType: z.nativeEnum(OFFERTYPES),
  discountType: z.nativeEnum(OFFERDISCOUNTTYPES),
  discountRate: z.number().min(0, "Discount rate cannot be negative."),
  maxDiscountValue: z.number().min(0, "Max discount value cannot be negative."),
  minPaymentValue: z.number().min(0, "Min payment value cannot be negative."),
  maxUser: z.number().min(0, "Max user value cannot be negative."),
  usageLimit: z.number().min(0, "Usage limit cannot be negative."),
  offerCode: z.string(),
  startDate: dateStringValidator,
  endDate: dateStringValidator,
  description: z.string(),
  showOnHome: z.boolean().default(false),
  noOfSession: z.number().min(0),
  createdBy: z.string(),
});
const updateOfferSchema = z.object({
  offerType: z.nativeEnum(OFFERTYPES),
  discountType: z.nativeEnum(OFFERDISCOUNTTYPES),
  discountRate: z.number().min(0, "Discount rate cannot be negative."),
  maxDiscountValue: z.number().min(0, "Max discount value cannot be negative."),
  minPaymentValue: z.number().min(0, "Min payment value cannot be negative."),
  maxUser: z.number().min(0, "Max user value cannot be negative."),
  usageLimit: z.number().min(0, "Usage limit cannot be negative."),
  offerCode: z.string(),
  noOfSession: z.number().min(0),
  startDate: dateStringValidator,
  endDate: dateStringValidator,
  description: z.string(),
  showOnHome: z.boolean(),
  isActive: z.boolean(),
  updatedBy: z.string(),
  isDeleted: z.boolean(),
});

const applyOfferSchema = z.object({
  bookingId: z.string(),
  offerCode: z.string(),
});

type CreateOfferDTO = z.infer<typeof createOfferSchema>;
type UpdateOfferDTO = z.infer<typeof updateOfferSchema>;
type ApplyOfferDTO = z.infer<typeof applyOfferSchema>;
export {
  createOfferSchema,
  CreateOfferDTO,
  updateOfferSchema,
  UpdateOfferDTO,
  ApplyOfferDTO,
};
