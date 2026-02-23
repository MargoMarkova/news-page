import styles from "./Footer.module.scss";
import Image from "next/image";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Image
          loading="eager"
          src={"/logo-white.png"}
          alt="Логотип"
          width={103}
          height={124}
          className={styles.img}
        />{" "}
        <div className="t-h2">КРЕАТИВНОЕ АГЕНТСТВО 500NA700</div>
        <div />
      </div>
    </footer>
  );
}
