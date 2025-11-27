import { useEffect, useState } from "react";
import NumberTicker from "./number-ticker";

// LoaderOne - Three bouncing dots with CSS animations (optimized)
export const LoaderOne = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-4 w-4 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-400 to-neutral-300 dark:border-neutral-600 dark:from-neutral-500 dark:to-neutral-600 animate-bounce [animation-delay:0ms]" />
      <div className="h-4 w-4 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-400 to-neutral-300 dark:border-neutral-600 dark:from-neutral-500 dark:to-neutral-600 animate-bounce [animation-delay:200ms]" />
      <div className="h-4 w-4 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-400 to-neutral-300 dark:border-neutral-600 dark:from-neutral-500 dark:to-neutral-600 animate-bounce [animation-delay:400ms]" />
    </div>
  );
};

// LoaderTwo - Optimized with CSS animations
export const LoaderTwo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-4 w-4 rounded-full bg-neutral-200 shadow-md dark:bg-neutral-500 animate-pulse" />
      <div className="h-4 w-4 rounded-full bg-neutral-200 shadow-md dark:bg-neutral-500 animate-pulse [animation-delay:200ms]" />
      <div className="h-4 w-4 rounded-full bg-neutral-200 shadow-md dark:bg-neutral-500 animate-pulse [animation-delay:400ms]" />
    </div>
  );
};

// LoaderThree - Simple CSS spinner
export const LoaderThree = () => {
  return (
    <div className="h-20 w-20 animate-spin rounded-full border-4 border-neutral-200 border-t-yellow-500 dark:border-neutral-700 dark:border-t-yellow-400" />
  );
};

// Page loader - FORCED to wait until 100% with smooth animation
export const PageLoader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // MINIMUM loading time: 3 seconds untuk smooth animation
    const TOTAL_DURATION = 3000; // 3 detik
    const INTERVAL = 50; // Update setiap 50ms
    const INCREMENT = (100 / (TOTAL_DURATION / INTERVAL));

    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += INCREMENT;

      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(interval);

        // Tunggu 200ms lagi setelah 100% baru fade out
        setTimeout(() => {
          setIsComplete(true);
        }, 200);
      } else {
        setProgress(Math.floor(currentProgress));
      }
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // Don't render anything if complete
  if (isComplete) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-gray-950"
      style={{
        opacity: progress >= 100 ? 0 : 1,
        transition: progress >= 100 ? 'opacity 0.3s ease-out' : 'none',
        pointerEvents: 'all' // Always block interaction
      }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Large percentage number with NumberTicker */}
        <div className="relative">
          <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary-600 via-orange-500 to-orange-600 bg-clip-text text-transparent tabular-nums">
            <NumberTicker value={progress} startValue={0} />
            <span className="text-6xl md:text-7xl">%</span>
          </div>
          {/* Animated glow effect */}
          <div
            className="absolute inset-0 blur-3xl bg-gradient-to-r from-primary-600 via-orange-500 to-orange-600 -z-10 transition-opacity duration-300"
            style={{ opacity: 0.2 + (progress / 100) * 0.3 }}
          />
        </div>

        {/* Loading text with status */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium">
            {progress < 25 && "Memuat aset..."}
            {progress >= 25 && progress < 50 && "Memuat komponen..."}
            {progress >= 50 && progress < 75 && "Memuat data..."}
            {progress >= 75 && progress < 95 && "Hampir selesai..."}
            {progress >= 95 && "Selesai!"}
          </p>

          {/* Smooth progress bar */}
          <div className="w-64 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-600 via-orange-500 to-orange-600 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Loading dots animation */}
          <div className="flex gap-1.5 mt-2">
            <div
              className="w-2 h-2 rounded-full bg-primary transition-all duration-300"
              style={{
                opacity: progress > 0 ? 1 : 0.3,
                transform: progress > 0 ? 'scale(1)' : 'scale(0.8)'
              }}
            />
            <div
              className="w-2 h-2 rounded-full bg-primary transition-all duration-300"
              style={{
                opacity: progress > 33 ? 1 : 0.3,
                transform: progress > 33 ? 'scale(1)' : 'scale(0.8)'
              }}
            />
            <div
              className="w-2 h-2 rounded-full bg-primary transition-all duration-300"
              style={{
                opacity: progress > 66 ? 1 : 0.3,
                transform: progress > 66 ? 'scale(1)' : 'scale(0.8)'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Component loader for inline usage - optimized
export const ComponentLoader = ({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) => {
  const sizeClasses = {
    sm: "w-4 h-4 border",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-2",
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div
        className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
};

// Dots loader for variety - optimized
export const DotsLoader = () => {
  return (
    <div className="flex items-center justify-center gap-1">
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse [animation-delay:200ms]" />
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse [animation-delay:400ms]" />
    </div>
  );
};

// Skeleton loader for content - optimized
export const SkeletonLoader = ({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-muted rounded animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
};
