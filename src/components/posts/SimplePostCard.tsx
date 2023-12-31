import { memo } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { FormattedDateAgo } from "@/components/core/FormattedDateAgo";
import styles from "@/styles/posts/SimplePostCard.module.css";
// import { Clock } from "react-feather";

type SimplePostCardProps = {
  title: string;
  href: string;
  date?: string;
  description?: string;
  imageSrc?: StaticImageData;
  imageAlt?: string;
};

export const SimplePostCard = memo(
  ({
    title,
    href,
    description,
    date,
    imageSrc,
    imageAlt,
  }: SimplePostCardProps) => {
    return (
      <div className={styles.card}>
        {!!imageSrc && (
          <Link href={href} className={styles.image}>
            <Image
              src={imageSrc}
              fill
              alt={imageAlt ?? title}
              title={imageAlt ?? title}
              // priority={true}
            />
          </Link>
        )}

        <div className={styles.details}>
          <h4 className={styles.title}>
            <Link href={href}>{title}</Link>
          </h4>

          <section className={styles.meta}>
            {/* {!!duration && (
              <p className={styles.minor}>
                <Clock strokeWidth={1.1} />
                {duration}
              </p>
            )} */}

            {!!date && (
              <FormattedDateAgo date={date} className={styles.minor} />
            )}
          </section>

          {!!description && (
            <p className={`${styles.description} fade-bottom`}>{description}</p>
          )}
        </div>
      </div>
    );
  },
);
