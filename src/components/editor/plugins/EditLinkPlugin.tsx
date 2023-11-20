import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import {
  $getSelection,
  COMMAND_PRIORITY_LOW,
  createCommand,
  LexicalCommand,
} from "lexical";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { computePosition } from "@floating-ui/dom";
import { $getSharedLinkTarget } from "../utils";
import { useClickOutside } from "@/hooks/useClickOutside";
import { IconButton } from "../IconButton";

type EditLinkMenuPosition = { x: number; y: number } | undefined;

export const TOGGLE_EDIT_LINK_MENU: LexicalCommand<undefined> = createCommand();

export const EditLinkPlugin = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [pos, setPos] = useState<EditLinkMenuPosition>(undefined);
  const [domRange, setDomRange] = useState<Range | undefined>(undefined);
  const [hasLink, setHasLink] = useState(false);

  const [editor] = useLexicalComposerContext();

  const resetState = useCallback(() => {
    setValue("");
    setError(false);
    setPos(undefined);
    setDomRange(undefined);
    editor.focus();
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      TOGGLE_EDIT_LINK_MENU,
      () => {
        const nativeSel = window.getSelection();
        const isCollapsed =
          nativeSel?.rangeCount === 0 || nativeSel?.isCollapsed;

        if (!!pos?.x || !!pos?.y || !ref.current || !nativeSel || isCollapsed) {
          resetState();
          return false;
        }

        const domRange = nativeSel.getRangeAt(0);

        computePosition(domRange, ref.current, { placement: "bottom" })
          .then((pos) => {
            setPos({ x: pos.x, y: pos.y + 10 });
            setDomRange(domRange);
            editor.getEditorState().read(() => {
              const selection = $getSelection();
              const linkTarget = $getSharedLinkTarget(selection);
              setHasLink(!!linkTarget);
            });
          })
          .catch(() => {
            resetState();
          });

        return true;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor, pos, resetState]);

  useEffect(() => {
    if (pos?.x && pos?.y) {
      let initialUrl = "";

      editor.getEditorState().read(() => {
        const selection = $getSelection();
        initialUrl = $getSharedLinkTarget(selection) ?? "";
      });

      setValue(initialUrl);
      inputRef.current?.focus();
    }
  }, [pos, editor]);

  useClickOutside(ref, () => {
    resetState();
  });

  const handleSetLink = () => {
    if (!value) return;

    const isLinkSet = editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
      url: value,
      target: "_blank",
    });

    if (isLinkSet) resetState();
    else setError(true);
  };

  const handleRemoveLink = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    resetState();
  };

  return (
    <div
      ref={ref}
      style={{ top: pos?.y, left: pos?.x }}
      aria-hidden={!pos?.x || !pos?.y}
      className={clsx(
        "absolute flex items-center justify-between border rounded-md p-1 gap-1",
        "bg-gray-800 text-white shadow-md",
        error ? "border-red-600" : "border-gray-300",
        pos?.x && pos.y ? "opacity-1 visible" : "opacity-0 invisible",
      )}
    >
      <input
        autoFocus
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="px-2 py-1 text-sm min-w-[22rem] bg-transparent border-none outline-none"
        placeholder="Enter URL"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSetLink();
            return;
          }

          if (e.key === "Escape") {
            e.preventDefault();
            resetState();
            return;
          }
        }}
      />

      {!!hasLink && <IconButton icon="Trash" onClick={handleRemoveLink} />}

      <IconButton icon="Check" disabled={!value} onClick={handleSetLink} />
    </div>
  );
};
