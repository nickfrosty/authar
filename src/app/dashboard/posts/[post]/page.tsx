import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DashboardSubHeader } from "@/components/dashboard/DashboardSubHeader";
import Link from "next/link";
import { FeatherIcon } from "@/components/core/FeatherIcon";
import Editor from "@/components/editor";
import clsx from "clsx";

import styles from "@/styles/Forms.module.css";

type PageProps = {
  params: {
    post: string;
  };
};

export const metadata: Metadata = {
  title: "Authar - Edit post",
};

export default async function Page({ params }: PageProps) {
  if (!params.post) notFound();

  const post = {};

  if (!post) notFound();

  return (
    <>
      <DashboardSubHeader className="flex justify-between gap-2 items-center">
        <Link
          href="/dashboard/posts"
          className="hover:underline flex justify-between gap-2 items-center"
        >
          <FeatherIcon name="ArrowLeft" strokeWidth={1.8} size={20} />
          All posts
        </Link>

        <section className="flex justify-between gap-2 items-center">
          <Link
            target="_blank"
            href="/user_profile/post-slug-or-id-here"
            className="inline-flex btn btn-ghost"
          >
            Preview
            <FeatherIcon name="ExternalLink" size={16} />
          </Link>

          <button type="button" className="inline-block btn btn-dark">
            Publish
          </button>
        </section>
      </DashboardSubHeader>

      <main className="md:flex gap-8 justify-between flex-row">
        <article
          className="!flex-grow !max-w-full p-4 prose"
          id={"lexical-editor"}
        >
          <Editor editorId="lexical-editor" />
        </article>

        <aside
          className={clsx(
            "min-h-screen flex-col py-4 px-6 overflow-y-auto flex-shrink-0 md:w-96 w-full items-start gap-4 space-y-4",
            "border-l border-gray-300",
          )}
        >
          <section className="flex items-center gap-2 w-full justify-between">
            <h2 className="font-semibold text-xl">Post settings</h2>

            <button
              type="button"
              className="p-2"
              // onClick={() => setShowMenu(!showMenu)}
            >
              <FeatherIcon
                name="LogOut"
                className={clsx(
                  "flex-shrink-0 place-self-center",
                  //
                  // !!showMenu && "rotate-180",
                )}
              />
            </button>
          </section>

          <section className="">
            <div className={styles.element}>
              <label htmlFor="slug">Post URL</label>

              <div className="relative">
                <FeatherIcon
                  name="Link"
                  strokeWidth={2}
                  className="text-gray-500 absolute top-2.5 left-3 w-5 h-5"
                />
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  className="!pl-9"
                  placeholder="Customize this post URL"
                />
              </div>
              <p className={styles.description}>
                authar.io/username/post-slug-here
              </p>
            </div>
          </section>
        </aside>
      </main>
    </>
  );
}
