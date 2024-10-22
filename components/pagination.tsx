"use client";
import {
  Pagination as SHPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/use-pagination";
import { usePathname, useSearchParams } from "next/navigation";

interface IPaginationProps {
  total: number;
  limit?: number;
  page: number;
}

export function Pagination(props: IPaginationProps) {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const { pages, isCurrentPage } = usePagination({
    limit: props.limit || 6,
    page: Number(searchParams.get("page")) || 1,
    total: props.total,
  });

  const generateUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(page));

    return pathName + "?" + params.toString();
  };

  return (
    <SHPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="?page=1" />
        </PaginationItem>
        {pages.map((page) => {
          if (page === -10) {
            return (
              <PaginationItem key={page}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          if (page === -20) {
            return (
              <PaginationItem key={page}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={isCurrentPage(page)}
                href={generateUrl(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext href="?page=2" />
        </PaginationItem>
      </PaginationContent>
    </SHPagination>
  );
}
