import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { PolicyService } from './policy.service';
import { AuthGuard, RolesGuard } from '@guards';
import { Messages, ROLE } from '@constants';
import {
  CreatePolicyDto,
  createPolicySchema,
  DeletePolicyDto,
  deletePolicySchema,
  GetAllPoliciesQueryParams,
  getAllPoliciesSchema,
  UpdatePolicyDto,
  updatePolicySchema,
} from '@validators';
import { ZodValidationPipe } from '@pipes';
import { Response } from 'express';
import { handleError } from '@utils';
@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  // Create a new policy

  @Post()
  @UseGuards(AuthGuard, new RolesGuard([ROLE.ADMIN]))
  async createPolicy(
    @Res() res: Response,
    @Body(new ZodValidationPipe(createPolicySchema)) dto: CreatePolicyDto,
  ) {
    try {
      const data = await this.policyService.createPolicy(dto);
      res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: 'Policy created successfully',
        data,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  // Update a policy
  @Patch(':id')
  @UseGuards(AuthGuard, new RolesGuard([ROLE.ADMIN]))
  async updatePolicy(
    @Res() res: Response,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updatePolicySchema)) dto: UpdatePolicyDto,
  ) {
    try {
      const data = await this.policyService.updatePolicy(id, dto);
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Policy updated successfully',
        data,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  // Delete a policy
  @Delete()
  @UseGuards(AuthGuard, new RolesGuard([ROLE.ADMIN]))
  async deletePolicy(
    @Res() res: Response,
    @Body(new ZodValidationPipe(deletePolicySchema)) dto: DeletePolicyDto,
  ) {
    try {
      await this.policyService.deletePolicy(dto);
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Policy deleted successfully',
        data: null,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  // Get all policies
  @Get()
  async getAllPolicies(
    @Res() res: Response,
    @Query(new ZodValidationPipe(getAllPoliciesSchema))
    query: GetAllPoliciesQueryParams,
  ) {
    try {
      const data = await this.policyService.getAllPolicies(query);
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Policies fetched successfully',
        data,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  // Get a single policy by ID
  @Get(':id')
  async getPolicyById(@Res() res: Response, @Param('id') id: string) {
    try {
      const data = await this.policyService.getPolicyById(id);
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Policy fetched successfully',
        data,
      });
    } catch (error) {
      handleError(res, error);
    }
  }
}
