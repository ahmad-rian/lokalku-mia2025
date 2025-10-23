import { Button } from "@heroui/button";
import { useTheme } from "@heroui/use-theme";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export function AnimatedThemeToggler() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        isIconOnly
        variant="ghost"
        className="w-10 h-10"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5" />
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      isIconOnly
      variant="ghost"
      className="w-10 h-10 transition-all duration-300 hover:scale-110 hover:bg-primary-50 dark:hover:bg-primary-900/20"
      onPress={toggleTheme}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <SunIcon 
          className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
            theme === "dark" 
              ? "rotate-90 scale-0 opacity-0" 
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <MoonIcon 
          className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
            theme === "dark" 
              ? "rotate-0 scale-100 opacity-100" 
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
    </Button>
  );
}