import { Suspense } from "react";
import { SkeletonTable } from "@/components/ui/skeletons";
import { columns } from "./_components/columns";
import UnitsTable from "./_components/table";

export const metadata = {
  title: "Unidades",
};

export default async function PageUnits(params: any) {
  const searchParams = await params.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="container relative py-10">
      <Suspense
        key={query + currentPage}
        fallback={<SkeletonTable columns={columns} />}
      >
        <UnitsTable searchParams={params.searchParams} />
      </Suspense>
    </div>
  );
}
