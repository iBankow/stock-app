import { DataTable } from "@/components/data-table";
import { Pagination } from "@/components/pagination";
import { columns } from "./columns";

export default async function StockTable({ searchParams }: any) {
  async function getData(params: any) {
    const searchParams = new URLSearchParams(params);

    const response = await fetch(
      `http://localhost:3000/api/v1/update-stock?` + searchParams,
      {
        cache: "no-cache",
      },
    ).then((response) => response.json());

    return response;
  }

  const { data, pagination } = await getData(searchParams);

  return (
    <div className="flex flex-col gap-4">
      <DataTable columns={columns} data={data} />
      <Pagination meta={pagination} />
    </div>
  );
}
