import { z } from 'zod';

// Validator for creating a policy
const createPolicySchema = z.object({
  policyName: z.string().min(1, 'Policy name is required'),
  link: z.string().url('Invalid URL'),
  description: z.string().optional(),
  active: z.boolean().default(true),
});

// Validator for updating a policy (all fields optional)
const updatePolicySchema = z.object({
  policyName: z.string().optional(),
  link: z.string().url().optional(),
  description: z.string().optional(),
  active: z.boolean().optional(),
});

// Validator for deleting a policy (requires id)
const deletePolicySchema = z.object({
  id: z.number().int().positive('Invalid policy ID'),
});

// Types for DTOs
type CreatePolicyDto = z.infer<typeof createPolicySchema>;
type UpdatePolicyDto = z.infer<typeof updatePolicySchema>;
type DeletePolicyDto = z.infer<typeof deletePolicySchema>;

export const getAllPoliciesSchema = z.object({
  page: z.string().transform(Number),
  limit: z.string().transform(Number),
  search: z.string().optional(), // Global search across multiple columns
  sortBy: z
    .enum(['policyName', 'link', 'createdAt', 'updatedAt', 'id'])
    .optional(),
  sortOrder: z.enum(['ASC', 'DESC']).optional(),

  // Individual column filters (each field is optional)
  id: z.string().uuid().optional(), // UUID filter
  policyName: z.string().optional(),
  link: z.string().optional(),
  active: z
    .string()
    .transform((val) => val === 'true')
    .optional(), // Convert to boolean
});

type GetAllPoliciesQueryParams = z.infer<typeof getAllPoliciesSchema>;

export {
  createPolicySchema,
  CreatePolicyDto,
  updatePolicySchema,
  UpdatePolicyDto,
  deletePolicySchema,
  DeletePolicyDto,
  GetAllPoliciesQueryParams,
};
