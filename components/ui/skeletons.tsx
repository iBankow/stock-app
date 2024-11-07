"use client";

import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./input";
import { Button } from "./button";

// Loading animation
// const shimmer =
//  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function SkeletonTable({ columns }: any) {
  return (
    <div className={`space-y-4`}>
      <div className="flex animate-pulse flex-col-reverse items-start justify-between gap-2 sm:flex-row sm:gap-0">
        <div className="flex w-full flex-1 items-center space-x-2">
          <Input className="h-8 w-full sm:w-[150px] lg:w-[250px]" />
        </div>
        <Button
          variant="outline"
          className="h-8 w-full sm:w-[150px] lg:w-[250px]"
        >
          <div className="mr-2 h-4 w-4 bg-foreground" />
          <div className="h-4 w-32 bg-foreground" />
        </Button>
      </div>
      <div className="rounded-md border">
        <UITable>
          <TableHeader>
            <TableRow>
              {columns.map((column: any, index: number) => (
                <TableHead key={index} className={column.meta?.headerClassName}>
                  <div className="my-1 h-4 w-full animate-pulse bg-muted"></div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((row) => (
              <TableRow key={row}>
                {columns.map((cell: any, index: number) => (
                  <TableCell
                    key={index}
                    className={cell.meta?.cellClassName}
                    width={cell.size}
                    style={{
                      maxWidth: cell.maxSize ? cell.maxSize : undefined,
                      width: cell.size ? cell.size : undefined,
                    }}
                  >
                    <div className="my-2 h-4 w-full animate-pulse bg-muted-foreground"></div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </UITable>
      </div>
    </div>
  );
}
