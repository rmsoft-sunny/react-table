import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import Header from "./header";
import QueryProviders from "@/lib/provider/query-provider";
import "./globals.css";

const inter = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React-Table",
  description: "react-table-examples",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <QueryProviders>{children}</QueryProviders>
      </body>
    </html>
  );
}
