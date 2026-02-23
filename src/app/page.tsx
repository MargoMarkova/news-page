"use client";

import { useState } from "react";
import { Header } from "@/components/Header/Header";
import { ContactModal } from "@/components/ContactModal/ContactModal";
import { NewsList } from "@/components/NewsList/NewsList";

export default function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header onContactClick={() => setOpen(true)} />
      <main>
        <NewsList />
      </main>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
