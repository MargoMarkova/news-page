import { useState } from "react";
import { ContactModal } from "../ContactModal";
import styles from "./ContactButton.module.scss";

export function ContactButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.button} onClick={() => setOpen(true)}>
        <span className="t-link">Связаться с нами</span>
      </div>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
