import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Convert Now",
  description: "convert image formats to multiple formats fast and simple",
  creator: "ledraa",
  keywords: "image converter, converter, unlimited image converter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn([inter.className, "bg-neutral-100"])}>
        <Nav />
        <main className="max-w-4xl w-full mx-auto flex min-h-screen flex-col items-center justify-between p-24 gap-8">
          {children}
        </main>
      </body>
    </html>
  );
}
