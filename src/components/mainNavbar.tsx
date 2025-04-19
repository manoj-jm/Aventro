"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ui/ModeToggle";
import Link from "next/link";
<<<<<<< HEAD
// import { Logo } from "./Logo";
import { Button } from "./ui/button";
// import { Logo2 } from "./Logo2";
=======
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Logo2 } from "./Logo2";
>>>>>>> f0171ef1949ea98bccbfb868d49f89021478caa8
import { usePathname } from "next/navigation";

export function Navbar({ className }: { className?: string }) {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";
  return (
    <div
      className={cn(
<<<<<<< HEAD
        "wrapper sticky top-0 z-50 mx-auto flex w-full items-center py-6",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border border-primary/10 bg-secondary/20 px-6 py-3 shadow-lg shadow-neutral-600/5 backdrop-blur-lg">
        <Link href="/" className="flex items-center">
          {/* <Logo className="dark:hidden" /> */}
          {/* <Logo2 className="hidden dark:block" /> */}
          <h1 className="text-blue-600">Aventro</h1>
=======
        "sticky mx-auto wrapper top-0 z-50 flex items-center gap-2 py-12 w-full",
        className
      )}
    >
      <div className="mx-auto flex w-full md:max-w-7xl items-center justify-between rounded-2xl border border-primary/10 bg-secondary/20 px-6 py-3 shadow-lg shadow-neutral-600/5 backdrop-blur-lg">
        <Link href="/" className="flex items-center">
          <Logo className="dark:hidden" />
          <Logo2 className="hidden dark:block" />
>>>>>>> f0171ef1949ea98bccbfb868d49f89021478caa8
        </Link>
        <div className="flex items-center gap-x-4">
          <Button
            asChild
            variant="outline"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
              {isSignIn ? "SignUp" : "SignIn"}
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> f0171ef1949ea98bccbfb868d49f89021478caa8
