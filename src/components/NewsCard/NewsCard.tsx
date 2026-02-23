import Link from "next/link";
import Image from "next/image";
import styles from "./NewsCard.module.scss";
import { formatRuDate } from "@/lib/news";
import { NewsItem } from "@/api/api";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link href={`/news/${item.slug}`} className={styles.card}>
      <div className={styles.imgWrap}>
        <Image
          loading="eager"
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 33vw"
          className={styles.img}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.summary}>{item.summary}</div>
      </div>
      <div className={styles.date}>{formatRuDate(item.date)}</div>
    </Link>
  );
}
