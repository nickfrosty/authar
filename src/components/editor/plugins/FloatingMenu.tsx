"use client";

import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { $isLinkNode } from "@lexical/link";
import { $getSelection, FORMAT_TEXT_COMMAND, LexicalEditor } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { computePosition } from "@floating-ui/dom";
import {
  FeatherIcon,
  type FeatherIconName,
} from "@/components/core/FeatherIcon";

import { $isRangeSelected } from "../utils";
import { useUserInteractions } from "@/hooks/useUserInteractions";

// import { TOGGLE_EDIT_LINK_MENU } from "./EditLink";

type FloatingMenuPosition = { x: number; y: number } | undefined;

type FloatingMenuProps = {
  editor: LexicalEditor;
  show: boolean;
  state: FloatingMenuState;
};

type FloatingMenuState = {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
  isLink: boolean;
  isCode: boolean;
};

function FloatingMenu({ editor, show, state }: FloatingMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<FloatingMenuPosition>(undefined);

  const nativeSel = window.getSelection();

  useEffect(() => {
    const isCollapsed = nativeSel?.rangeCount === 0 || nativeSel?.isCollapsed;

    if (!show || !ref.current || !nativeSel || isCollapsed) {
      setPos(undefined);
      return;
    }
    const domRange = nativeSel.getRangeAt(0);

    computePosition(domRange, ref.current, { placement: "top" })
      .then((pos) => {
        setPos({ x: pos.x, y: pos.y - 10 });
      })
      .catch(() => {
        setPos(undefined);
      });
    // anchorOffset, so that we sync the menu position with
    // native selection (if user selects two ranges consecutively)
  }, [show, nativeSel, nativeSel?.anchorOffset]);

  return (
    <div
      ref={ref}
      style={{ top: pos?.y, left: pos?.x }}
      aria-hidden={!pos?.x || !pos?.y}
      className={clsx(
        "fixed flex items-center justify-between border rounded-md p-1 gap-1",
        "bg-gray-800 text-white border-gray-300 shadow-md",
        pos?.x && pos.y ? "opacity-1 visible" : "opacity-0 invisible",
      )}
    >
      <IconButton
        icon="Bold"
        aria-label="Format text as bold"
        active={state.isBold}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
      />
      <IconButton
        icon="Italic"
        aria-label="Format text as italics"
        active={state.isItalic}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
      />
      <IconButton
        icon="Underline"
        aria-label="Format text to underlined"
        active={state.isUnderline}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
      />
      <IconButton
        icon="Minus"
        aria-label="Format text with a strikethrough"
        active={state.isStrikethrough}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
      />
      <IconButton
        icon="Code"
        aria-label="Format text with inline code"
        active={state.isCode}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
        }}
      />
      {/* <IconButton
        icon="Link"
        aria-label="Add or edit link"
        active={props.isLink}
        onClick={() => {
          editor.dispatchCommand(TOGGLE_EDIT_LINK_MENU, undefined);
        }}
      /> */}
    </div>
  );
}

export const FloatingMenuPlugin = () => {
  const [show, setShow] = useState(false);
  const [state, setState] = useState<FloatingMenuState>({
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isStrikethrough: false,
    isLink: false,
    isCode: false,
  });

  const { isPointerDown, isKeyDown } = useUserInteractions();
  const [editor] = useLexicalComposerContext();

  const updateFloatingMenu = useCallback(() => {
    editor.getEditorState().read(() => {
      if (editor.isComposing() || isPointerDown || isKeyDown) return;

      if (editor.getRootElement() !== document.activeElement) {
        setShow(false);
        return;
      }

      const selection = $getSelection();

      if ($isRangeSelected(selection)) {
        const nodes = selection.getNodes();

        setState({
          isBold: selection.hasFormat("bold"),
          isItalic: selection.hasFormat("italic"),
          isUnderline: selection.hasFormat("underline"),
          isStrikethrough: selection.hasFormat("strikethrough"),
          isCode: selection.hasFormat("code"),
          isLink: nodes.every((node) => $isLinkNode(node.getParent())),
        });

        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [editor, isPointerDown, isKeyDown]);

  // Rerender the floating menu automatically on every state update.
  // Needed to show correct state for active formatting state.
  useEffect(() => {
    return editor.registerUpdateListener(() => {
      updateFloatingMenu();
    });
  }, [editor, updateFloatingMenu]);

  // Rerender the floating menu on relevant user interactions.
  // Needed to show/hide floating menu on pointer up / key up.
  useEffect(() => {
    updateFloatingMenu();
  }, [isPointerDown, isKeyDown, updateFloatingMenu]);

  return createPortal(
    <FloatingMenu editor={editor} show={show} state={state} />,
    // set the anchored element to be the entire document
    // note: this is okay since this Lexical plugin will
    // only be activated within the `LexicalEditor` context
    document.body,
  );

  /**
   * note: when the `document` is attempted to be accessed on the server during
   * the initial page load, it will kick an error on the server.
   *
   * hack: as a workaround, the parent `Editor` is conditionally rendered based
   * on a `useEffect` for accessing `localStorage`. if that changes, this cause
   * the error again
   */
};

type IconButtonProps = {
  icon: FeatherIconName;
  active?: boolean;
} & React.ComponentProps<"button">;

const IconButton = ({ icon, active, className, ...props }: IconButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        "p-2 rounded-md text-sm hover:bg-gray-900",
        // active ? "" : "",
        className,
      )}
      {...props}
    >
      <FeatherIcon name={icon} size={18} strokeWidth={active ? 3.4 : 1.4} />
    </button>
  );
};
