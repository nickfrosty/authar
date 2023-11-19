import type { EditorThemeClasses } from "lexical";
import type { Klass, LexicalNode, LexicalNodeReplacement } from "lexical";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";

/**
 * master list of available editor nodes
 */
export const LEXICAL_NODES: ReadonlyArray<
  Klass<LexicalNode> | LexicalNodeReplacement
> = [
  // comment for better diffs
  CodeNode,
  HeadingNode,
  LinkNode,
  ListNode,
  ListItemNode,
  QuoteNode,
];

/**
 * master theme configuration for the editor
 */
export const LEXICAL_THEME: EditorThemeClasses = {
  root: "p-4 border-slate-500 border-2 rounded h-full min-h-[200px] focus:outline-none focus-visible:border-black",
  link: "cursor-pointer",
  text: {
    bold: "font-semibold",
    underline: "underline",
    italic: "italic",
    strikethrough: "line-through",
    underlineStrikethrough: "underlined-line-through",
  },
};
