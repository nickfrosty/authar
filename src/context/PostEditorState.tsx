"use client";

import { createContext, useContext, useState } from "react";

type PostEditorStateContext = {
  /** current open/close status of the `EditorMenu` */
  editorMenu: boolean;
  /** set the open/close status of the `EditorMenu` */
  setEditorMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const Context = createContext<PostEditorStateContext>({
  editorMenu: false,
  setEditorMenu: () => {},
});

export function PostEditorStateContext({
  children,
}: {
  children: React.ReactNode;
}) {
  // open & close state for the `EditorMenu`
  const [editorMenu, setEditorMenu] = useState(false);

  /**
   * todo: saving and fetching state from local storage and remote resources
   * - editorMenu - local storage
   */

  return (
    <Context.Provider
      value={{
        editorMenu,
        setEditorMenu,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function usePostEditorState(): PostEditorStateContext {
  return useContext(Context);
}
