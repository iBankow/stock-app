"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { IProduct } from "knex/types/tables.js";

import { CreateFormDialog } from "./create-form-dialog";
import { Plus } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar({}: DataTableToolbarProps<IProduct>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("name", term);
    } else {
      params.delete("name");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleClearSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("name");
    replace(`${pathname}?${params.toString()}`);
  };

  // useEffect(() => {
  //   fetch(`/api/v1/units?page=1&perPage=100`)
  //     .then((response) => response.json())
  //     .then((data) =>
  //       setUnits(
  //         data.data.map((unit: any) => ({
  //           value: unit.id,
  //           label: unit.name,
  //           icon: CircleIcon,
  //         })),
  //       ),
  //     );
  // }, []);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter products..."
          onChange={(event) => handleSearch(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
          defaultValue={searchParams.get("name")?.toString()}
        />
        {/* {table.getColumn("unit") && (
          <DataTableFacetedFilter
            column={table.getColumn("unit")}
            title="Status"
            options={units}
          />
        )} */}
        {searchParams.get("name") && (
          <Button
            variant="ghost"
            onClick={handleClearSearch}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <CreateFormDialog>
        <Plus className="mr-2 h-4 w-4" /> Criar Produto
      </CreateFormDialog>
    </div>
  );
}
