import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import {
  CreatePolicyDto,
  UpdatePolicyDto,
  DeletePolicyDto,
  createPolicySchema,
  deletePolicySchema,
  GetAllPoliciesQueryParams,
  getAllPoliciesSchema,
} from '@validators';
import { literal, Op, WhereOptions } from 'sequelize';
import { Policy } from 'src/models/Policy.model';

@Injectable()
export class PolicyService {
  constructor() {}

  // Create a policy
  async createPolicy(dto: CreatePolicyDto): Promise<Policy> {
    // Validate input
    const validatedData = createPolicySchema.parse(dto);

    // Check if policy name or link already exists
    const existingPolicy = await Policy.findOne({
      where: {
        policyName: validatedData.policyName,
      },
    });

    if (existingPolicy) {
      throw new ConflictException('Policy with this name already exists');
    }

    return await Policy.create(validatedData);
  }

  // Update an existing policy
  async updatePolicy(id: string, policyData: UpdatePolicyDto): Promise<Policy> {
    // Validate input

    const policy = await Policy.findByPk(id);
    if (!policy) {
      throw new NotFoundException('Policy not found');
    }

    await policy.update(policyData);
    return policy;
  }

  // Delete a policy
  async deletePolicy(dto: DeletePolicyDto) {
    // Validate input
    const validatedData = deletePolicySchema.parse(dto);

    const policy = await Policy.findByPk(validatedData.id);

    await policy.destroy();
    return policy;
  }
  // List all policies with pagination, filtering, searching, and sorting
  async getAllPolicies(queryParams: GetAllPoliciesQueryParams) {
    const validatedQuery = queryParams;

    const {
      page,
      limit,
      search,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
      id,
      policyName,
      link,
      active,
    } = validatedQuery;

    // Base where condition
    let whereCondition: any = {};

    // Apply global search (searching in multiple columns)
    if (search) {
      whereCondition = {
        [Op.or]: [
          { policyName: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
          { link: { [Op.iLike]: `%${search}%` } },
          literal(`CAST("id" AS TEXT) ILIKE '%${search}%'`),
        ],
      };
    }

    // Apply individual column filters (if provided)
    if (id) {
      whereCondition[Op.and] = [literal(`CAST("id" AS TEXT) ILIKE '%${id}%'`)];
    }
    if (policyName)
      whereCondition.policyName = { [Op.iLike]: `%${policyName}%` };
    if (link) whereCondition.link = { [Op.iLike]: `%${link}%` };
    if (active !== undefined) whereCondition.active = active;

    // Fetch data with pagination
    const { rows: policies, count } = await Policy.findAndCountAll({
      where: whereCondition,
      limit,
      offset: (page - 1) * limit,
      order: [[sortBy, sortOrder]],
    });

    return {
      totalRecords: count,
      currentPage: page,
      limit,
      totalPages: Math.ceil(count / limit),
      data: policies,
    };
  }

  async getPolicyById(id: string): Promise<Policy> {
    const policy = await Policy.findByPk(id);
    if (!policy) {
      throw new NotFoundException('Policy not found');
    }
    return policy;
  }
}
