import { columns } from "./_components/columns";
import { DataTable } from "../../../components/data-table";
import { Pagination } from "@/components/pagination";
import { DataTableToolbar } from "./_components/date-table-tool";
import { IUnit } from "knex/types/tables.js";
const unit: IUnit = {
  id: 1,
  is_deleted: false,
  name: "Caixa",
  description: "Descrição",
  ratio: "1:6",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
async function getData(params: any) {
  const searchParams = new URLSearchParams(params.searchParams);

  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/units?` + searchParams
    ).then((response) => response.json());
    return response;
  } catch {
    return { pagination: {}, data: [unit] };
  }
}

export default async function PageUnits(params: any) {
  const { data, pagination } = await getData(params);

  return (
    <div className="container relative py-10 min-h-screen">
      <DataTable columns={columns} data={data} dataToolbar={DataTableToolbar} />
      <div className="flex items-center justify-end space-x-2 py-4">
        <Pagination meta={pagination} />
      </div>
    </div>
  );
}
