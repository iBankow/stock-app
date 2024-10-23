"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onChange, ...props }, ref) => {
    const [total, setTotal] = React.useState(0);

    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex  min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          onChange={(e) => {
            setTotal(e.target.value.length);
            if (onChange) onChange(e);
          }}
          rows={5}
          {...props}
        />
        <p className="absolute bottom-1 right-3 text-xs text-muted-foreground">
          {total}/255
        </p>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
