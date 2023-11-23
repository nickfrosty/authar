"use client";

import { memo, useState } from "react";
import clsx from "clsx";

import { usePostEditorState } from "@/context/PostEditorState";
import { FeatherIcon } from "@/components/core/FeatherIcon";
import form from "@/styles/Forms.module.css";
import styles from "@/styles/dashboard/editor/EditorMenu.module.css";

type EditorMenuProps = {
  className?: string;
};

export const EditorMenu = memo(({ className = "" }: EditorMenuProps) => {
  const { editorMenu: showMenu, setEditorMenu: setShowMenu } =
    usePostEditorState();

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
      <header className={styles.menuHeader}>
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

      <MenuSection>
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
          <input type="datetime-local" name="date" id="date" placeholder="" />
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
      </MenuSection>

      <MenuSection label="SEO Settings" canToggle={true}>
        <p className={styles.minor}>
          Custom post details to be displayed on search engines like Google,
          Bing, and others.
        </p>

        <FormItem name="seo_title" label="Title">
          <input
            type="text"
            name="seo_title"
            id="seo_title"
            placeholder="Custom title to display in search engines"
          />
        </FormItem>

        <FormItem name="seo_description" label="Description">
          <textarea
            name="seo_description"
            id="seo_description"
            placeholder="Brief description of this post"
            maxLength={150}
          ></textarea>
        </FormItem>

        {/* <FormItem
          name="keywords"
          label="Keywords"
          // description={``}
        >
          <input
            type="text"
            name="seo_Keywords"
            id="seo_Keywords"
            placeholder="Comma separated list of keywords..."
          />
        </FormItem> */}

        {/* <button type="button">Search engine preview</button> */}
      </MenuSection>
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

type MenuSectionProps = {
  label?: string | React.ReactNode;
  canToggle?: boolean;
  children: React.ReactNode;
};

const MenuSection = memo(
  ({ label, canToggle = false, children }: MenuSectionProps) => {
    const [showSection, setShowSection] = useState(false);

    return (
      <section className={styles.section}>
        {typeof label != "undefined" && (
          <button
            className={clsx(styles.topper, canToggle && styles.toggle)}
            onClick={() => setShowSection(!showSection)}
            disabled={!canToggle}
          >
            {typeof label == "string" ? <h3>{label}</h3> : <>{label}</>}

            {!!canToggle && (
              <FeatherIcon
                name="ChevronDown"
                className={showSection ? "rotate-180" : ""}
              />
            )}
          </button>
        )}

        {!canToggle || showSection == true ? (
          <div className={styles.inner}>{children}</div>
        ) : null}
      </section>
    );
  },
);
