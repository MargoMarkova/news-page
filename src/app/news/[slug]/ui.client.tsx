"use client";

import { useState } from "react";
import { ContactModal } from "@/components/ContactModal/ContactModal";
import styles from "./ui.client.module.scss";

export default function ContactButtonClient() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className={styles.cta} onClick={() => setOpen(true)}>
        Связаться с нами
      </button>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
