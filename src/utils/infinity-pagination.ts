import { IPaginationOptions } from './types/pagination-options';

export const infinityPagination = <T>(
  data: T[],
  options: IPaginationOptions,
) => {
  return {
    data,
    count: data.length,
    hasNextPage: data.length === options.limit,
  };
};
