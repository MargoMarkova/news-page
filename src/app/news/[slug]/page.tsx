/* eslint-disable react-hooks/error-boundaries */
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { formatRuDate } from "@/lib/news";
import styles from "./page.module.scss";
import { Header } from "@/components/Header";
import { api } from "@/api";
import { NewsItem } from "@/api/api";
import { notFound } from "next/navigation";

// export const revalidate = 60;

// export async function generateStaticParams() {
//   const news = await api().getAllNews();
//   return news.map((n) => ({ slug: n.slug }));
// }

export default async function NewsDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  try {
    const item: NewsItem = await api().getNews(slug);

    return (
      <div className={styles.page}>
        <Header />

        <main className={styles.main}>
          <article className={styles.article}>
            {item && (
              <>
                <div className={styles.media}>
                  <div className={styles.mediaFrame}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className={styles.mediaImage}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>

                <div className={styles.body}>
                  <header className={styles.meta}>
                    <h1 className={`${styles.title} t-news-title`}>
                      {item.title}
                    </h1>

                    <time
                      className={`${styles.date} t-text`}
                      dateTime={item.date}
                    >
                      {formatRuDate(item.date)}
                    </time>
                  </header>

                  <section className={styles.content}>
                    <h2 className={`${styles.contentHeader} t-h3`}>
                      {item.contentHeader}
                    </h2>

                    <div className={`${styles.paragraphs} t-tex`}>
                      {item.content.map((p, i) => (
                        <p className={styles.paragraph} key={i}>
                          {p}
                        </p>
                      ))}
                    </div>
                  </section>
                </div>
              </>
            )}
          </article>
        </main>

        <Footer />
      </div>
    );
  } catch {
    notFound();
  }
}
