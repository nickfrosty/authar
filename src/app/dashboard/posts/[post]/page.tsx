import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSinglePost } from "@/lib/queries/posts";

import { PostEditorStateContext } from "@/context/PostEditorState";
import Editor from "@/components/editor";
import { EditorMenu } from "@/components/dashboard/editor/EditorMenu";
import { EditorHeader } from "@/components/dashboard/editor/EditorHeader";

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

  const username = "nickfrosty";

  // get the unique post record from the database
  const post = await getSinglePost({
    slug: params.post,
    username: username,
  });

  if (!post) notFound();

  return (
    <PostEditorStateContext initialPost={post}>
      <main className="md:flex justify-between flex-row">
        <section className="!flex-grow !max-w-full max-h-screen overflow-auto">
          <EditorHeader className="sticky top-0 h-min bg-white border-b border-gray-300 px-6 py-3" />

          <article
            className="!flex-grow !max-w-full prose py-6 px-6"
            id={"lexical-editor"}
          >
            <Editor editorId="lexical-editor" />
          </article>
        </section>

        <EditorMenu />
      </main>
    </PostEditorStateContext>
  );
}
