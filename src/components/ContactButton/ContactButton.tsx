"use client";
import { useState } from "react";
import { ContactModal } from "../ContactModal";

export function ContactButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="highlightedButton" onClick={() => setOpen(true)}>
        <span className="t-link absolute">Связаться с нами</span>
        <span className="t-link">Связаться с нами</span>
      </button>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
