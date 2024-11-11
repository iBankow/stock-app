import { Button } from "@/components/ui/button";
import { SkeletonTable } from "@/components/ui/skeletons";
import Link from "next/link";
import { Suspense } from "react";
import StockTable from "./_components/table";
import { columns } from "./_components/columns";
import { Plus } from "lucide-react";

export default async function Page(params: any) {
  const searchParams = await params.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="container relative py-10">
      <div className="flex w-full flex-col gap-4">
        <Link href={"estoque/atualizar-estoque"} passHref className="self-end">
          <Button
            variant="outline"
            className="h-8 w-full sm:w-[150px] lg:w-[250px] "
          >
            <Plus className="h-4 w-4 mr-2" />
            Atualizar Estoque
          </Button>
        </Link>
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
