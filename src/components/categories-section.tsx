import { Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, 
  Cake, 
  ChevronRight,
  Store
} from "lucide-react";
import LazySection from "./LazySection";
import { useLanguage } from "../contexts/LanguageContext";
import { getUMKMByCategory } from "@/data/umkm-data";

export default function CategoriesSection() {
  const { t } = useLanguage();
  
  // Get categories from centralized data and add UI-specific properties
  const categoryItems = [
    {
      id: 1,
      name: "Makanan & Minuman",
      count: getUMKMByCategory("Makanan & Minuman").length,
      icon: Cake,
      description: "Makanan dan minuman lokal khas Banyumas",
      gradient: "from-orange-500 to-red-500",
      image: "/assets/data-umkm/Cuankuy/cuankuy-1.webp",
      imageCredit: "Cuankuy"
    },
    {
      id: 2,
      name: "Fashion",
      count: getUMKMByCategory("Fashion").length,
      icon: ShoppingBag,
      description: "Pakaian, batik, dan aksesoris tradisional",
      gradient: "from-purple-500 to-pink-500",
      image: "/assets/data-umkm/pringmasbatik/pringmas.webp",
      imageCredit: "Pringmas Batik"
    },
    {
      id: 3,
      name: "Kafe & Resto",
      count: getUMKMByCategory("Kafe & Resto").length,
      icon: Store,
      description: "Kafe dan kedai kopi dengan suasana nyaman",
      gradient: "from-blue-500 to-cyan-500",
      image: "/assets/data-umkm/Nakopi/nakopi.webp",
      imageCredit: "Nakopi"
    },
    {
      id: 4,
      name: "Retail",
      count: getUMKMByCategory("Retail").length,
      icon: Store,
      description: "Minimarket dan toko kebutuhan sehari-hari",
      gradient: "from-teal-500 to-cyan-500",
      image: "/assets/data-umkm/Boersakampus/boersa-1.webp",
      imageCredit: "Boersa Kampus"
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
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900 dark:text-white mb-4">
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

        {/* Categories Grid - Simple Equal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categoryItems.map((category) => {
            const IconComponent = category.icon;
            
            return (
              <Link
                key={category.id}
                to="/direktori/kategori"
                className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Image Section - Fixed Height */}
                <div className="relative h-40 overflow-hidden rounded-t-xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-20`} />
                  
                  {/* Image Credit */}
                  <div className="absolute bottom-2 right-2 text-xs text-white/70 bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
                    {category.imageCredit}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-3 mb-2">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0">
                      <IconComponent className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                    {category.description}
                  </p>

                  {/* Count */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {category.count} UMKM
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            size="lg"
            as={Link}
            to="/direktori/kategori"
            className="bg-gradient-to-r from-primary-600 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all px-8"
            endContent={<ChevronRight className="w-4 h-4" />}
          >
            {t("categories.viewAll")}
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="relative mt-16">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-[0.02]">
            <div className="w-48 sm:w-96 h-48 sm:h-96 bg-gradient-conic from-primary-200 via-secondary-200 to-primary-200 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </LazySection>
  );
}