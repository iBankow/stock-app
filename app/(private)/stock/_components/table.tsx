import { DataTable } from "@/components/data-table";
import { Pagination } from "@/components/pagination";
import { columns } from "./columns";
import ProductHistoriesModel from "@/models/product_histories";

export default async function StockTable({ searchParams }: any) {
  const ProductHistories = new ProductHistoriesModel();

  const { data, pagination } =
    await ProductHistories.getProductHistories(searchParams);

  return (
    <div className="flex flex-col gap-4">
      <DataTable columns={columns} data={data} />
      <Pagination meta={pagination} />
    </div>
  );
}
