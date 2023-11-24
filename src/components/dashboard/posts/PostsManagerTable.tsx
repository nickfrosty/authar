import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { FeatherIcon } from "@/components/core/FeatherIcon";

import styles from "@/styles/dashboard/posts/PostManager.module.css";

import sampleImage from "@/../public/img/sample.jpg";

type PostsManagerTableProps = {};

export const PostsManagerTable = memo(({}: PostsManagerTableProps) => {
  return (
    <table className={styles.table}>
      <tbody className="">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, key) => (
          <PostLineItem key={key} />
        ))}
      </tbody>
    </table>
  );
});

const PostLineItem = memo(() => {
  const href = "/dashboard/posts/slug-here";

  return (
    <tr className={styles.item}>
      <td className={styles.primaryArea}>
        <Link href={href} className={styles.imageWrapper}>
          <Image
            src={sampleImage}
            alt={""}
            // fill={true}
          />
        </Link>

        <div className={styles.metadata}>
          <h2>
            <Link href={href}>Post title here and clickable</Link>
          </h2>

          <p className={styles.details}>{new Date().toDateString()}</p>
        </div>
      </td>

      <td className={styles.small}>
        <Link href={``} className={styles.statRecord}>
          <p className={styles.value}>12,222</p>
          <p className={styles.label}>views</p>
        </Link>
      </td>
      <td className={styles.small}>
        <Link href={``} className={styles.statRecord}>
          <p className={styles.value}>5,829</p>
          <p className={styles.label}>likes</p>
        </Link>
      </td>
      <td className={styles.small}>
        <Link href={``} className={styles.statRecord}>
          <p className={styles.value}>628</p>
          <p className={styles.label}>saves</p>
        </Link>
      </td>

      <td className={styles.small}>
        <button className="btn !p-2">
          <FeatherIcon name="MoreVertical" />
        </button>
      </td>
    </tr>
  );
});
