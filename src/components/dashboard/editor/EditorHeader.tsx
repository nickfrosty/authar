"use client";

import { memo } from "react";
import Link from "next/link";
import { FeatherIcon } from "@/components/core/FeatherIcon";

export const EditorHeader = memo(({}: SimpleComponentProps) => {
  return (
    <header className="flex w-full justify-between gap-2 items-center">
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
          href="/user_profile/post-slug-or-id-here"
          className="inline-flex btn btn-ghost btn-sm"
        >
          Preview
          <FeatherIcon name="ExternalLink" size={16} />
        </Link>

        <button type="button" className="inline-block btn btn-dark btn-sm">
          Publish
        </button>
      </section>
    </header>
  );
});
