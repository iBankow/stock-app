import { columns } from "./_components/columns";
import { Suspense } from "react";
import { SkeletonTable } from "@/components/ui/skeletons";
import ProductsTable from "./_components/table";

export const metadata = {
  title: "Produtos",
};

export default async function PageProducts(params: any) {
  const searchParams = await params.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="container relative py-10">
      <Suspense
        key={query + currentPage}
        fallback={<SkeletonTable columns={columns} />}
      >
        <ProductsTable searchParams={params.searchParams} />
      </Suspense>
    </div>
  );
}
