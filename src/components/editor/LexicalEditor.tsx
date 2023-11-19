"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

import { useEditorHistoryState } from "./context/EditorHistoryState";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

import { LocalStoragePlugin } from "./plugins";

type LexicalEditorProps = {
  config: Parameters<typeof LexicalComposer>["0"]["initialConfig"];
};

export const LexicalEditor = ({ config }: LexicalEditorProps) => {
  const { historyState } = useEditorHistoryState();

  return (
    <LexicalComposer initialConfig={config}>
      {/*  */}
      <RichTextPlugin
        contentEditable={<ContentEditable spellCheck={true} />}
        ErrorBoundary={LexicalErrorBoundary}
        // note: we must provide a component, but it is rendered below the editor?
        placeholder={<></>}
      />
      <HistoryPlugin externalHistoryState={historyState} />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      {/* custom plugins */}
      <LocalStoragePlugin namespace={config.namespace} />
    </LexicalComposer>
  );
};
