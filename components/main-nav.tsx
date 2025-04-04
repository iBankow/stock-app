"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

const activeLink = "text-foreground font-bold"


export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden sm:flex">
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
            pathname === "/products" ? activeLink : "text-foreground/60",
          )}
        >
          Produtos
        </Link>
        <Link
          href="/units"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/units")
              ? activeLink
              : "text-foreground/60",
          )}
        >
          Unidades
        </Link>
        <Link
          href="/stock"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/stock")
              ? activeLink
              : "text-foreground/60",
          )}
        >
          Estoque
        </Link>
      </nav>
    </div>
  );
}
