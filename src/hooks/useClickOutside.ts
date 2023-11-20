import { useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T> | null,
  callback: () => void,
) {
  useEffect(() => {
    const element = ref?.current;

    function handleClickOutside(event: Event) {
      if (element && !element.contains(event.target as Node | null)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}
