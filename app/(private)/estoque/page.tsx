import { Button } from "@/components/ui/button";
import { SkeletonTable } from "@/components/ui/skeletons";
import Link from "next/link";
import { Suspense } from "react";
import StockTable from "./_components/table";
import { columns } from "./_components/columns";

export default async function Page(params: any) {
  const searchParams = await params.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="container relative min-h-screen">
      <div className="min-h-screen w-full">
        <Button className="font-bold">
          <Link href={"estoque/atualizar-estoque"}>Atualizar Estoque</Link>
        </Button>
        <Suspense
          key={query + currentPage}
          fallback={<SkeletonTable columns={columns} />}
        >
          <StockTable searchParams={params.searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
