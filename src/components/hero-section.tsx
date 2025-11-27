import { MapPinIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";

import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import TextType from "./ui/TextType";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";
import SearchModal from "./SearchModal";

import { useLanguage } from "@/contexts/LanguageContext";

// Lazy load Aurora Shader after LCP
const AuroraShader = lazy(() => import("./ui/aurora-shader"));

export default function HeroSection() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showAurora, setShowAurora] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Delay Aurora loading until after LCP (after preloader finishes)
    const timer = setTimeout(() => {
      setShowAurora(true);
    }, 3500); // After preloader (3s) + small buffer

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Search placeholders for PlaceholdersAndVanishInput
  const searchPlaceholders = [
    t("hero.searchPlaceholder"),
    "Warung makan terdekat...",
    "Jasa laundry 24 jam...",
    "Toko batik Banyumas...",
    "Bengkel motor terpercaya...",
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Small delay to let the vanish animation start
    setTimeout(() => {
      setIsSearchOpen(true);
    }, 300);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center pt-20 sm:pt-24">
        {/* Aurora Shader Background - Lazy loaded after LCP */}
        <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-50">
          {showAurora ? (
            <Suspense fallback={
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-transparent to-orange-100/20 dark:from-orange-900/10 dark:via-transparent dark:to-orange-800/10" />
            }>
              <AuroraShader
                colorStops={isDarkMode ? ["#ea580c", "#f97316", "#ea580c"] : ["#fed7aa", "#fdba74", "#fed7aa"]}
                amplitude={0.8}
                blend={0.6}
                speed={0.5}
              />
            </Suspense>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-transparent to-orange-100/20 dark:from-orange-900/10 dark:via-transparent dark:to-orange-800/10" />
          )}

          {isDarkMode && (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent" />
            </>
          )}
        </div>

        {/* Light mode background pattern */}
        {!isDarkMode && (
          <div className="absolute inset-0">
            <div className="absolute top-20 right-4 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-primary-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-4 sm:left-10 w-48 sm:w-96 h-48 sm:h-96 bg-orange-200/30 rounded-full blur-3xl" />
          </div>
        )}

        {/* Animated gradient orbs - Dark mode only */}
        {isDarkMode && (
          <>
            <div className="absolute top-1/4 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-primary-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto hero-content">
            {/* Main Heading - Optimized for LCP with content-visibility */}
            <h1
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              style={{
                contentVisibility: 'auto',
                containIntrinsicSize: '1px 200px'
              }}
            >
              <span className="block text-gray-900 dark:text-white mb-2">
                {t("hero.title")}
              </span>
              <span className="block bg-gradient-to-r from-primary-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                {t("hero.titleHighlight")}
              </span>
            </h1>

            {/* Javanese Script with Typing Effect - Deferred */}
            <div className="mb-6">
              <TextType
                className="text-2xl md:text-3xl font-medium text-orange-600 dark:text-orange-400/80"
                cursorCharacter="|"
                deletingSpeed={80}
                loop={true}
                pauseDuration={3000}
                showCursor={true}
                style={{ fontFamily: "NotoJavaneseRegular, serif" }}
                text={[
                  "ꦢꦶꦫꦺꦏ꧀ꦠꦺꦴꦂꦶ ꦈꦩ꧀ꦏꦺꦩ꧀ ꦧꦚꦸꦩꦱ꧀",
                  "Direktori UMKM Banyumas",
                  "Banyumas MSME Directory",
                ]}
                typingSpeed={150}
              />
            </div>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
              {t("hero.subtitle")}
            </p>

            {/* Search Bar with PlaceholdersAndVanishInput */}
            <div className="mb-10 max-w-2xl mx-auto">
              <PlaceholdersAndVanishInput
                placeholders={searchPlaceholders}
                onChange={handleSearchChange}
                onSubmit={handleSearchSubmit}
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <InteractiveHoverButton
                className="bg-gray-900 dark:bg-white/10 backdrop-blur-md border border-gray-900 dark:border-white/20 text-white font-semibold hover:bg-gray-800 dark:hover:bg-white/20 transition-all shadow-lg"
                onClick={() => navigate("/direktori")}
              >
                {t("hero.exploreButton")}
              </InteractiveHoverButton>

              <Link to="/peta/terdekat">
                <button
                  aria-label={`${t("hero.nearbyButton")} - Find nearby UMKM locations`}
                  className="border-2 border-gray-300 dark:border-white/30 text-gray-900 dark:text-white font-semibold px-6 py-3 rounded-xl text-base flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <MapPinIcon aria-hidden="true" className="w-5 h-5" />
                  <span>{t("hero.nearbyButton")}</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SearchModal
        initialQuery={searchValue}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
