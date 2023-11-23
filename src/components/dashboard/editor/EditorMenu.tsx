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
