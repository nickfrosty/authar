import type { EditorThemeClasses } from "lexical";
import type { Klass, LexicalNode, LexicalNodeReplacement } from "lexical";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { CodeNode } from "@lexical/code";

/**
 * master list of available editor nodes
 */
export const LEXICAL_NODES: ReadonlyArray<
  Klass<LexicalNode> | LexicalNodeReplacement
> = [
  // comment for better diffs
  HeadingNode,
  CodeNode,
  LinkNode,
  AutoLinkNode,
  ListNode,
  ListItemNode,
  QuoteNode,
];

/**
 * master theme configuration for the editor
 */
export const LEXICAL_THEME: EditorThemeClasses = {
  root: "bg-red-500",
  link: "cursor-pointer",
  text: {
    bold: "font-semibold",
    underline: "underline",
    italic: "italic",
    strikethrough: "line-through",
    underlineStrikethrough: "underlined-line-through",
  },
};
