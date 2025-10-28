import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft,
  Share,
  Heart,
  Star,
  MapPin,
  Phone,
  Clock,
  Wifi,
  CreditCard,
  Car,
  Building,
  Globe,
  MessageCircle,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  X,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import DefaultLayout from "@/layouts/default";

// Mock data - replace with API call
const mockUMKMData = {
  id: "12345",
  slug: "warung-mbok-darmi",
  name: "Warung Mbok Darmi",
  category: "Kuliner",
  status: "open", // open, closed, unknown
  nextStatusChange: "22:00",
  rating: 4.8,
  reviewCount: 124,
  distance: "0.8 km",
  address: "Jl. Sudirman No. 123, Purwokerto Selatan",
  coordinates: { lat: -7.4219, lng: 109.2344 },
  phone: "+62812345678",
  whatsapp: "+62812345678",
  instagram: "@warungmbok.darmi",
  website: "https://warungmbok.darmi.com",
  description: "Warung tradisional yang menyajikan masakan Jawa autentik dengan cita rasa turun temurun. Spesialis gudeg, soto, dan berbagai lauk pauk tradisional yang menggugah selera. Sudah berdiri sejak 1985 dan menjadi favorit warga Purwokerto.",
  images: [
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1610003524635-5fe4c7e11b32?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=600&fit=crop"
  ],
  hours: {
    monday: "06:00-22:00",
    tuesday: "06:00-22:00", 
    wednesday: "06:00-22:00",
    thursday: "06:00-22:00",
    friday: "06:00-22:00",
    saturday: "06:00-23:00",
    sunday: "07:00-21:00"
  },
  facilities: ["WiFi", "Parkir", "AC", "Toilet", "Mushola"],
  payments: ["Cash", "QRIS", "GoPay", "OVO", "DANA"],
  priceRange: "Rp 15.000 - Rp 45.000",
  products: [
    {
      id: 1,
      name: "Gudeg Jogja",
      price: "Rp 25.000",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop",
      description: "Gudeg khas Jogja dengan kuah santan yang gurih"
    },
    {
      id: 2,
      name: "Soto Ayam",
      price: "Rp 20.000", 
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
      description: "Soto ayam dengan kuah bening yang segar"
    }
  ],
  reviews: [
    {
      id: 1,
      name: "Budi Santoso",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      date: "2 hari lalu",
      text: "Gudegnya enak banget! Rasanya autentik dan harganya terjangkau. Pelayanannya juga ramah.",
      photos: []
    }
  ]
};

export default function DetailPage() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const navigate = useNavigate();
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeTab, setActiveTab] = useState("semua");
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Parse slug to get ID and name
  const parseSlug = (slug: string) => {
    if (!slug) return { id: null, name: null };
    
    const parts = slug.split('-');
    const id = parts[parts.length - 1];
    const name = parts.slice(0, -1).join('-');
    return { id, name };
  };

  const { id } = parseSlug(slug || '');
  
  // Use the mock data directly since we only have one UMKM
  const umkm = mockUMKMData;

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  const getStatusBadge = () => {
    const { status, nextStatusChange } = mockUMKMData;
    
    if (status === "open") {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Buka • Tutup {nextStatusChange}
        </div>
      );
    } else if (status === "closed") {
      return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          Tutup • Buka besok {nextStatusChange}
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm font-medium">
        <div className="w-2 h-2 bg-gray-400 rounded-full" />
        Status tidak diketahui
      </div>
    );
  };

  const renderStarRating = (rating: number, size: "sm" | "md" = "sm") => {
    const stars = [];
    const sizeClass = size === "sm" ? "w-4 h-4" : "w-5 h-5";
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`${sizeClass} ${i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
        />
      );
    }
    return stars;
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 sm:pt-24">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-[70px] z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left: Back button + Breadcrumb */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                
                {/* Breadcrumb - Desktop only */}
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">
                    Beranda
                  </Link>
                  <ChevronRight className="w-4 h-4" />
                  <Link to="/direktori" className="hover:text-primary-600 dark:hover:text-primary-400">
                    Direktori
                  </Link>
                  <ChevronRight className="w-4 h-4" />
                  <span className="capitalize">{category}</span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-[200px]">
                    {mockUMKMData.name}
                  </span>
                </div>
              </div>

              {/* Right: Share & Favorite */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Share className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <motion.button
                  onClick={handleFavoriteToggle}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  whileTap={{ scale: 0.9 }}
                  animate={isFavorite ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-600 dark:text-gray-400"}`} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Gallery */}
        <div className="bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            {/* Desktop Gallery */}
            <div className="hidden md:block p-6">
              <div className="grid grid-cols-12 gap-4 h-[500px]">
                {/* Main Image */}
                <div className="col-span-7">
                  <button
                    onClick={() => openLightbox(0)}
                    className="relative w-full h-full rounded-xl overflow-hidden group"
                  >
                    <img
                      src={mockUMKMData.images[0]}
                      alt={mockUMKMData.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                      <Eye className="w-4 h-4 inline mr-1" />
                      Lihat Semua ({mockUMKMData.images.length})
                    </div>
                  </button>
                </div>

                {/* Thumbnail Grid */}
                <div className="col-span-5 grid grid-cols-2 gap-4">
                  {mockUMKMData.images.slice(1, 5).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => openLightbox(index + 1)}
                      className="relative w-full h-full rounded-xl overflow-hidden group"
                    >
                      <img
                        src={image}
                        alt={`${mockUMKMData.name} ${index + 2}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      {index === 3 && mockUMKMData.images.length > 5 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">
                            +{mockUMKMData.images.length - 5}
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Gallery */}
            <div className="md:hidden">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ 
                  type: 'fraction',
                  formatFractionCurrent: (number) => number,
                  formatFractionTotal: (number) => number
                }}
                className="h-[300px]"
              >
                {mockUMKMData.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <button
                      onClick={() => openLightbox(index)}
                      className="w-full h-full"
                    >
                      <img
                        src={image}
                        alt={`${mockUMKMData.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Info */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="space-y-4">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    {getStatusBadge()}
                    <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {mockUMKMData.category}
                    </span>
                  </div>

                  {/* Name & Rating */}
                  <div>
                    <h1 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {mockUMKMData.name}
                    </h1>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        {renderStarRating(mockUMKMData.rating, "md")}
                        <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                          {mockUMKMData.rating}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          ({mockUMKMData.reviewCount} ulasan)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {mockUMKMData.address}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {mockUMKMData.distance} dari lokasi Anda
                        </span>
                        <button className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                          Lihat di Maps
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Quick Contact Pills */}
                  <div className="flex flex-wrap gap-2">
                    {mockUMKMData.phone && (
                      <a
                        href={`tel:${mockUMKMData.phone}`}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Telepon
                      </a>
                    )}
                    {mockUMKMData.whatsapp && (
                      <a
                        href={`https://wa.me/${mockUMKMData.whatsapp.replace('+', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </a>
                    )}
                    {mockUMKMData.instagram && (
                      <a
                        href={`https://instagram.com/${mockUMKMData.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full text-sm font-medium hover:bg-pink-100 dark:hover:bg-pink-900/50 transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        Instagram
                      </a>
                    )}
                    {mockUMKMData.website && (
                      <a
                        href={mockUMKMData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        Website
                      </a>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {showFullDescription || mockUMKMData.description.length <= 200
                        ? mockUMKMData.description
                        : `${mockUMKMData.description.substring(0, 200)}...`}
                    </p>
                    {mockUMKMData.description.length > 200 && (
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="text-primary-600 dark:text-primary-400 hover:underline text-sm mt-2"
                      >
                        {showFullDescription ? "Tampilkan lebih sedikit" : "Selengkapnya"}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="font-playfair text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Informasi Bisnis
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Operating Hours */}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      Jam Operasional
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(mockUMKMData.hours).map(([day, hours]) => {
                        const dayNames = {
                          monday: "Senin",
                          tuesday: "Selasa", 
                          wednesday: "Rabu",
                          thursday: "Kamis",
                          friday: "Jumat",
                          saturday: "Sabtu",
                          sunday: "Minggu"
                        };
                        const isToday = new Date().getDay() === Object.keys(dayNames).indexOf(day) + 1;
                        
                        return (
                          <div key={day} className={`flex justify-between text-sm ${
                            isToday ? "font-semibold text-primary-600 dark:text-primary-400" : "text-gray-600 dark:text-gray-400"
                          }`}>
                            <span>{dayNames[day as keyof typeof dayNames]}</span>
                            <span>{hours}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Phone className="w-5 h-5 text-gray-400" />
                      Kontak
                    </h3>
                    <div className="space-y-2 text-sm">
                      {mockUMKMData.phone && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Telepon</span>
                          <a href={`tel:${mockUMKMData.phone}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                            {mockUMKMData.phone}
                          </a>
                        </div>
                      )}
                      {mockUMKMData.whatsapp && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">WhatsApp</span>
                          <a href={`https://wa.me/${mockUMKMData.whatsapp.replace('+', '')}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                            {mockUMKMData.whatsapp}
                          </a>
                        </div>
                      )}
                      {mockUMKMData.instagram && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Instagram</span>
                          <a href={`https://instagram.com/${mockUMKMData.instagram.replace('@', '')}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                            {mockUMKMData.instagram}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Facilities */}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Building className="w-5 h-5 text-gray-400" />
                      Fasilitas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {mockUMKMData.facilities.map((facility) => (
                        <span
                          key={facility}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                      Metode Pembayaran
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {mockUMKMData.payments.map((payment) => (
                        <span
                          key={payment}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm"
                        >
                          {payment}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Kisaran harga: {mockUMKMData.priceRange}
                    </p>
                  </div>
                </div>
              </div>

              {/* Products/Services Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-playfair text-xl font-semibold text-gray-900 dark:text-white">
                    Produk & Layanan
                  </h2>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-1 mb-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                  {["semua", "produk", "layanan", "menu"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                        activeTab === tab
                          ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mockUMKMData.products.map((product) => (
                    <div
                      key={product.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary-600 dark:text-primary-400">
                          {product.price}
                        </span>
                        <button className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors">
                          Hubungi
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {mockUMKMData.products.length === 0 && (
                  <div className="text-center py-12">
                    <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Belum ada produk yang ditampilkan
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Sticky Actions */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-4">
                {/* Action Buttons */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="space-y-3">
                    <a
                      href={`tel:${mockUMKMData.phone}`}
                      className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      Telepon Sekarang
                    </a>
                    
                    <a
                      href={`https://wa.me/${mockUMKMData.whatsapp?.replace('+', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </a>
                    
                    <button className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors">
                      <MapPin className="w-5 h-5" />
                      Petunjuk Arah
                    </button>
                    
                    <button
                      onClick={handleShare}
                      className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      <Share className="w-5 h-5" />
                      Bagikan
                    </button>
                    
                    <button className="w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 py-2 transition-colors">
                      Laporkan / Klaim Bisnis
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Bottom Bar */}
        <AnimatePresence>
          {showStickyBar && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex gap-2">
                <a
                  href={`tel:${mockUMKMData.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white font-semibold py-3 rounded-lg"
                >
                  <Phone className="w-5 h-5" />
                  Telepon
                </a>
                <a
                  href={`https://wa.me/${mockUMKMData.whatsapp?.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <motion.button
                  onClick={handleFavoriteToggle}
                  className="flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg"
                  whileTap={{ scale: 0.9 }}
                  animate={isFavorite ? { scale: [1, 1.2, 1] } : {}}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-red-500" : ""}`} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {showLightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
              onClick={() => setShowLightbox(false)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowLightbox(false)}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <img
                  src={mockUMKMData.images[lightboxIndex]}
                  alt={`${mockUMKMData.name} ${lightboxIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
                
                {/* Navigation */}
                {mockUMKMData.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : mockUMKMData.images.length - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setLightboxIndex(lightboxIndex < mockUMKMData.images.length - 1 ? lightboxIndex + 1 : 0)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
                
                {/* Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {lightboxIndex + 1} / {mockUMKMData.images.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Share Modal */}
        <AnimatePresence>
          {showShareModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
              onClick={() => setShowShareModal(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-playfair text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Bagikan UMKM
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">f</span>
                    </div>
                    <span className="text-sm font-medium">Facebook</span>
                  </button>
                  
                  <button className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">WhatsApp</span>
                  </button>
                  
                  <button className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">T</span>
                    </div>
                    <span className="text-sm font-medium">Twitter</span>
                  </button>
                  
                  <button className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">📋</span>
                    </div>
                    <span className="text-sm font-medium">Copy Link</span>
                  </button>
                </div>
                
                <button
                  onClick={() => setShowShareModal(false)}
                  className="w-full mt-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  Tutup
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DefaultLayout>
  );
}