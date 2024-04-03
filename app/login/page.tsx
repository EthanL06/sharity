import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  return (
    <div className="grid min-h-screen place-items-center">
      <Card className="mx-auto min-w-[25rem] max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Sign in with Google or Guest account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button type="submit" className="w-full">
              Login with Google
            </Button>
            <Button variant="outline" className="w-full">
              Guest Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
