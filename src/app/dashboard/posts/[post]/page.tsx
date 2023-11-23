import { Metadata } from "next";
import { notFound } from "next/navigation";

import Editor from "@/components/editor";
import { EditorMenu } from "@/components/dashboard/editor/EditorMenu";
import { EditorHeader } from "@/components/dashboard/editor/EditorHeader";
import { PostEditorStateContext } from "@/context/PostEditorState";

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
    <PostEditorStateContext>
      <main className="md:flex justify-between flex-row">
        <section className="!flex-grow !max-w-full py-6 px-6 space-y-4 max-h-screen overflow-auto">
          <EditorHeader />

          <article
            className="!flex-grow !max-w-full prose"
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
