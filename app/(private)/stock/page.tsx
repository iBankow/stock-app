import { Button } from "@/components/ui/button";
import { SkeletonTable } from "@/components/ui/skeletons";
import Link from "next/link";
import { Suspense } from "react";
import StockTable from "./_components/table";
import { columns } from "./_components/columns";
import { Plus } from "lucide-react";

export const metadata = {
  title: "Estoque",
};

export default async function Page(params: any) {
  const searchParams = await params.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="container relative py-10">
      <div className="flex w-full flex-col gap-4">
        <Link
          href={"stock/update-stock"}
          passHref
          className="w-full self-end sm:w-[250px]"
        >
          <Button variant="outline" className="h-8 w-full">
            <Plus className="mr-2 h-4 w-4" />
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
