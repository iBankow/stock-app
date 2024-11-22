import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nullifyBlankProperties(obj: any) {
  if (typeof obj === "object") {
    for (const key in obj) {
      if (obj[key] === "" || obj[key] === undefined) {
        obj[key] = null;
      } else if (typeof obj[key] === "object") {
        nullifyBlankProperties(obj[key]);
      }
    }
  }
}
