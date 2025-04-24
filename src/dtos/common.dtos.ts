export class BaseQueryParamsDTO {
  pageNum?: string;
  pageLimit?: string;
  search?: string;
  sortField?: string;
  sortOrder?: string;
  id?: string;
  indexId?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
}

export class AuditFieldsDTO {
  id?: string;
  _id?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isDeleted?: boolean;
}

export interface ResponseDTO {
  status?: boolean;
  statusCode?: number;
  message?: string;
  data?: any;
}

export interface Literal<T> {
  hebrew: T;
  arabic: T;
}
