import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { type getPostsForUser } from "@/lib/queries/posts";
import { FeatherIcon } from "@/components/core/FeatherIcon";
import styles from "@/styles/dashboard/posts/PostManager.module.css";

type PostsManagerTableProps = {
  posts: NonNullable<Awaited<ReturnType<typeof getPostsForUser>>>;
};

export const PostsManagerTable = memo(({ posts }: PostsManagerTableProps) => {
  return (
    <table className={styles.table}>
      <tbody className="">
        {posts.map((post, key) => {
          //

          return (
            <tr key={key} className={styles.item}>
              <td className={styles.primaryArea}>
                <Link
                  href={`/dashboard/posts/${post.slug}`}
                  className={styles.imageWrapper}
                >
                  {!!post.image ? (
                    <Image
                      src={post.image}
                      alt={`featured image`}
                      fill={true}
                      sizes="(max-width: 200px), 33vw"
                    />
                  ) : (
                    <span className="flex items-center align-middle w-full h-full text-center justify-center">
                      <FeatherIcon name="Image" size={48} strokeWidth={1.0} />
                    </span>
                  )}
                </Link>

                <div className={styles.metadata}>
                  <h2>
                    <Link href={`/dashboard/posts/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className={styles.details}>{post.date.toDateString()}</p>
                </div>
              </td>

              {/* <td className={styles.small}>
                <Link href={`#`} className={styles.statRecord}>
                  <p className={styles.value}>{numberFormatter(post.views)}</p>
                  <p className={styles.label}>views</p>
                </Link>
              </td>
              <td className={styles.small}>
                <Link href={`#`} className={styles.statRecord}>
                  <p className={styles.value}>{numberFormatter(post.likes)}</p>
                  <p className={styles.label}>likes</p>
                </Link>
              </td>
              <td className={styles.small}>
                <Link href={`#`} className={styles.statRecord}>
                  <p className={styles.value}>{numberFormatter(post.saves)}</p>
                  <p className={styles.label}>saves</p>
                </Link>
              </td> */}

              <td className={styles.small}>
                <button className="btn btn-ghost !p-2">
                  <FeatherIcon name="MoreVertical" />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
