import { Messages } from '@constants';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { CustomError } from '@utils';
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
  DeleteCategoryDTO,
  GetAllCategoriesDto,
} from '@validators';
import { literal, Op } from 'sequelize';
import { Category } from 'src/models/Category.model';

@Injectable()
export class CategoryService {
  constructor() { }

  async createCategory(dto: CreateCategoryDTO) {
    const isCategoryExists = await Category.findOne({
      where: {
        categoryName: dto.categoryName.toLowerCase().replace(/\s+/g, ''),
      },
    });
    if (isCategoryExists) {
      throw new BadRequestException('Category name already exists');
    }
    return await Category.create(dto);
  }

  async updateCategory(id: string, dto: UpdateCategoryDTO) {
    const category = await Category.findByPk(id);
    if (!category || category?.isDeleted)
      throw new NotFoundException('Category not found');

    if (dto?.categoryName) {
      const existingCategory = await Category.findOne({
        where: {
          categoryName: dto.categoryName.toLowerCase().replace(/\s/g, ''),
        },
      });

      if (existingCategory && existingCategory.id !== id) {
        throw new BadRequestException('Category name already exists');
      }
    }

    await category.update(dto);
    return category;
  }

  async deleteCategory(dto: DeleteCategoryDTO) {
    const category = await Category.findByPk(dto.id, {
      // include: [SubCategory, Order],
    });

    // if (!category) throw new NotFoundException('Category not found');
    //
    // if (category.subCategories.length > 0 || category.orders.length > 0) {
    //   throw new BadRequestException('Cannot delete category associated with subcategories or orders');
    // }

    await category.destroy();
    return { message: 'Category deleted successfully' };
  }

  async getAllCategories(query: GetAllCategoriesDto) {
    const {
      search,
      id,
      categoryNumber,
      categoryName,
      createdAtFrom,
      createdAtTo,
      limit,
      offset,
    } = query;

    let where: any = {};
    const andCondition: any = [];
    // If a general search is provided, apply it on categoryName (like condition)
    if (search) {
      // Note: If you want to combine this with an exact categoryName filter,
      // you might need to use an Op.and condition.
      where = {
        [Op.or]: [
          { categoryName: { [Op.iLike]: `%${search}%` } },
          literal(`CAST("id" AS TEXT) ILIKE '%${search}%'`),
          literal(`CAST("categoryNumber" AS TEXT) ILIKE '%${search}%'`),
        ],
      };
    }

    // Apply individual column filters
    if (id) {
      andCondition.push(literal(`CAST("id" AS TEXT) ILIKE '%${id}%'`));
    }
    if (categoryNumber) {
      andCondition.push(
        literal(`CAST("categoryNumber" AS TEXT) ILIKE '%${categoryNumber}%'`),
      );
    }

    if (categoryName) {
      // This is an exact match filter for categoryName
      where.categoryName = {
        [Op.iLike]: `%${categoryName}%`,
      };
    }

    // Process createdAt date filters
    if (createdAtFrom && createdAtTo) {
      where.createdAt = { [Op.between]: [createdAtFrom, createdAtTo] };
    } else if (createdAtFrom) {
      where.createdAt = { [Op.gte]: createdAtFrom };
    } else if (createdAtTo) {
      where.createdAt = { [Op.lte]: createdAtTo };
    }

    if (andCondition.length) {
      where[Op.and] = andCondition;
    }
    // Fetch records with pagination; if limit is -1, do not limit the query.
    const categories = await Category.findAll({
      where,
      limit: limit === -1 ? undefined : limit,
      offset,
    });

    return categories;
  }

  async createBulkCategories(categories: CreateCategoryDTO[]) {
    const duplicateCategories = await Category.findAll({
      where: {
        categoryName: categories.map((cat) =>
          cat.categoryName.toLowerCase().replace(/\s+/g, ''),
        ),
      },
      attributes: ['categoryName'],
    });
    if (duplicateCategories.length) {
      throw new CustomError(
        HttpStatus.BAD_REQUEST,
        `Categories ${duplicateCategories.map((_) => _.categoryName).join(' ')} ` +
        Messages.recordAlreadyExist,
      );
    }

    const bulkCategories = categories.map(({ id, categoryName }) => {
      return {
        ...(!!id ? { id } : {}),
        categoryName
      }
    })
    const bulkCreatedCategories = await Category.bulkCreate(bulkCategories, {
      updateOnDuplicate: ["categoryName"]
    })
    return bulkCreatedCategories
  }
}
