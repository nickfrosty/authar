import { useCallback, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { debounce } from "@/lib/helpers";

type LocalStoragePluginProps = {
  namespace: string;
};

/**
 * Lexical editor plugin to store and sync the editor content with local storage
 */
export function LocalStoragePlugin({ namespace }: LocalStoragePluginProps) {
  const [editor] = useLexicalComposerContext();

  const saveContent = useCallback(
    (content: string) => {
      localStorage.setItem(namespace, content);
    },
    [namespace],
  );

  const debouncedSaveContent = debounce(saveContent, 500);

  useEffect(() => {
    return editor.registerUpdateListener(
      ({ editorState, dirtyElements, dirtyLeaves }) => {
        // Don't update if nothing changed
        if (dirtyElements.size === 0 && dirtyLeaves.size === 0) return;

        debouncedSaveContent(JSON.stringify(editorState));
      },
    );
  }, [debouncedSaveContent, editor]);

  return null;
}
