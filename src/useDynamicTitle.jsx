import { useEffect } from "react";

export function useDynamicTitle(title) {
  useEffect(() => {
    const isPWA =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    // Only show title outside the PWA splash
    if (!isPWA) {
      document.title = title;
    } else {
      // Keep it empty during splash
      document.title = " ";
    }
  }, [title]);
}
