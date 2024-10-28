import { DataTable } from "@/components/data-table";
import { Pagination } from "@/components/pagination";
import { columns } from "./columns";
import { DataTableToolbar } from "./date-table-tool";

export default async function ProductsTable({ searchParams }: any) {
  async function getData(params: any) {
    const searchParams = new URLSearchParams(params);

    const response = await fetch(
      `http://localhost:3000/api/v1/products?` + searchParams,
      {
        cache: "no-cache",
      },
    ).then((response) => response.json());

    return response;
  }

  const { data, pagination } = await getData(searchParams);

  return (
    <div className="flex flex-col gap-4">
      <DataTable columns={columns} data={data} dataToolbar={DataTableToolbar} />
      <Pagination meta={pagination} />
    </div>
  );
}
