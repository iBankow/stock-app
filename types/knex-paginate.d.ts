import "knex";

interface IPaginateParams {
  perPage: number;
  currentPage: number;
}

interface IPagination<Data> {
  data: Data[];
  pagination: IBasePagination;
}

interface IBasePagination {
  total: number;
  current_page: number;
  per_page: number;
  last_page: number;
  prev_page: number;
  next_page: number;
}

declare module "knex" {
  namespace Knex {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-object-type
    interface QueryBuilder<TRecord extends {} = any, TResult = any> {
      paginate(
        perPage: number,
        currentPage: number
      ): Knex.QueryBuilder<TRecord, IPagination<TRecord>>;
    }
  }
}

export function attachPaginate(): void;
