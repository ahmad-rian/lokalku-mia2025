"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { cn } from "../lib/utils";
import { SunFilledIcon, MoonFilledIcon } from "./icons";

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    // Check if View Transition API is supported
    if (!document.startViewTransition) {
      // Fallback for browsers that don't support View Transition API
      const newTheme = !isDark;
      setIsDark(newTheme);
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return;
    }

    // Start view transition
    await document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", newTheme ? "dark" : "light");
      });
    }).ready;

    // Get button position
    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    );

    // Animate
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }, [isDark, duration]);

  return (
    <button
      ref={buttonRef}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "w-10 h-10 rounded-lg transition-all duration-500 hover:scale-110 hover:bg-primary-50 dark:hover:bg-primary-900/20 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        className,
      )}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      {...props}
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <SunFilledIcon
          aria-hidden="true"
          className={`absolute inset-0 w-5 h-5 transition-all duration-700 ease-in-out transform ${isDark
              ? "rotate-180 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
            } group-hover:scale-110`}
        />
        <MoonFilledIcon
          aria-hidden="true"
          className={`absolute inset-0 w-5 h-5 transition-all duration-700 ease-in-out transform ${isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-180 scale-0 opacity-0"
            } group-hover:scale-110`}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
