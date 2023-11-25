import { Metadata } from "next";
import { DashboardSubHeader } from "@/components/dashboard/DashboardSubHeader";
import Link from "next/link";

import { PostsManagerTable } from "@/components/dashboard/posts/PostsManagerTable";
import { getPostsForUser } from "@/lib/queries/posts";

export const metadata: Metadata = {
  title: "Authar - Posts",
};

export default async function Page() {
  const uid = 1; // 1=nickfrosty

  // get the listing of posts owned by the currently logged in user
  const posts = await getPostsForUser({ uid });

  return (
    <>
      <DashboardSubHeader className="flex justify-between gap-2 items-center">
        <section className="flex justify-between gap-2 items-center">
          <input
            type="text"
            name="k"
            id="search"
            className="input-default"
            placeholder="Search your posts..."
          />
        </section>

        <section className="flex justify-between gap-2 items-center">
          <Link
            href="/dashboard/new"
            className="inline-block btn btn-dark whitespace-nowrap"
          >
            New<span className="hidden md:inline"> Post</span>
          </Link>
        </section>
      </DashboardSubHeader>

      <main className="container">
        {Array.isArray(posts) ? (
          <PostsManagerTable posts={posts} />
        ) : (
          <>No posts found. Create your first!</>
        )}
      </main>
    </>
  );
}
