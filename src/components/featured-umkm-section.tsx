import { Button } from "@heroui/react";
import { ArrowRightIcon, FireIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import LazySection from "./LazySection";
import { useLanguage } from "../contexts/LanguageContext";
import Masonry from "./Masonry";
import ErrorBoundary from "./ErrorBoundary";
import { useState, useEffect } from "react";

export default function FeaturedUMKMSection() {
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
  
  // Data UMKM untuk Masonry
  const umkmItems = [
    {
      id: "1",
      img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&h=600&fit=crop",
      url: "/umkm/1",
      height: 400,
      name: "Warung Sate Pak Kumis",
      category: "Kuliner"
    },
    {
      id: "2",
      img: "https://images.unsplash.com/photo-1610003524635-5fe4c7e11b32?w=800&h=600&fit=crop",
      url: "/umkm/2",
      height: 500,
      name: "Batik Gumelem Asli",
      category: "Fashion & Kerajinan"
    },
    {
      id: "3",
      img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop",
      url: "/umkm/3",
      height: 350,
      name: "Getuk Goreng Bu Tini",
      category: "Makanan & Oleh-oleh"
    },
    {
      id: "4",
      img: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop",
      url: "/umkm/4",
      height: 450,
      name: "Kopi Gunung Slamet",
      category: "Kafe & Minuman"
    },
    {
      id: "5",
      img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop",
      url: "/umkm/5",
      height: 380,
      name: "Salon Cantik Ayu",
      category: "Kecantikan"
    },
    {
      id: "6",
      img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop",
      url: "/umkm/6",
      height: 420,
      name: "Mendoan Cokro Kembang",
      category: "Kuliner"
    },
    {
      id: "7",
      img: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&h=600&fit=crop",
      url: "/umkm/7",
      height: 360,
      name: "Bengkel Motor Jaya Abadi",
      category: "Otomotif & Jasa"
    },
    {
      id: "8",
      img: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&h=600&fit=crop",
      url: "/umkm/8",
      height: 390,
      name: "Lanting Bu Narti",
      category: "Makanan & Oleh-oleh"
    },
    {
      id: "9",
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
      url: "/umkm/9",
      height: 440,
      name: "Warung Gudeg Bu Sari",
      category: "Kuliner"
    },
    {
      id: "10",
      img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=600&fit=crop",
      url: "/umkm/10",
      height: 370,
      name: "Toko Batik Banyumas",
      category: "Fashion"
    }
  ];

  return (
    <LazySection 
      id="featured"
      animationType="slideUp" 
      className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-orange-50/30 to-blue-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-200/20 dark:bg-primary-900/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-200/20 dark:bg-orange-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-primary-100 dark:from-orange-900/30 dark:to-primary-900/30 rounded-full mb-6 border border-orange-200 dark:border-orange-800">
            <FireIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-semibold text-orange-900 dark:text-orange-300">
              {t("featuredUmkm.badge") || "Pilihan Terbaik"}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-gray-900 dark:text-white">{t("featuredUmkm.title.prefix") || "UMKM"} </span>
            <span className="bg-gradient-to-r from-primary-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              {t("featuredUmkm.title.highlight") || "Unggulan"}
            </span>
          </h2>
          
          {/* Javanese Script */}
          <div className="mb-4">
            <p className="text-xl md:text-2xl font-medium text-orange-600 dark:text-orange-400" style={{ fontFamily: 'NotoJavaneseRegular, serif' }}>
              {t("featuredUmkm.javaneseScript") || "ꦈꦩ꧀ꦏꦺꦩ꧀ ꦈꦁꦒꦸꦭꦤ꧀"}
            </p>
          </div>
          
          {/* Description */}
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("featuredUmkm.description") || "Temukan UMKM pilihan terbaik dengan rating tertinggi dan ulasan positif dari pelanggan"}
          </p>
        </div>

        {/* Masonry Gallery */}
        <div className="mb-12">
          <Masonry
            items={umkmItems}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.98}
            blurToFocus={true}
            colorShiftOnHover={false}
          />
        </div>

        {/* View All Button - Improved Mobile Responsiveness */}
        <div className="text-center mb-16">
          <Button
            size="lg"
            as={Link}
            to="/direktori"
            className="bg-gradient-to-r from-primary-600 via-orange-500 to-orange-600 text-white font-semibold shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 transition-all px-6 sm:px-8 text-sm sm:text-base group w-auto"
            endContent={
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            }
          >
            <span className="whitespace-nowrap">
              {t("featuredUmkm.viewAll") || "Lihat Semua UMKM"}
            </span>
          </Button>
        </div>

        
      </div>
    </LazySection>
  );
}