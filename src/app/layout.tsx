// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import ClientWidgets from "@/components/ClientWidgets";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GraphOne - The Global Intelligence Layer for AI",
  description: "Discover AI startups, products, investors and jobs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppShell>{children}</AppShell>
        <ClientWidgets />
      </body>
    </html>
  );
}