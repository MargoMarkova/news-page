"use client";
import { Header } from "@/components/Header/Header";
import { NewsList } from "@/components/NewsList/NewsList";

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
