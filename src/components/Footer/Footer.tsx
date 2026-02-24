"use client";
import styles from "./Footer.module.scss";
import Image from "next/image";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logoBox}>
            <Image
              priority
              src="/logo-white.png"
              alt="Логотип"
              fill
              sizes="(max-width: 768px) 120px, 103px"
              className={styles.logo}
            />
          </div>

          <div className={`t-footer ${styles.caption}`}>
            КРЕАТИВНОЕ АГЕНТСТВО 500NA700
          </div>
          <div className={styles.spacer} aria-hidden="true" />
        </div>
      </div>
    </footer>
  );
}
