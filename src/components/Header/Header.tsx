"use client";

import Link from "next/link";
import styles from "./Header.module.scss";
import Image from "next/image";

type Props = {
  onContactClick?: () => void;
};

export function Header({ onContactClick }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href={`/`} className={styles.brand}>
          <Image
            loading="eager"
            src={"/logo.png"}
            alt="Логотип"
            width={70}
            height={84}
            className={styles.img}
          />{" "}
        </Link>

        <div className={styles.cta} onClick={onContactClick}>
          <span className="t-link">Связаться с нами</span>
        </div>
      </div>
    </header>
  );
}
