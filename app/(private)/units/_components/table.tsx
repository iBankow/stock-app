import { DataTable } from "@/components/data-table";
import { Pagination } from "@/components/pagination";
import { columns } from "./columns";
import { DataTableToolbar } from "./date-table-tool";
import UnitModel from "@/models/unit";

export default async function UnitsTable({ searchParams }: any) {
  const Unit = new UnitModel();

  const { data, pagination } = await Unit.getAllUnits(searchParams);

  return (
    <div className="flex flex-col gap-4">
      <DataTable columns={columns} data={data} dataToolbar={DataTableToolbar} />
      <Pagination meta={pagination} />
    </div>
  );
}
