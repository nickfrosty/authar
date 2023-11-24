import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Post } from "@prisma/client";

import styles from "@/styles/posts/HorizontalPostCard.module.css";
import { FormattedDateAgo } from "@/components/core/FormattedDateAgo";
// import { Clock } from "react-feather";

type HorizontalPostCardProps = {
  href: string;
  title: Post["title"];
  date: Post["date"];
  excerpt: Post["excerpt"];
  image: Post["image"];
  imageAlt?: string;
};

export const HorizontalPostCard = memo(
  ({
    title,
    href,
    excerpt,
    date,
    image,
    imageAlt,
  }: HorizontalPostCardProps) => {
    return (
      <div className={styles.card}>
        {!!image && (
          <Link href={href} className={styles.imageLeft}>
            <Image
              src={image}
              fill
              alt={imageAlt ?? title}
              title={imageAlt ?? title}
              // priority={true}
            />
          </Link>
        )}

        <div className={styles.details}>
          <h4>
            <Link href={href} className={styles.title}>
              {title}
            </Link>
          </h4>

          <section className={styles.meta}>
            {/* {!!duration && (
              <p className={styles.minor}>
                <Clock strokeWidth={1.1} />
                {duration}
              </p>
            )} */}

            {!!date && (
              <FormattedDateAgo
                date={date.toISOString()}
                className={styles.minor}
              />
            )}
          </section>

          {!!excerpt && (
            <p className={`${styles.description} fade-bottom`}>{excerpt}</p>
          )}
        </div>
      </div>
    );
  },
);
