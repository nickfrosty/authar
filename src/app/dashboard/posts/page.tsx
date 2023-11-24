import { Metadata } from "next";
import { DashboardSubHeader } from "@/components/dashboard/DashboardSubHeader";
import Link from "next/link";

import { PostsManagerTable } from "@/components/dashboard/posts/PostsManagerTable";

export const metadata: Metadata = {
  title: "Authar - Posts",
};

export default async function Page() {
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
        <PostsManagerTable />
      </main>
    </>
  );
}
