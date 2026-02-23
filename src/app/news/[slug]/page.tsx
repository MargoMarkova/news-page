import Image from "next/image";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer/Footer";
import { getAllNews, getNewsBySlug, formatRuDate } from "@/lib/news";
import styles from "./page.module.scss";
import ContactButtonClient from "./ui.client";
import { Header } from "@/components/Header";

export const revalidate = 60; // ISR: пересборка раз в 60 сек

export async function generateStaticParams() {
  return (await getAllNews()).map((n) => ({ slug: n.slug }));
}

export default async function NewsDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  console.log("item", item);

  if (!item) return notFound();

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.card}>
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
