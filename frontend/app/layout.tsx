import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VM Algo | Execution Tools for Options Traders",
  description:
    "Trading execution, strategy research, automation and multi-account monitoring for Indian traders."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
