import styles from "./Footer.module.scss";
import Image from "next/image";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logoWrap}>
          <Image
            loading="eager"
            src={"/logo-white.png"}
            alt="Логотип"
            fill
            sizes="(max-width: 620px) 120px"
            className={styles.img}
          />
        </div>
        <div className="t-h2">КРЕАТИВНОЕ АГЕНТСТВО 500NA700</div>
        <div />
      </div>
    </footer>
  );
}
