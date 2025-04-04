import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const navigate = useRouter();
  const SEARHPARAM = searchParams.get("order_" + column.id);

  useEffect(() => {
    const sort = searchParams.get("order_" + column.id);
    if (sort) {
      column.toggleSorting(sort === "desc");
    }
  }, [searchParams, column]);

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const toggleSorting = (sort: boolean) => {
    const params = new URLSearchParams(searchParams);
    params.set("order_" + column.id, sort ? "desc" : "asc");

    const url = pathName + "?" + params.toString();

    column.toggleSorting(sort);

    navigate.replace(url);
  };

  const clearSorting = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("order_" + column.id);

    column.clearSorting();

    const url = pathName + "?" + params.toString();
    navigate.replace(url);
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {SEARHPARAM === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : SEARHPARAM === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => {
              toggleSorting(false);
            }}
          >
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              toggleSorting(true);
            }}
          >
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          {SEARHPARAM && (
            <DropdownMenuItem onClick={clearSorting}>
              <Cross2Icon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Limpar
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
