import { columns } from "./_components/columns";
import { DataTable } from "../../../components/data-table";
import { Pagination } from "@/components/pagination";
import { DataTableToolbar } from "./_components/date-table-tool";
// import ProductModel from "@/models/product";

async function getData(params: any) {
  // const searchParams: any = Object.fromEntries(
  //   new URLSearchParams(params.searchParams)
  // );
  const searchParams = new URLSearchParams(params.searchParams);

  const response = await fetch(
    `http://localhost:3000/api/v1/products?` + searchParams
  ).then((response) => response.json());
  return response;

  // const Product = new ProductModel();

  // const products = await Product.getAllProducts(searchParams);

  // return products;
}

export default async function PageProducts(params: any) {
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
