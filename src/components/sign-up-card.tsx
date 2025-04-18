"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { createUserAction } from "@/lib/actions/user.actions";
import { toast } from "sonner";

export const SignUpCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (data: any) => {
    setIsPending(true);


    const response = await createUserAction(data);
    if (response) {
      toast.success("User created successfully!");
    }

    setIsPending(false);
  };

  return (
    <Card className="size-full border-none bg-slate-200 shadow-none dark:bg-zinc-800 md:w-[487px]">
      <CardHeader className="flexx items-center justify-center p-7 text-center">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription className="dark:text-slate-10 text-slate-900 dark:text-slate-200">
          By signing up, you agree to our{" "}
          <Link href="/privacy">
            <span className="text-gray-400 underline underline-offset-2">
              Privacy Policy
            </span>
          </Link>{" "}
          and{" "}
          <Link href="/terms">
            <span className="text-gray-400 underline underline-offset-2">
              terms
            </span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Input placeholder="Enter you name" value={username} onChange={(e: any) => setUsername(e.target.value)} />
        <Input placeholder="Enter you email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
        <Button onClick={() => onSubmit({ username, email, password })}>Sign Up</Button>
      </CardContent>
      <div className="hidden px-7">
        <DottedSeparator />
      </div>
      <CardContent className="flex items-center justify-center p-7">
        <p>
          Already have an account?
          <Link href="/sign-in">
            <span className="text-gray-700 underline-offset-2 hover:underline dark:text-gray-400">
              &nbsp;Sign In
            </span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
