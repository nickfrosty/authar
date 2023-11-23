"use client";

import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";

import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

import { useEditorHistoryState } from "./context/EditorHistoryState";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";

import {
  AutoLinkPlugin,
  EditLinkPlugin,
  FloatingMenuPlugin,
  LocalStoragePlugin,
  OpenLinkPlugin,
} from "./plugins";
import { isValidUrl } from "@/lib/helpers";

type LexicalEditorProps = {
  config: Parameters<typeof LexicalComposer>["0"]["initialConfig"];
};

export const LexicalEditor = ({ config }: LexicalEditorProps) => {
  const { historyState } = useEditorHistoryState();

  return (
    <LexicalComposer initialConfig={config}>
      {/* custom plugins */}
      <LocalStoragePlugin namespace={config.namespace} />
      <FloatingMenuPlugin />
      <AutoLinkPlugin />
      <EditLinkPlugin />
      <OpenLinkPlugin />

      {/* official plugins */}
      <RichTextPlugin
        contentEditable={<ContentEditable spellCheck={true} />}
        ErrorBoundary={LexicalErrorBoundary}
        // note: we must provide a component, but it is rendered below the editor?
        placeholder={<></>}
      />
      <HistoryPlugin externalHistoryState={historyState} />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <ListPlugin />
      <LinkPlugin validateUrl={isValidUrl} />
    </LexicalComposer>
  );
};
