"use client";

import { useEffect, useState } from "react";
import styles from "./NewsList.module.scss";
import { NewsItem } from "@/api/api";
import { NewsCard } from "@/components/NewsCard/NewsCard";
import { api } from "@/api";

export function NewsList() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);

      const data = await api().getAllNews();
      if (!alive) return;

      setItems(data);
      setLoading(false);
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className={styles.section}>
      <h1 className={`t-h1 ${styles.h1}`}>НОВОСТИ</h1>

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
