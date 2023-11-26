"use client";

import { memo } from "react";
import Link from "next/link";
import { FeatherIcon } from "@/components/core/FeatherIcon";
import { usePostEditorState } from "@/context/PostEditorState";

export const EditorHeader = memo(({ className = "" }: SimpleComponentProps) => {
  const { editorMenu, setEditorMenu, pendingChanges, post } =
    usePostEditorState();

  return (
    <header
      className={`flex w-full justify-between gap-2 items-center ${className}`}
    >
      <section className="flex justify-between gap-4 items-center">
        <Link
          href="/dashboard/posts"
          className="hover:underline text-sm flex justify-between gap-2 items-center"
        >
          <FeatherIcon name="ArrowLeft" strokeWidth={1.6} size={16} />
          All Posts
        </Link>

        {/* <span className="text-gray-400 text-sm">Draft saved (locally)</span> */}
      </section>

      <section className="flex justify-between gap-2 items-center">
        <Link
          target="_blank"
          href={`/${post?.user.username}/${post?.slug || "error"}`}
          className="inline-flex btn btn-ghost btn-sm"
        >
          Preview
          <FeatherIcon name="ExternalLink" size={16} />
        </Link>

        <button
          type="button"
          className="inline-block btn btn-dark btn-sm"
          disabled={!pendingChanges}
        >
          Publish
        </button>

        {editorMenu && (
          <button
            type="button"
            className="inline-block btn btn-sm !px-2 text-gray-500 hover:text-black"
            onClick={() => setEditorMenu(!editorMenu)}
          >
            <FeatherIcon
              name="LogOut"
              strokeWidth={1.2}
              className={editorMenu ? "rotate-180" : ""}
            />
          </button>
        )}
      </section>
    </header>
  );
});
