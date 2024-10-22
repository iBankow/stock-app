import { IProduct } from "knex/types/tables.js";
import { columns } from "./_components/columns";
import { DataTable } from "../../../components/data-table";
import { Pagination } from "@/components/pagination";
import { DataTableToolbar } from "./_components/date-table-tool";

interface IPagination<T> {
  data: T[];
  meta: {
    current_page: number;
    per_page: number;
    last_page: number;
    first_page: number;
    total: number;
  };
}

async function getData(): Promise<IPagination<IProduct>> {
  return {
    data: [
      {
        id: 1,
        name: "Nome Produto",
        description: "description",
        is_deleted: false,
        stock: 3,
        user_id: 1,
        created_at: "2024-10-22T13:51:24.159Z",
        updated_at: "2024-10-22T13:51:24.159Z",
        unit: {
          name: "Unidade",
        },
      },
      {
        id: 2,
        name: "Nome Produto 2",
        description: "description",
        is_deleted: false,
        stock: 10,
        user_id: 1,
        created_at: "2024-10-22T13:51:47.830Z",
        updated_at: "2024-10-22T13:51:47.830Z",
        unit: {
          name: "Unidade 2",
        },
      },
      {
        id: 3,
        name: "Nome Produto 3",
        description: "description",
        is_deleted: false,
        stock: 5,
        user_id: 1,
        created_at: "2024-10-22T13:52:15.918Z",
        updated_at: "2024-10-22T13:52:15.918Z",
      },
      {
        id: 4,
        name: "Nome Produto 4",
        description: "description",
        is_deleted: false,
        stock: 15,
        user_id: 1,
        created_at: "2024-10-22T13:52:15.918Z",
        updated_at: "2024-10-22T13:52:15.918Z",
      },
    ],
    meta: {
      current_page: 1,
      per_page: 10,
      last_page: 1,
      first_page: 1,
      total: 4,
    },
  };
}

export default async function PageProducts() {
  const { data, meta } = await getData();

  return (
    <div className="container relative py-10 min-h-screen">
      <DataTable columns={columns} data={data} dataToolbar={DataTableToolbar} />
      <div className="flex items-center justify-end space-x-2 py-4">
        <Pagination
          page={meta.current_page}
          total={meta.total}
          limit={meta.per_page}
        />
      </div>
    </div>
  );
}
