import { logout } from "@/app/actions/auth";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/theme-button";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <MainNav />
        <MobileNav />
        <div className="flex items-center space-x-2 md:justify-end">
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
          <nav className="flex items-center">
            <form
              action={async () => {
                "use server";
                await logout();
              }}
            >
              <Button type="submit" variant="ghost" size="icon">
                <LogOut className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Log out</span>
              </Button>
            </form>
          </nav>
        </div>
      </div>
    </header>
  );
}
