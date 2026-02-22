import "./globals.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Новости",
  description: "Тестовое задание",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}