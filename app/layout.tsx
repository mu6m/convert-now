import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Convert Now",
  description: "convert image formats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <main className="max-w-4xl w-full mx-auto flex min-h-screen flex-col items-center justify-between p-24 gap-8">
          {children}
        </main>
      </body>
    </html>
  );
}
