import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";
<<<<<<< HEAD
import { ThemeProvider } from "./theme-provider";
import Footer from "@/components/Footer";
=======
import { cn } from "@/lib/utils";
>>>>>>> f0171ef1949ea98bccbfb868d49f89021478caa8

import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aventro",
  description:
    "Plan, track, and manage your agile and software development projects in aventro. Customize your workflow, collaborate, and release great software",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
        <Toaster richColors theme='dark'/>
        <QueryProvider>
          {children}
          <Footer />
        </QueryProvider>
=======
      <body className={cn(inter.className, "h-screen antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <QueryProvider>
              <Toaster richColors theme="dark" />
              <Analytics />
              {children}
            </QueryProvider>
          </TooltipProvider>
>>>>>>> f0171ef1949ea98bccbfb868d49f89021478caa8
        </ThemeProvider>
      </body>
    </html>
  );
}
