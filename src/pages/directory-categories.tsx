import React, { useState, useMemo } from "react";
import { Button, Chip } from "@heroui/react";
import {
  Search,
  Grid3X3,
  List,
  Store,
  Utensils,
  Shirt,
  ChevronRight,
  ArrowRight,
  LucideIcon,
  Layers,
  ShoppingBag,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useLanguage } from "@/contexts/LanguageContext";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import LazySection from "@/components/LazySection";
import LazyImage from "@/components/LazyImage";
import DefaultLayout from "@/layouts/default";
import { getUMKMByCategory } from "@/data/umkm-data";

interface Category {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: LucideIcon;
  count: number;
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  image: string;
}

export default function DirectoryCategoriesPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Create detailed categories with counts from centralized data
  const categories: Category[] = [
    {
      id: "Makanan & Minuman",
      name: "Makanan & Minuman",
      nameEn: "Food & Beverage",
      description: "Makanan dan minuman lokal khas Banyumas",
      descriptionEn: "Local food and beverages from Banyumas",
      icon: Utensils,
      count: getUMKMByCategory("Makanan & Minuman").length,
      color: "warning",
      image: "/assets/data-umkm/Cuankuy/cuankuy-1.webp",
    },
    {
      id: "Kafe & Resto",
      name: "Kafe & Resto",
      nameEn: "Cafe & Restaurant",
      description: "Kafe dan kedai kopi dengan suasana nyaman",
      descriptionEn: "Cafes and coffee shops with cozy atmosphere",
      icon: Store,
      count: getUMKMByCategory("Kafe & Resto").length,
      color: "primary",
      image: "/assets/data-umkm/Nakopi/nakopi.webp",
    },
    {
      id: "Fashion",
      name: "Fashion",
      nameEn: "Fashion",
      description: "Pakaian, batik, dan aksesoris tradisional",
      descriptionEn: "Clothing, batik, and traditional accessories",
      icon: Shirt,
      count: getUMKMByCategory("Fashion").length,
      color: "secondary",
      image: "/assets/data-umkm/pringmasbatik/pringmas.webp",
    },
    {
      id: "Retail",
      name: "Retail",
      nameEn: "Retail",
      description: "Minimarket dan toko kebutuhan sehari-hari",
      descriptionEn: "Minimarkets and daily necessities stores",
      icon: ShoppingBag,
      count: getUMKMByCategory("Retail").length,
      color: "success",
      image: "/assets/data-umkm/Boersakampus/boersa-1.webp",
    },
  ];

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;

    return categories.filter((category) => {
      const name = language === "en" ? category.nameEn : category.name;
      const description =
        language === "en" ? category.descriptionEn : category.description;

      return (
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [categories, searchQuery, language]);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/direktori?kategori=${categoryId}`);
  };

  const placeholders = [
    language === "en" ? "Search categories..." : "Cari kategori...",
    language === "en" ? "Find your business type..." : "Temukan jenis usaha...",
    language === "en" ? "Explore categories..." : "Jelajahi kategori...",
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Calculate total UMKM count
  const totalUMKM = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 sm:pt-24">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Link
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                to="/"
              >
                {language === "en" ? "Home" : "Beranda"}
              </Link>
              <ChevronRight size={16} />
              <Link
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                to="/direktori"
              >
                {language === "en" ? "SMEs Directory" : "Direktori UMKM"}
              </Link>
              <ChevronRight size={16} />
              <span className="text-gray-900 dark:text-white font-medium">
                {language === "en" ? "Categories" : "Kategori"}
              </span>
            </nav>

            {/* Page Title with Icon */}
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                <Layers className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h1 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white">
                  {language === "en" ? "UMKM Categories" : "Kategori UMKM"}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {language === "en"
                    ? `Explore ${filteredCategories.length} categories with ${totalUMKM} local businesses`
                    : `Jelajahi ${filteredCategories.length} kategori dengan ${totalUMKM} usaha lokal`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and View Toggle Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Search Input - Extended width */}
              <div className="flex-1 max-w-none">
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={handleSearchChange}
                  onSubmit={handleSearchSubmit}
                />
              </div>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex border border-gray-200 dark:border-gray-700 rounded-lg p-1 flex-shrink-0">
                <Button
                  className="min-w-0 px-3"
                  size="sm"
                  startContent={<Grid3X3 size={16} />}
                  variant={viewMode === "grid" ? "solid" : "light"}
                  onPress={() => setViewMode("grid")}
                >
                  Grid
                </Button>
                <Button
                  className="min-w-0 px-3"
                  size="sm"
                  startContent={<List size={16} />}
                  variant={viewMode === "list" ? "solid" : "light"}
                  onPress={() => setViewMode("list")}
                >
                  List
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Info */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              {language === "en"
                ? `${filteredCategories.length} categories available`
                : `${filteredCategories.length} kategori tersedia`}
            </p>
          </div>

          {/* Categories Grid/List */}
          {filteredCategories.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                  : "grid grid-cols-1 gap-4"
              }
            >
              {filteredCategories.map((category, index) => {
                const IconComponent = category.icon;
                const name =
                  language === "en" ? category.nameEn : category.name;
                const description =
                  language === "en"
                    ? category.descriptionEn
                    : category.description;

                return (
                  <LazySection
                    key={category.id}
                    animationType="slideUp"
                    className="h-full"
                    delay={index * 0.05}
                  >
                    <div
                      className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden h-full flex group ${
                        viewMode === "list" ? "flex-row gap-4 p-4" : "flex-col"
                      }`}
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {/* Image with Icon Overlay */}
                      <div
                        className={`relative flex-shrink-0 overflow-hidden ${
                          viewMode === "list"
                            ? "w-48 h-32 rounded-lg"
                            : "w-full h-48"
                        }`}
                      >
                        <LazyImage
                          alt={name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          src={category.image}
                        />

                        {/* Icon Overlay with Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 flex items-center justify-center group-hover:from-black/80 group-hover:via-black/50 transition-all duration-300">
                          <div className="bg-white/95 dark:bg-gray-800/95 rounded-full p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <IconComponent
                              className="text-primary-600 dark:text-primary-400"
                              size={32}
                            />
                          </div>
                        </div>

                        {/* Count Badge */}
                        <div className="absolute top-3 right-3">
                          <Chip
                            className="text-white font-semibold shadow-md"
                            color={category.color}
                            size="sm"
                            variant="solid"
                          >
                            {category.count}
                          </Chip>
                        </div>
                      </div>

                      {/* Content */}
                      <div
                        className={`flex flex-col flex-1 ${viewMode === "list" ? "justify-between" : "p-5"}`}
                      >
                        <div className="flex-1">
                          <h3 className="font-playfair text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
                            {name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                            {description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                          <Chip
                            className="font-medium"
                            color={category.color}
                            size="sm"
                            variant="flat"
                          >
                            {category.count}{" "}
                            {language === "en" ? "businesses" : "usaha"}
                          </Chip>

                          <ArrowRight
                            className="text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                            size={20}
                          />
                        </div>
                      </div>
                    </div>
                  </LazySection>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <Search className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="font-playfair text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {language === "en"
                    ? "No categories found"
                    : "Kategori tidak ditemukan"}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {language === "en"
                    ? "Try adjusting your search terms to find what you're looking for."
                    : "Coba sesuaikan kata kunci pencarian untuk menemukan yang Anda cari."}
                </p>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-8 text-center">
            <h2 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {language === "en"
                ? "Can't find what you're looking for?"
                : "Tidak menemukan yang Anda cari?"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              {language === "en"
                ? "Browse all businesses in our directory or use the search feature to find specific UMKM."
                : "Jelajahi semua usaha di direktori kami atau gunakan fitur pencarian untuk menemukan UMKM spesifik."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                color="primary"
                endContent={<ArrowRight size={18} />}
                size="lg"
                onPress={() => navigate("/direktori")}
              >
                {language === "en" ? "Browse All UMKM" : "Jelajahi Semua UMKM"}
              </Button>
              <Button
                size="lg"
                variant="bordered"
                onPress={() => navigate("/direktori/terbaru")}
              >
                {language === "en" ? "View Latest" : "Lihat Terbaru"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
