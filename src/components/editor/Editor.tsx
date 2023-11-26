"use client";

import { useEffect, useState } from "react";
import { LexicalEditor } from "./LexicalEditor";
import { LEXICAL_NODES, LEXICAL_THEME } from "./config";
import { EditorHistoryStateContext } from "./context/EditorHistoryState";

type EditorProps = {
  /** the HTML element `id` to be used as the `LexicalEditor` */
  editorId: string;
  /** parent classes for the editor's `root` */
  className?: string;
};

export const Editor = ({
  editorId,
  className = "border-none focus:outline-none",
}: EditorProps) => {
  // track the editor's initialization status
  const [initialized, setInitialized] = useState(false);
  const [localStorageContent, setLocalStorageContent] = useState<string | null>(
    null,
  );

  // load the initial editor content from the synced local storage object
  // todo: make this more dynamic to be post specific
  useEffect(() => {
    setLocalStorageContent(localStorage.getItem(editorId));
    setInitialized(true);
  }, []);

  /**
   * prevent the editor from being rendered until the initialization process is complete
   *
   * note: this prevents server errors while trying to access local storage,
   * while still enables the editor to use the local storage draft as the initial editor state
   *
   * todo: this seems to cause some layout shift...
   * in the future, maybe we render the editor content as static text,
   * then allow the editor to take control?
   */
  if (!initialized) return <>loading post...</>;

  return (
    <EditorHistoryStateContext>
      <LexicalEditor
        config={{
          editorState: localStorageContent,
          namespace: editorId,
          nodes: LEXICAL_NODES,
          // theme: { root: className },
          // note: we could manually define node styles, but we rather style them with raw CSS
          theme: Object.assign(LEXICAL_THEME, { root: className }),
          onError: (error) => {
            console.warn("[editor error]", error);
          },
        }}
      />
    </EditorHistoryStateContext>
  );
};
