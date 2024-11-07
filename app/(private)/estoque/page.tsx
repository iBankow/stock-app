import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="container relative min-h-screen">
      <div className="min-h-screen w-full">
        <Button className="font-bold">
          <Link href={"estoque/atualizar-estoque"}>Atualizar Estoque</Link>
        </Button>
      </div>
    </div>
  );
}
