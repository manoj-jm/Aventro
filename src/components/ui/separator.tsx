<<<<<<< HEAD
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"
=======
"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";
>>>>>>> f0171ef1949ea98bccbfb868d49f89021478caa8

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
<<<<<<< HEAD
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
=======
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
>>>>>>> f0171ef1949ea98bccbfb868d49f89021478caa8
