import { $isRangeSelection, EditorState, RangeSelection } from "lexical";
import { $isLinkNode } from "@lexical/link";

/**
 * Check if there is a selection that spans across
 * content, i.e. is not empty
 */
export function $isRangeSelected(
  selection: EditorState["_selection"],
): selection is RangeSelection {
  return $isRangeSelection(selection) && !selection.anchor.is(selection.focus);
}

/**
 * Check if all nodes in the selection share the same link target.
 * If so, return the link target, otherwise return undefined.
 */
export function $getSharedLinkTarget(
  selection?: EditorState["_selection"],
): string | undefined {
  const nodes = selection?.getNodes();
  if (!nodes?.length) return undefined;

  const sharedLinkTarget = nodes.every((node, i, arr) => {
    const parent = node.getParent();
    if (!$isLinkNode(parent)) return false;

    const linkTarget = parent.getURL();
    const prevLinkTarget = arr[i - 1]?.getParent()?.getURL();

    return i > 0 ? linkTarget === prevLinkTarget : true;
  });

  return sharedLinkTarget ? nodes[0].getParent()?.getURL() : undefined;
}
