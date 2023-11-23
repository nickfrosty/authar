import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DashboardSubHeader } from "@/components/dashboard/DashboardSubHeader";
import Link from "next/link";
import { FeatherIcon } from "@/components/core/FeatherIcon";
import Editor from "@/components/editor";
import clsx from "clsx";

import { EditorMenu } from "@/components/dashboard/sidebar/EditorMenu";

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
          className="!flex-grow !max-w-full py-4 px-6 prose"
          id={"lexical-editor"}
        >
          <Editor editorId="lexical-editor" />
        </article>

        <EditorMenu />
      </main>
    </>
  );
}
