import "./globals.scss";
import type { Metadata } from "next";
import { inter } from "@/styles/fonts"

export const metadata: Metadata = {
  title: "Новости",
  description: "Тестовое задание",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
