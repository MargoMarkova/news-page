"use client";
import { Header } from "@/components/Header";
import { NewsList } from "@/components/NewsList";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <NewsList />
      </main>
    </>
  );
}
