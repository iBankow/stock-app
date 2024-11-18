import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { authenticate } from "@/lib/actions";

export default function LoginForm() {
  return (
    <Card className="w-full max-w-xs px-6">
      <form action={authenticate as any}>
        <CardHeader className="mb-4 border-b px-0 pb-4">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 px-0">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="px-0">
          <Button className="w-full font-bold" type="submit">
            <Link href={"/dashboard"}>Sign in</Link>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
