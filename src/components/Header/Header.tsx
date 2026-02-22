"use client";

import styles from "./Header.module.scss";
import Image from "next/image";

type Props = {
  onContactClick: () => void;
};

export function Header({ onContactClick }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Image
            loading="eager"
            src={"/Logo.png"}
            alt="Логотип"
            width={70}
            height={84}
            className={styles.img}
          />{" "}
        </div>

        <button className={styles.cta} onClick={onContactClick}>
          Связаться с нами
        </button>
      </div>
    </header>
  );
}
