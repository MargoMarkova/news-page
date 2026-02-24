import Link from "next/link";
import styles from "./Header.module.scss";
import Image from "next/image";
import { ContactButton } from "../ContactButton";

export function Header() {
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

        <ContactButton />
      </div>
    </header>
  );
}
