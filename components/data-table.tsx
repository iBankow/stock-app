"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface IDataToolbarProps<TData> {
  table: Table<TData>;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | any[];
  dataToolbar?: React.ElementType<IDataToolbarProps<TData>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  dataToolbar: Toolbar,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      {Toolbar && <Toolbar table={table} />}
      <div className="min-h-[600px] rounded-md border">
        <UITable
          className={cn(`${table.getRowModel().rows?.length < 1 && "h-[600px]"}`)}
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={header.column.columnDef.meta?.headerClassName}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody
            className={cn(
              `${table.getRowModel().rows?.length < 10 && "table-table-last-row"}`,
            )}
          >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.original.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cell.column.columnDef.meta?.cellClassName}
                      width={cell.column.columnDef.size}
                      style={{
                        maxWidth:
                          cell.column.columnDef.maxSize &&
                          cell.column.columnDef.maxSize < 1000
                            ? cell.column.columnDef.maxSize
                            : undefined,
                        width: cell.column.columnDef.size
                          ? cell.column.columnDef.size
                          : undefined,
                        height: "55px",
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </UITable>
      </div>
    </div>
  );
}
