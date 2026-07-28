export type ThemeName = "dark" | "light";

type SetTheme = (theme: ThemeName) => void;

/**
 * Applies a theme in one style recalculation and lets the browser cross-fade
 * the two rendered frames. This avoids animating every colour, shadow and
 * background on the page at once.
 */
export function changeTheme(nextTheme: ThemeName, setTheme: SetTheme) {
  const root = document.documentElement;

  const applyTheme = () => {
    root.classList.add("theme-switching");
    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;
    setTheme(nextTheme);

    window.requestAnimationFrame(() => root.classList.remove("theme-switching"));
  };

  const canAnimate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (canAnimate && "startViewTransition" in document) {
    document.startViewTransition(applyTheme);
    return;
  }

  applyTheme();
}
