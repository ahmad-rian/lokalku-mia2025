import React from "react";
import { motion } from "framer-motion";

// LoaderOne - Three bouncing dots as per the example
export const LoaderOne = () => {
  const transition = (x: number) => {
    return {
      duration: 1,
      repeat: Infinity,
      repeatType: "loop" as const,
      delay: x * 0.2,
      ease: "easeInOut" as const,
    };
  };

  return (
    <div className="flex items-center gap-2">
      <motion.div
        initial={{
          y: 0,
        }}
        animate={{
          y: [0, 10, 0],
        }}
        transition={transition(0)}
        className="h-4 w-4 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-400 to-neutral-300 dark:border-neutral-600 dark:from-neutral-500 dark:to-neutral-600"
      />
      <motion.div
        initial={{
          y: 0,
        }}
        animate={{
          y: [0, 10, 0],
        }}
        transition={transition(1)}
        className="h-4 w-4 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-400 to-neutral-300 dark:border-neutral-600 dark:from-neutral-500 dark:to-neutral-600"
      />
      <motion.div
        initial={{
          y: 0,
        }}
        animate={{
          y: [0, 10, 0],
        }}
        transition={transition(2)}
        className="h-4 w-4 rounded-full border border-neutral-300 bg-gradient-to-b from-neutral-400 to-neutral-300 dark:border-neutral-600 dark:from-neutral-500 dark:to-neutral-600"
      />
    </div>
  );
};

// LoaderTwo - Horizontal moving dots
export const LoaderTwo = () => {
  const transition = (x: number) => {
    return {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop" as const,
      delay: x * 0.2,
      ease: "easeInOut" as const,
    };
  };

  return (
    <div className="flex items-center">
      <motion.div
        transition={transition(0)}
        initial={{
          x: 0,
        }}
        animate={{
          x: [0, 20, 0],
        }}
        className="h-4 w-4 rounded-full bg-neutral-200 shadow-md dark:bg-neutral-500"
      />
      <motion.div
        initial={{
          x: 0,
        }}
        animate={{
          x: [0, 20, 0],
        }}
        transition={transition(0.4)}
        className="h-4 w-4 -translate-x-2 rounded-full bg-neutral-200 shadow-md dark:bg-neutral-500"
      />
      <motion.div
        initial={{
          x: 0,
        }}
        animate={{
          x: [0, 20, 0],
        }}
        transition={transition(0.8)}
        className="h-4 w-4 -translate-x-4 rounded-full bg-neutral-200 shadow-md dark:bg-neutral-500"
      />
    </div>
  );
};

// LoaderThree - SVG Lightning bolt with path animation
export const LoaderThree = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-20 w-20 stroke-neutral-500 [--fill-final:var(--color-yellow-300)] [--fill-initial:var(--color-neutral-50)] dark:stroke-neutral-100 dark:[--fill-final:var(--color-yellow-500)] dark:[--fill-initial:var(--color-neutral-800)]"
    >
      <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <motion.path
        initial={{ pathLength: 0, fill: "var(--fill-initial)" }}
        animate={{ pathLength: 1, fill: "var(--fill-final)" }}
        transition={{
          duration: 2,
          ease: "easeInOut" as const,
          repeat: Infinity,
          repeatType: "reverse" as const,
        }}
        d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"
      />
    </motion.svg>
  );
};

// Page loader with backdrop
export const PageLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }} // Faster fade for lighter feel
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }} // Faster scale animation
        className="flex flex-col items-center gap-4"
      >
        <LoaderOne />
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }} // Reduced delay
          className="text-sm text-muted-foreground font-medium"
        >
          Memuat...
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

// Component loader for inline usage
export const ComponentLoader = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-2"
  };

  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

// Dots loader for variety
export const DotsLoader = () => {
  return (
    <div className="flex items-center justify-center gap-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-2 h-2 bg-primary rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: index * 0.2
          }}
        />
      ))}
    </div>
  );
};

// Skeleton loader for content
export const SkeletonLoader = ({ 
  lines = 3, 
  className = "" 
}: { 
  lines?: number; 
  className?: string; 
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className="h-4 bg-muted rounded animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        />
      ))}
    </div>
  );
};