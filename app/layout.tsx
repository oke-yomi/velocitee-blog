import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog website for Velocitee",
  description:
    "Blog website for Velocitee using Nextjs, typescript and supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-7xl mx-auto px-8">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
