import { col, fn, ProjectionAlias } from "sequelize";

export const pagination = async (
  paramsQuery,
  search,
  order = [],
  query,
  transform,
) => {
  try {
    const limit = parseInt(paramsQuery?.pageLimit ?? 10, 10);
    const page = parseInt(paramsQuery?.pageNum ?? 1, 10);
    const options = {
      offset: getOffset(page, limit),
      ...(query || {}),
      limit,
    };

    if (Object.keys(search).length) {
      options.where = {
        ...(query.where || {}),
        ...(search.where || {}),
      };
    }

    if (order && order.length) {
      options.order = order;
    }
    const { count, rows } = await paramsQuery.model.findAndCountAll(options);

    const totalPages = Math.ceil(count / limit);
    const transformedRows =
      transform && typeof transform === "function" ? transform(rows) : rows;

    return {
      currentPage: page,
      totalRecords: count,
      totalPages,
      data: transformedRows,
    };
  } catch (error) {
    throw error;
  }
};

const getOffset = (page, limit) => {
  return page * limit - limit;
};

export const ifNull = (columnName: string, value: any): ProjectionAlias => {
  return [fn("COALESCE", col(columnName), value), columnName];
};
