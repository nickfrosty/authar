"use client";

import { createContext, useCallback, useContext, useState } from "react";
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
  /** Update a specific named data value for a Post */
  updatePostData: (name: keyof EditablePost, value: any) => void;
};

const Context = createContext<PostEditorStateContext>({
  editorMenu: false,
  setEditorMenu: () => {},
  post: null,
  setPost: () => null,
  updatePostData: () => {},
});

export function PostEditorStateContext({
  children,
  initialPost = null,
}: {
  children: React.ReactNode;
  initialPost: EditablePost | null;
}) {
  // initialize the state trackers for the on-page form state
  const [loading, setLoading] = useState<boolean>(false);
  const [pendingChanges, setPendingChanges] = useState<boolean>(false);

  // open & close state for the `EditorMenu`
  const [editorMenu, setEditorMenu] = useState<boolean>(false);

  // the post to be edited (with its state setter of course)
  const [post, setPost] = useState<EditablePost | null>(initialPost || null);

  // callback function to handle the various input state changes
  const updatePostData = useCallback(
    (name: keyof EditablePost, value: any) => {
      // update the status of pending changes
      if (!pendingChanges) setPendingChanges(true);

      // actually update the form's state
      const data = { ...post };
      data[name] = value as never;
      // @ts-ignore
      setPost(data);
    },
    [
      // comment for better diffs
      pendingChanges,
      setPendingChanges,
      post,
      setPost,
    ],
  );

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
        updatePostData,
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
