"use client";

import { useEffect, useState } from "react";
import styles from "./NewsList.module.scss";
import type { NewsItem } from "@/lib/news";
import { NewsCard } from "@/components/NewsCard/NewsCard";

export function NewsList() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);

      // имитация API задержки
      await new Promise((r) => setTimeout(r, 500));

      const res = await fetch("/news.json", { cache: "no-store" });
      const data = (await res.json()) as NewsItem[];

      if (alive) {
        setItems(data);
        setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className={styles.section}>
      <h1 className={styles.h1}>НОВОСТИ</h1>

      {loading ? (
        <div className={styles.skeletonGrid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : (
        <div className={styles.grid}>
          {items.map((n) => (
            <NewsCard key={n.id} item={n} />
          ))}
        </div>
      )}
    </section>
  );
}
