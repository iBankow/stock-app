import { columns } from "./_components/columns";
import { DataTable } from "../../../components/data-table";
import { Pagination } from "@/components/pagination";
import { DataTableToolbar } from "./_components/date-table-tool";

async function getData(params: any) {
  const searchParams = new URLSearchParams(params.searchParams);

  const response = await fetch(
    `http://localhost:3000/api/v1/units?` + searchParams,
  ).then((response) => response.json());

  return response;
}

export default async function PageUnits(params: any) {
  const { data, pagination } = await getData(params);

  return (
    <div className="container relative min-h-screen py-10">
      <DataTable columns={columns} data={data} dataToolbar={DataTableToolbar} />
      <Pagination meta={pagination} />
    </div>
  );
}
