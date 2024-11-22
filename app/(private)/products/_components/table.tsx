import { DataTable } from "@/components/data-table";
import { Pagination } from "@/components/pagination";
import { columns } from "./columns";
import { DataTableToolbar } from "./date-table-tool";
import ProductModel from "@/models/product";

export default async function ProductsTable({ searchParams }: any) {
  const Product = new ProductModel();

  const { data, pagination } = await Product.getAllProducts(searchParams);

  return (
    <div className="flex flex-col gap-4">
      <DataTable columns={columns} data={data} dataToolbar={DataTableToolbar} />
      <Pagination meta={pagination} />
    </div>
  );
}
