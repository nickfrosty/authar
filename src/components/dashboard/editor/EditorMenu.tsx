"use client";

import { memo, useState } from "react";
import clsx from "clsx";

import { FeatherIcon } from "@/components/core/FeatherIcon";
import form from "@/styles/Forms.module.css";
import styles from "@/styles/dashboard/editor/EditorMenu.module.css";

type EditorMenuProps = {
  className?: string;
};

export const EditorMenu = memo(({ className = "" }: EditorMenuProps) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <aside
      className={clsx(
        className,
        styles.menu,
        // support the collapsible sidebar for a cleaner dashboard UI
        // !!showMenu && "md:max-w-fit",
        showMenu ? styles.active : styles.inactive,
      )}
    >
      <header className={styles.topper}>
        <h2>Post settings</h2>

        <button
          type="button"
          className={styles.button}
          onClick={() => setShowMenu(!showMenu)}
        >
          <FeatherIcon
            name="X"
            // className={showMenu ? "rotate-180" : ""}
          />
        </button>
      </header>

      <section className={styles.section}>
        <FormItem
          name="slug"
          label="Post URL"
          description={`authar.io/username/post-slug-here`}
        >
          <div className={styles.elementWithIcon}>
            <FeatherIcon name="Link" strokeWidth={1.8} />
            <input
              type="text"
              name="slug"
              id="slug"
              placeholder="Customize this post URL"
            />
          </div>
        </FormItem>

        <FormItem name="date" label="Publish date">
          <div className={styles.elementWithIcon}>
            <FeatherIcon name="Link" strokeWidth={1.8} />
            <input type="datetime-local" name="date" id="date" placeholder="" />
          </div>
        </FormItem>

        <FormItem
          name="tags"
          label="Tags"
          description={`Searchable tags to help your post get discovered`}
        >
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="Start typing a tag..."
          />
        </FormItem>

        <FormItem name="excerpt" label="Excerpt">
          <textarea
            name="excerpt"
            id="excerpt"
            placeholder="A brief excerpt of this post"
            maxLength={150}
          ></textarea>
        </FormItem>
      </section>
    </aside>
  );
});

type FormItemProps = {
  name: string;
  label: string;
  description?: string;
  children: React.ReactNode;
};

const FormItem = memo(
  ({ name, label, description, children }: FormItemProps) => {
    return (
      <div className={form.element}>
        <label htmlFor={name}>{label}</label>

        {children}

        {typeof description != "undefined" && (
          <p className={form.description}>{description}</p>
        )}
      </div>
    );
  },
);
