import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  IconVerified,
  IconLocation,
  IconReviews,
  IconRealtime,
  IconCommunity,
  IconSupport,
} from "./CustomIcons";

interface Benefit {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  description: string;
  gradient: string;
}

export default function BenefitsMarquee3D() {
  const { t } = useLanguage();

  const benefits: Benefit[] = [
    {
      icon: IconVerified,
      title: t("whyChoose.features.verified.title"),
      description: t("whyChoose.features.verified.description"),
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: IconLocation,
      title: t("whyChoose.features.location.title"),
      description: t("whyChoose.features.location.description"),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: IconReviews,
      title: t("whyChoose.features.reviews.title"),
      description: t("whyChoose.features.reviews.description"),
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: IconRealtime,
      title: t("whyChoose.features.realtime.title"),
      description: t("whyChoose.features.realtime.description"),
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: IconCommunity,
      title: t("whyChoose.features.community.title"),
      description: t("whyChoose.features.community.description"),
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: IconSupport,
      title: t("whyChoose.features.support.title"),
      description: t("whyChoose.features.support.description"),
      gradient: "from-red-500 to-pink-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8">
      <HoverEffect items={benefits} />
    </div>
  );
}

export const HoverEffect = ({
  items,
  className,
}: {
  items: Benefit[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4">
                <item.icon className="w-16 h-16 sm:w-20 sm:h-20" />
              </div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </div>
            {/* Decorative gradient orb */}
            <div
              className={cn(
                "absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20",
                "group-hover:opacity-30 transition-opacity duration-500",
                `bg-gradient-to-br ${item.gradient}`,
              )}
            />
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-white dark:bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-900 dark:text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-4 text-zinc-600 dark:text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
