"use client";

import { LexicalEditor } from "./LexicalEditor";
import { LEXICAL_NODES } from "./config";
import { EditorHistoryStateContext } from "./context/EditorHistoryState";

type EditorProps = {
  /** the HTML element `id` to be used as the `LexicalEditor` */
  editorId: string;
  /** parent classes for the editor's `root` */
  className?: string;
};

export const Editor = ({
  editorId,
  className = "p-4 border-slate-500 border-2 rounded h-full min-h-[200px] focus:outline-none focus-visible:border-black",
}: EditorProps) => {
  // load the initial editor content from the synced local storage object
  // todo: make this more dynamic to be post specific
  let localStorageContent = localStorage.getItem(editorId) ?? "";

  return (
    <EditorHistoryStateContext>
      <LexicalEditor
        config={{
          editorState: localStorageContent,
          namespace: editorId,
          nodes: LEXICAL_NODES,
          theme: { root: className },
          // note: we could manually define node styles, but we rather style them with raw CSS
          // theme: Object.assign(LEXICAL_THEME, { root: className }),
          onError: (error) => {
            console.warn("[editor error]", error);
          },
        }}
      />
    </EditorHistoryStateContext>
  );
};
