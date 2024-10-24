"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link
        href="/dashboard"
        className="mr-4 flex items-center space-x-2 lg:mr-6"
      >
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block">Tábua Criada</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/products"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/products" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Produtos
        </Link>
        <Link
          href="/units"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/units")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Unidades
        </Link>
        <Link
          href="/blocks"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/blocks")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Blocks
        </Link>
        <Link
          href="/charts"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/component/chart") ||
              pathname?.startsWith("/charts")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Charts
        </Link>
      </nav>
    </div>
  );
}
