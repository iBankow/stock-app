"use client";

import { authenticate } from "@/app/actions/actions";
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
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

import { useFormState, useFormStatus } from "react-dom";

export default function LoginForm() {
  const { toast } = useToast();
  const [err, action] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (err) {
      toast({
        title: err.message,
        variant: "destructive",
      });
    }
  }, [err, toast]);

  return (
    <Card className="w-full max-w-xs px-6">
      <form action={action}>
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
          <LoginButton />
        </CardFooter>
      </form>
    </Card>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className={`${pending && "animate-pulse"}`}
      onClick={handleClick}
    >
      Login
    </Button>
  );
}
