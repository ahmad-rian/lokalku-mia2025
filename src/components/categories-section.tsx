import { Button, Card, CardBody } from "@heroui/react";
import { Link } from "react-router-dom";
import { 
  ShoppingBagIcon, 
  CakeIcon, 
  WrenchScrewdriverIcon,
  ChevronRightIcon,
  HeartIcon,
  ComputerDesktopIcon,
  TruckIcon,
  AcademicCapIcon,
  BuildingStorefrontIcon
} from "@heroicons/react/24/outline";
import LazySection from "./LazySection";
import { useLanguage } from "../contexts/LanguageContext";
import { useState, useEffect } from "react";

export default function CategoriesSection() {
  const { t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);
  
  const categories = [
    {
      id: 1,
      name: t("categories.items.food.name"),
      count: 45,
      icon: CakeIcon,
      description: t("categories.items.food.description"),
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
    },
    {
      id: 2,
      name: t("categories.items.fashion.name"),
      count: 28,
      icon: ShoppingBagIcon,
      description: t("categories.items.fashion.description"),
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
    },
    {
      id: 3,
      name: t("categories.items.services.name"),
      count: 32,
      icon: WrenchScrewdriverIcon,
      description: t("categories.items.services.description"),
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
    },
    {
      id: 4,
      name: t("categories.items.health.name"),
      count: 19,
      icon: HeartIcon,
      description: t("categories.items.health.description"),
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20"
    },
    {
      id: 5,
      name: t("categories.items.technology.name"),
      count: 15,
      icon: ComputerDesktopIcon,
      description: t("categories.items.technology.description"),
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20"
    },
    {
      id: 6,
      name: t("categories.items.transportation.name"),
      count: 12,
      icon: TruckIcon,
      description: t("categories.items.transportation.description"),
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
    },
    {
      id: 7,
      name: t("categories.items.education.name"),
      count: 8,
      icon: AcademicCapIcon,
      description: t("categories.items.education.description"),
      gradient: "from-amber-500 to-yellow-500",
      bgGradient: "from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20"
    },
    {
      id: 8,
      name: t("categories.items.others.name"),
      count: 23,
      icon: BuildingStorefrontIcon,
      description: t("categories.items.others.description"),
      gradient: "from-gray-500 to-slate-500",
      bgGradient: "from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20"
    }
  ];

  return (
    <LazySection 
      animationType="slideLeft" 
      className="py-16 md:py-24 bg-gradient-to-br from-blue-50/30 via-white to-orange-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
            {t("categories.title")}{" "}
            <span className="bg-gradient-to-r from-primary-600 to-orange-500 bg-clip-text text-transparent">
              {t("categories.subtitle")}
            </span>
          </h2>
          
          {/* Javanese Script */}
          <div className="mb-4">
            <p className="text-xl md:text-2xl font-medium text-primary-700 dark:text-primary-300" style={{ fontFamily: 'NotoJavaneseRegular, serif' }}>
              ꦗꦼꦭꦗꦲꦶ ꦏꦠꦼꦒꦺꦴꦂꦶ
            </p>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("categories.description")}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-pointer"
              isPressable
            >
              <CardBody className="text-center p-6">
                {/* Icon Container */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.bgGradient} p-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`w-full h-full rounded-xl bg-gradient-to-br ${category.gradient} p-2 shadow-lg`}>
                    <category.icon className="w-full h-full text-white" />
                  </div>
                </div>

                {/* Category Info */}
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 line-clamp-2">
                  {category.name}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {category.description}
                </p>

                {/* Count Badge */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${category.gradient} text-white shadow-md`}>
                  {category.count} {t("categories.umkmLabel")}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            size="lg"
            as={Link}
            to="/direktori"
            className="bg-gradient-to-r from-primary-600 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all px-8"
            endContent={<ChevronRightIcon className="w-4 h-4" />}
          >
            {t("categories.viewAll")}
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="relative mt-16">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-[0.02]">
            <div className="w-96 h-96 bg-gradient-conic from-primary-200 via-secondary-200 to-primary-200 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </LazySection>
  );
}