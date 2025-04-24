import { z } from 'zod';

const createCategorySchema = z.object({
  id: z.string().nullable(),
  categoryName: z.string().min(1, 'Category name is required'),
});

const updateCategorySchema = z.object({
  categoryName: z.string().min(1, 'Category name is required').optional(),
});

const deleteCategorySchema = z.object({
  id: z.string().uuid('Invalid category ID'),
});

const getAllCategoriesSchema = z.object({
  search: z.string().optional(),

  id: z.string().uuid().optional(),

  categoryNumber: z.coerce.number().optional(),

  categoryName: z.string().optional(),

  createdAtFrom: z
    .preprocess(
      (val) =>
        typeof val === 'string' || typeof val === 'number'
          ? new Date(val)
          : val,
      z.date(),
    )
    .optional(),
  createdAtTo: z
    .preprocess(
      (val) =>
        typeof val === 'string' || typeof val === 'number'
          ? new Date(val)
          : val,
      z.date(),
    )
    .optional(),

  // Pagination
  limit: z.coerce.number().int().optional().default(10),
  offset: z.coerce.number().int().optional().default(0),
});

type GetAllCategoriesDto = z.infer<typeof getAllCategoriesSchema>;
type GetAllCategoriesQueryParams = z.infer<typeof getAllCategoriesSchema>;
type CreateCategoryDTO = z.infer<typeof createCategorySchema>;
type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>;
type DeleteCategoryDTO = z.infer<typeof deleteCategorySchema>;

export {
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
  UpdateCategoryDTO,
  DeleteCategoryDTO,
  CreateCategoryDTO,
  GetAllCategoriesQueryParams,
  getAllCategoriesSchema,
  GetAllCategoriesDto,
};
