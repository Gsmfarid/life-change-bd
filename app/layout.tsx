import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { IChildren } from "@/interface";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Life Change BD",
  description: "Generated by Baitul Hikmah Team",
};

const RootLayout = ({ children }: IChildren) => (
  <html lang="en">
    <body className={inter.className}>
      {/* header */}
      <main>{children}</main>
      {/* Header */}
    </body>
  </html>
);

export default RootLayout;
