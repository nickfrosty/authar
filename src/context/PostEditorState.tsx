"use client";

import { createContext, useContext, useState } from "react";
import type { getSinglePost } from "@/lib/queries/posts";

type EditablePost = NonNullable<Awaited<ReturnType<typeof getSinglePost>>>;

type PostEditorStateContext = {
  /** current open/close status of the `EditorMenu` */
  editorMenu: boolean;
  /** set the open/close status of the `EditorMenu` */
  setEditorMenu: React.Dispatch<React.SetStateAction<boolean>>;
  /** the post to be managed (or `null` for a new post) */
  post?: EditablePost | null;
  /** state setter for the current `post` */
  setPost: React.Dispatch<React.SetStateAction<EditablePost | null>>;
};

const Context = createContext<PostEditorStateContext>({
  editorMenu: false,
  setEditorMenu: () => {},
  post: null,
  setPost: () => null,
});

export function PostEditorStateContext({
  children,
  initialPost = null,
}: {
  children: React.ReactNode;
  initialPost: EditablePost | null;
}) {
  // open & close state for the `EditorMenu`
  const [editorMenu, setEditorMenu] = useState(false);

  // the post to be edited (with its state setter of course)
  const [post, setPost] = useState<EditablePost | null>(initialPost || null);

  /**
   * todo: saving and fetching state from local storage and remote resources
   * - editorMenu - local storage
   */

  return (
    <Context.Provider
      value={{
        // comment for better diffs
        editorMenu,
        setEditorMenu,
        post,
        setPost,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function usePostEditorState(): PostEditorStateContext {
  return useContext(Context);
}
