
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UsePipes } from '@nestjs/common';
import { CategoryService } from './category.service';
import { getAllCategoriesSchema, GetAllCategoriesDto, createCategorySchema, CreateCategoryDTO, updateCategorySchema, UpdateCategoryDTO } from '@validators';
import { ZodValidationPipe } from '@pipes';
import { handleError } from '@utils';
import { Response } from 'express';
import { Messages } from '@constants';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  async createCategory(
    @Res() res: Response,
    @Body(new ZodValidationPipe(createCategorySchema)) body: CreateCategoryDTO
  ) {
    try {
      const data = await this.categoryService.createCategory(body);
      res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: Messages.successMessage,
        data
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  @Get()
  async getAllCategories(
    @Res() res: Response,
    @Query(new ZodValidationPipe(getAllCategoriesSchema)) query: GetAllCategoriesDto
  ) {
    try {
      const data = await this.categoryService.getAllCategories(query);
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: Messages.successMessage,
        data
      });
    } catch (error) {
      handleError(res, error);
    }
  }


  @Put(':id')
  async updateCategory(
    @Res() res: Response,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateCategorySchema)) body: UpdateCategoryDTO
  ) {
    try {
      const data = await this.categoryService.updateCategory(id, body);
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: Messages.successMessage,
        data
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  @Delete(':id')
  async deleteCategory(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = await this.categoryService.deleteCategory({
        id
      });
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: Messages.successMessage,
        data
      });
    } catch (error) {
      handleError(res, error);
    }
  }
}

