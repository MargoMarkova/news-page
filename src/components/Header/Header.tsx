import Link from "next/link";
import styles from "./Header.module.scss";
import Image from "next/image";
import { ContactButton } from "../ContactButton";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href={`/`} className={styles.brand}>
          <div className={styles.logoWrap}>
            <Image
              src="/logo.png"
              alt="Логотип"
              fill
              sizes="(max-width: 768px) 43.65px, 70px"
              className={styles.img}
              priority
            />
          </div>
        </Link>

        <ContactButton />
      </div>
    </header>
  );
}
