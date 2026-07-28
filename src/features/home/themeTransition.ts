import { flushSync } from "react-dom";

export type ThemeName = "dark" | "light";

type SetTheme = (theme: ThemeName) => void;

/**
 * Updates the DOM theme and React state inside the same view-transition frame.
 * Keeping both synchronous prevents the header icon from changing after the
 * circular transition has already started.
 */
export function changeTheme(nextTheme: ThemeName, setTheme: SetTheme, origin?: HTMLElement) {
  const root = document.documentElement;
  const bounds = origin?.getBoundingClientRect();

  if (bounds) {
    root.style.setProperty("--theme-origin-x", `${bounds.left + bounds.width / 2}px`);
    root.style.setProperty("--theme-origin-y", `${bounds.top + bounds.height / 2}px`);
  }

  const applyTheme = () => {
    root.classList.add("theme-switching");
    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;
    flushSync(() => setTheme(nextTheme));
  };

  const canAnimate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (canAnimate && "startViewTransition" in document) {
    const transition = document.startViewTransition(applyTheme);
    transition.finished.finally(() => root.classList.remove("theme-switching"));
    return;
  }

  applyTheme();
  window.requestAnimationFrame(() => root.classList.remove("theme-switching"));
}
