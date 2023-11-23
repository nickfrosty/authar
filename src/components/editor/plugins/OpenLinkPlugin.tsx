import { useEffect, useRef, useState } from "react";

import { createCommand, LexicalCommand } from "lexical";
import { computePosition } from "@floating-ui/dom";
import { LinkNode } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { debounce } from "@/lib/helpers";
import { IconButton } from "../IconButton";
import clsx from "clsx";

type OpenLinkMenuPosition = { x: number; y: number } | undefined;

export const LINK_SELECTOR = `[data-lexical-editor] a`;
export const OPEN_LINK_MENU_ID = "open-link-menu";

export const OpenLinkPlugin = () => {
  const ref = useRef<HTMLDivElement>(null);
  const linkSetRef = useRef<Set<string>>(new Set());

  const [copied, setCopied] = useState(false);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [pos, setPos] = useState<OpenLinkMenuPosition>(undefined);
  const [link, setLink] = useState<string | null>(null);

  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const menu = (e.target as HTMLElement).closest<HTMLElement>(
        `#${OPEN_LINK_MENU_ID}`,
      );
      if (menu) return;

      const link = (e.target as HTMLElement).closest<HTMLElement>(
        LINK_SELECTOR,
      );

      if (!link || !ref.current) {
        setPos(undefined);
        setLink(null);
        return;
      }

      computePosition(link, ref.current, { placement: "bottom" })
        .then((pos) => {
          setPos({ x: pos.x, y: pos.y + 10 });
          setLink(link.getAttribute("href"));
        })
        .catch(() => {
          setPos(undefined);
        });

      return true;
    };

    const debouncedMouseMove = debounce(handleMouseMove, 200);

    return editor.registerMutationListener(LinkNode, (mutations) => {
      for (const [key, type] of mutations) {
        switch (type) {
          case "created":
          case "updated":
            linkSetRef.current.add(key);
            if (linkSetRef.current.size === 1)
              document.addEventListener("mousemove", debouncedMouseMove);
            break;

          case "destroyed":
            linkSetRef.current.delete(key);
            if (linkSetRef.current.size === 0)
              document.removeEventListener("mousemove", debouncedMouseMove);
            break;
        }
      }
    });
  }, [editor, pos]);

  return (
    <div
      id={OPEN_LINK_MENU_ID}
      ref={ref}
      style={{ top: pos?.y, left: pos?.x, width }}
      aria-hidden={!pos?.x || !pos?.y}
      className={clsx(
        "flex break-all max-w-md items-center justify-between border p-1 gap-1",
        "bg-slate-100 border-slate-300 rounded-md shadow-md",
        pos?.x && pos.y
          ? "opacity-1 visible fixed"
          : "opacity-0 invisible hidden",
      )}
    >
      {link && !copied ? (
        <a
          className="text-sm ml-2 opacity-75 cursor-pointer"
          href={link}
          target="_blank"
          rel="noreferrer noopener"
        >
          {link}
        </a>
      ) : (
        <span className="w-full text-xs text-center opacity-75 cursor-pointer">
          {copied ? "🎉 Copied!" : "No link"}
        </span>
      )}

      {link ? (
        <IconButton
          icon="Copy"
          onClick={() => {
            navigator.clipboard.writeText(link);
            setCopied(true);
            setWidth(ref.current?.getBoundingClientRect().width);
            setTimeout(() => {
              setCopied(false);
              setWidth(undefined);
            }, 1000);
          }}
        />
      ) : undefined}
    </div>
  );
};
