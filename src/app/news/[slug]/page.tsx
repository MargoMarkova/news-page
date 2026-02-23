"use client";
import Image from "next/image";
import { Footer } from "@/components/Footer/Footer";
import { formatRuDate } from "@/lib/news";
import styles from "./page.module.scss";
import { Header } from "@/components/Header";
import { useEffect, useState } from "react";
import { api } from "@/api";
import { NewsItem } from "@/api/api";

export default function NewsDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const [item, setItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const { slug } = await params;
        const data = await api().getNews(slug);
        if (!alive) return;
        setItem(data);
      } catch (error) {
        console.error(error);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [params]);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.card}>
          {item && (
            <>
              <div className={styles.left}>
                <div className={styles.imgWrap}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={styles.img}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className={styles.right}>
                <div className={styles.info}>
                  <span className="t-h1">{item.title}</span>
                  <span className={`t-text ${styles.date}`}>
                    {formatRuDate(item.date)}
                  </span>
                </div>
                <div className={styles.content}>
                  <span className="t-h3">{item.contentHeader}</span>
                  <div>
                    {item.content.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
