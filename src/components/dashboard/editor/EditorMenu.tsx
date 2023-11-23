"use client";

import { memo, useState } from "react";
import clsx from "clsx";

import { FeatherIcon } from "@/components/core/FeatherIcon";
import formStyles from "@/styles/Forms.module.css";

type EditorMenuProps = {
  className?: string;
};

export const EditorMenu = memo(({ className = "" }: EditorMenuProps) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <aside
      className={clsx(
        className,
        "flex flex-col flex-shrink-0 top-0 left-0 space-y-4 py-4 px-6 md:pt-4",
        "w-full h-screen min-h-screen max-h-screen overflow-y-auto",
        "border-l border-gray-300",
        "md:w-96 sticky",
        // support the collapsible sidebar for a cleaner dashboard UI
        // !!showMenu && "md:max-w-fit",
        //
        showMenu ? "h-screen" : "hidden md:flex",

        // " items-start gap-4 space-y-4",
      )}
    >
      <section className="flex items-center justify-between gap-2">
        <h2 className="font-semibold text-xl">Post settings</h2>

        <button
          type="button"
          className="p-2"
          onClick={() => setShowMenu(!showMenu)}
        >
          <FeatherIcon
            name="LogOut"
            className={clsx(
              "flex-shrink-0 place-self-center",
              showMenu && "rotate-180",
            )}
          />
        </button>
      </section>

      {/* <ul className="space-y-1 flex-grow"> */}

      <section className="">
        <div className={formStyles.element}>
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
          <p className={formStyles.description}>
            authar.io/username/post-slug-here
          </p>
        </div>
      </section>
    </aside>
  );
});
