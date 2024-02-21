import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
