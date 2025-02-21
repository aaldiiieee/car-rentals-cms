import React from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import ClientProvider from "@/providers/client-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CarLoka | CMS",
  description: "",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <ClientProvider>
        <ToastProvider>
          <body className={`${inter.className} min-h-screen`}>
            {children}
            <Toaster />
          </body>
        </ToastProvider>
      </ClientProvider>
    </html>
  );
}
