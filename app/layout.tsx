import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project: Nirvanna",
  description: "Team Chat Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
