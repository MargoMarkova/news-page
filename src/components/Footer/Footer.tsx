import styles from "./Footer.module.scss";
import Image from "next/image";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Image
            loading="eager"
            src={"/Logo.png"}
            alt="Логотип"
            width={70}
            height={84}
            className={styles.img}
          />{" "}
        <div className={styles.text}>КРЕАТИВНОЕ АГЕНТСТВО 500NA700</div>
      </div>
    </footer>
  );
}