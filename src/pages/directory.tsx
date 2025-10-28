import { useState, useEffect, useMemo } from "react";
import { Button, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Pagination } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  MapPin, 
  Star, 
  Heart, 
  X,
  Store,
  Coffee,
  ShoppingBag,
  Wrench,
  Sparkles,
  GraduationCap,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  SearchX
} from "lucide-react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import LazySection from "@/components/LazySection";
import LazyImage from "@/components/LazyImage";
import DefaultLayout from "@/layouts/default";
import { useLanguage } from "@/contexts/LanguageContext";

// UMKM Interface
interface UMKM {
  id: string;
  name: string;
  category: string;
  location: string;
  distance?: string;
  rating: number;
  reviewCount: number;
  description: string;
  image: string;
  status: "open" | "closed";
  priceRange?: "$" | "$$" | "$$$";
  isFavorite: boolean;
}

// Mock Data
const mockUMKMData: UMKM[] = [
  {
    id: "1",
    name: "Warung Sate Pak Kumis",
    category: "Makanan & Minuman",
    location: "Purwokerto Utara",
    distance: "2.5 km",
    rating: 4.8,
    reviewCount: 124,
    description: "Sate kambing dan ayam dengan bumbu kacang khas Banyumas yang gurih dan lezat",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$$",
    isFavorite: false
  },
  {
    id: "2",
    name: "Batik Gumelem Asli",
    category: "Fashion",
    location: "Purwokerto Selatan",
    distance: "1.8 km",
    rating: 4.9,
    reviewCount: 89,
    description: "Batik khas Banyumas dengan motif tradisional dan modern berkualitas tinggi",
    image: "https://images.unsplash.com/photo-1610003524635-5fe4c7e11b32?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$$$",
    isFavorite: true
  },
  {
    id: "3",
    name: "Getuk Goreng Bu Tini",
    category: "Makanan & Minuman",
    location: "Sokaraja",
    distance: "3.2 km",
    rating: 4.7,
    reviewCount: 156,
    description: "Getuk goreng tradisional dengan berbagai topping dan rasa yang menggugah selera",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop",
    status: "closed",
    priceRange: "$",
    isFavorite: false
  },
  {
    id: "4",
    name: "Kopi Gunung Slamet",
    category: "Kafe & Resto",
    location: "Purwokerto Barat",
    distance: "4.1 km",
    rating: 4.6,
    reviewCount: 203,
    description: "Kopi arabika premium dari lereng Gunung Slamet dengan cita rasa yang khas",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$$",
    isFavorite: true
  },
  {
    id: "5",
    name: "Salon Cantik Ayu",
    category: "Kecantikan",
    location: "Purwokerto Timur",
    distance: "2.9 km",
    rating: 4.5,
    reviewCount: 67,
    description: "Layanan perawatan kecantikan lengkap dengan teknisi berpengalaman",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$$",
    isFavorite: false
  },
  {
    id: "6",
    name: "Mendoan Cokro Kembang",
    category: "Makanan & Minuman",
    location: "Banyumas",
    distance: "5.3 km",
    rating: 4.9,
    reviewCount: 298,
    description: "Mendoan tempe khas Banyumas yang renyah dan gurih dengan sambal kacang",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$",
    isFavorite: true
  }
];

// Categories Data
const categories = [
  { id: "all", name: "Semua", count: 150, icon: Store },
  { id: "food", name: "Makanan & Minuman", count: 45, icon: Coffee },
  { id: "cafe", name: "Kafe & Resto", count: 28, icon: Coffee },
  { id: "fashion", name: "Fashion", count: 32, icon: ShoppingBag },
  { id: "services", name: "Jasa", count: 18, icon: Wrench },
  { id: "beauty", name: "Kecantikan", count: 15, icon: Sparkles },
  { id: "health", name: "Kesehatan", count: 12, icon: Heart },
  { id: "education", name: "Pendidikan", count: 8, icon: GraduationCap },
  { id: "others", name: "Lainnya", count: 22, icon: MoreHorizontal }
];

// Locations Data
const locations = [
  "Semua Banyumas",
  "Purwokerto Utara",
  "Purwokerto Selatan", 
  "Purwokerto Barat",
  "Purwokerto Timur",
  "Sokaraja",
  "Banyumas",
  "Lainnya"
];

// UMKM Card Component
interface UMKMCardProps {
  umkm: UMKM;
  viewMode: "grid" | "list";
  onToggleFavorite: (id: string) => void;
  onClick: () => void;
}

function UMKMCard({ umkm, viewMode, onToggleFavorite, onClick }: UMKMCardProps) {
  const navigate = useNavigate();
  
  // Format price range to Rupiah
  const formatPriceRange = (priceRange?: "$" | "$$" | "$$$") => {
    switch (priceRange) {
      case "$":
        return "Rp 10.000 - 25.000";
      case "$$":
        return "Rp 25.000 - 50.000";
      case "$$$":
        return "Rp 50.000 - 100.000";
      default:
        return "Harga bervariasi";
    }
  };

  const handleViewDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    const categorySlug = umkm.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
    const nameSlug = umkm.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/detail/${categorySlug}/${nameSlug}-${umkm.id}`);
  };

  return (
    <LazySection
      animationType="slideUp"
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 ${
        viewMode === "list" ? "overflow-hidden" : "overflow-hidden"
      }`}
    >
      <div
        className={`cursor-pointer group ${
          viewMode === "list" ? "flex gap-4 p-4" : ""
        }`}
        onClick={onClick}
      >
        {/* Image */}
        <div className={`relative ${
          viewMode === "list" ? "w-48 h-32 flex-shrink-0" : "aspect-video"
        }`}>
          <LazyImage
            src={umkm.image}
            alt={umkm.name}
            className="w-full h-full object-cover rounded-lg"
          />
          
          {/* Status Badge */}
          <div className="absolute top-2 right-2">
            <Chip
              size="sm"
              variant="solid"
              color={umkm.status === "open" ? "success" : "danger"}
              className="text-white"
            >
              {umkm.status === "open" ? "Buka" : "Tutup"}
            </Chip>
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(umkm.id);
            }}
            className="absolute top-2 left-2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <Heart
              size={16}
              className={`${
                umkm.isFavorite 
                  ? "fill-red-500 text-red-500" 
                  : "text-gray-600 dark:text-gray-400"
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className={`${viewMode === "list" ? "flex-1" : "p-4"}`}>
          {/* Category Chip */}
          <Chip size="sm" variant="flat" color="primary" className="mb-2">
            {umkm.category}
          </Chip>

          {/* Name */}
          <h3 className="font-playfair text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {umkm.name}
          </h3>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {umkm.rating}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({umkm.reviewCount} ulasan)
            </span>
          </div>

          {/* Location & Distance */}
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {umkm.location}
              </span>
            </div>
            {umkm.distance && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {umkm.distance}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
            {umkm.description}
          </p>

          {/* Price Range & View Detail Button */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Chip size="sm" variant="flat" color="secondary">
                {formatPriceRange(umkm.priceRange)}
              </Chip>
            </div>
            <Button
              size="sm"
              color="primary"
              variant="flat"
              onClick={handleViewDetail}
              endContent={<ChevronRight size={14} />}
            >
              Lihat Detail
            </Button>
          </div>
        </div>
      </div>
    </LazySection>
  );
}

// Main Directory Page Component
export default function DirectoryPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // State Management
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("Semua Banyumas");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState<"all" | "open" | "closed">("all");
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [umkmData, setUmkmData] = useState(mockUMKMData);
  
  // Modal Controls
  const { isOpen: isFilterOpen, onOpen: onFilterOpen, onClose: onFilterClose } = useDisclosure();

  // Search placeholders
  const placeholders = [
    "Cari warung makan terdekat...",
    "Temukan toko batik...",
    "Cari salon kecantikan...",
    "Warung kopi enak...",
    "Jasa service elektronik..."
  ];

  // Filter and Search Logic
  const filteredUMKM = useMemo(() => {
    let filtered = umkmData;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(umkm =>
        umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(umkm => {
        switch (selectedCategory) {
          case "food":
            return umkm.category === "Makanan & Minuman";
          case "cafe":
            return umkm.category === "Kafe & Resto";
          case "fashion":
            return umkm.category === "Fashion";
          case "services":
            return umkm.category === "Jasa";
          case "beauty":
            return umkm.category === "Kecantikan";
          case "health":
            return umkm.category === "Kesehatan";
          case "education":
            return umkm.category === "Pendidikan";
          default:
            return true;
        }
      });
    }

    // Location filter
    if (selectedLocation !== "Semua Banyumas") {
      filtered = filtered.filter(umkm => umkm.location === selectedLocation);
    }

    // Rating filter
    if (selectedRating > 0) {
      filtered = filtered.filter(umkm => umkm.rating >= selectedRating);
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter(umkm => umkm.status === selectedStatus);
    }

    // Price range filter
    if (priceRange.length > 0) {
      filtered = filtered.filter(umkm => 
        umkm.priceRange && priceRange.includes(umkm.priceRange)
      );
    }

    // Sorting
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "distance":
        filtered.sort((a, b) => {
          const aDistance = parseFloat(a.distance?.replace(" km", "") || "0");
          const bDistance = parseFloat(b.distance?.replace(" km", "") || "0");
          return aDistance - bDistance;
        });
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // relevance - keep original order
        break;
    }

    return filtered;
  }, [umkmData, searchQuery, selectedCategory, selectedLocation, selectedRating, selectedStatus, priceRange, sortBy]);

  // Pagination
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredUMKM.length / itemsPerPage);
  const paginatedUMKM = filteredUMKM.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Search is already handled by onChange, but we can add additional logic here if needed
  };

  const handleToggleFavorite = (id: string) => {
    setUmkmData(prev => 
      prev.map(umkm => 
        umkm.id === id ? { ...umkm, isFavorite: !umkm.isFavorite } : umkm
      )
    );
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedLocation("Semua Banyumas");
    setSelectedRating(0);
    setSelectedStatus("all");
    setPriceRange([]);
    setSortBy("relevance");
    setCurrentPage(1);
  };

  const quickFilters = [
    { label: "Semua", value: "all", active: selectedCategory === "all" },
    { label: "Buka Sekarang", value: "open", active: selectedStatus === "open" },
    { label: "Rating Tertinggi", value: "rating", active: sortBy === "rating" },
    { label: "Terdekat", value: "distance", active: sortBy === "distance" }
  ];

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 sm:pt-24">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">
                Beranda
              </Link>
              <ChevronRight size={16} />
              <span className="text-gray-900 dark:text-white">Direktori UMKM</span>
            </nav>

            {/* Page Title */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-playfair text-3xl font-bold text-gray-900 dark:text-white">
                  Direktori UMKM
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Temukan {filteredUMKM.length} UMKM terbaik di Banyumas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <PlaceholdersAndVanishInput
                  placeholders={placeholders}
                  onChange={handleSearchChange}
                  onSubmit={handleSearchSubmit}
                />
              </div>

              {/* Filter and Sort Controls */}
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <Button
                  variant="bordered"
                  startContent={<Filter size={18} />}
                  onPress={onFilterOpen}
                  className="lg:hidden"
                >
                  Filter
                </Button>

                {/* Sort Dropdown */}
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="bordered"
                      endContent={<ChevronDown size={16} />}
                      startContent={<ArrowUpDown size={16} />}
                    >
                      Urutkan
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    selectedKeys={[sortBy]}
                    onSelectionChange={(keys) => setSortBy(Array.from(keys)[0] as string)}
                  >
                    <DropdownItem key="relevance">Relevansi</DropdownItem>
                    <DropdownItem key="rating">Rating Tertinggi</DropdownItem>
                    <DropdownItem key="distance">Terdekat</DropdownItem>
                    <DropdownItem key="name">Nama A-Z</DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex border border-gray-200 dark:border-gray-700 rounded-lg p-1">
                  <Button
                    size="sm"
                    variant={viewMode === "grid" ? "solid" : "light"}
                    onPress={() => setViewMode("grid")}
                    className="min-w-0 px-3"
                  >
                    Grid
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "list" ? "solid" : "light"}
                    onPress={() => setViewMode("list")}
                    className="min-w-0 px-3"
                  >
                    List
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Filter Chips */}
            <div className="flex flex-wrap gap-2 mt-4">
              {quickFilters.map((filter) => (
                <button
                  key={filter.value}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter.active 
                      ? "bg-primary-600 text-white shadow-md shadow-primary-500/30 dark:bg-primary-500 dark:text-white" 
                      : "bg-white text-gray-700 border-2 border-gray-300 hover:border-primary-500 hover:text-primary-600 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:border-primary-400 dark:hover:text-primary-400"
                  }`}
                  onClick={() => {
                    if (filter.value === "all") {
                      setSelectedCategory("all");
                      setSelectedStatus("all");
                      setSortBy("relevance");
                    } else if (filter.value === "open") {
                      setSelectedStatus("open");
                    } else if (filter.value === "rating") {
                      setSortBy("rating");
                    } else if (filter.value === "distance") {
                      setSortBy("distance");
                    }
                    setCurrentPage(1);
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-playfair text-lg font-semibold text-gray-900 dark:text-white">
                    Filter
                  </h3>
                  <Button
                    size="sm"
                    variant="light"
                    onPress={resetFilters}
                  >
                    Reset
                  </Button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Kategori</h4>
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <button
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setCurrentPage(1);
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                            selectedCategory === category.id
                              ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                              : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent size={18} />
                            <span className="text-sm">{category.name}</span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {category.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Location */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Lokasi</h4>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        className="w-full justify-between"
                        endContent={<ChevronDown size={16} />}
                      >
                        {selectedLocation}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      selectedKeys={[selectedLocation]}
                      onSelectionChange={(keys) => {
                        setSelectedLocation(Array.from(keys)[0] as string);
                        setCurrentPage(1);
                      }}
                    >
                      {locations.map((location) => (
                        <DropdownItem key={location}>{location}</DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Rating Minimum</h4>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => {
                          setSelectedRating(rating);
                          setCurrentPage(1);
                        }}
                        className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-colors ${
                          selectedRating === rating
                            ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{rating}+</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Status</h4>
                  <div className="space-y-2">
                    {[
                      { value: "all", label: "Semua" },
                      { value: "open", label: "Buka" },
                      { value: "closed", label: "Tutup" }
                    ].map((status) => (
                      <button
                        key={status.value}
                        onClick={() => {
                          setSelectedStatus(status.value as "all" | "open" | "closed");
                          setCurrentPage(1);
                        }}
                        className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-colors ${
                          selectedStatus === status.value
                            ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <span className="text-sm">{status.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600 dark:text-gray-300">
                  Menampilkan {paginatedUMKM.length} dari {filteredUMKM.length} hasil
                </p>
              </div>

              {/* Results Grid/List */}
              {paginatedUMKM.length > 0 ? (
                <div className={`${
                  viewMode === "grid" 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                    : "space-y-4"
                }`}>
                  {paginatedUMKM.map((umkm) => (
                    <UMKMCard
                      key={umkm.id}
                      umkm={umkm}
                      viewMode={viewMode}
                      onToggleFavorite={handleToggleFavorite}
                      onClick={() => {
                        // Create slug format: /detail/{category}-{name}-{id}
                        const categorySlug = umkm.category.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
                        const nameSlug = umkm.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
                        const slug = `${categorySlug}/${nameSlug}-${umkm.id}`;
                        navigate(`/detail/${slug}`);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <SearchX size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
                  <h3 className="font-playfair text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Tidak ada hasil ditemukan
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Coba ubah kata kunci pencarian atau filter yang dipilih
                  </p>
                  <Button
                    color="primary"
                    onPress={resetFilters}
                  >
                    Reset Filter
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <Pagination
                    total={totalPages}
                    page={currentPage}
                    onChange={setCurrentPage}
                    showControls
                    showShadow
                    color="primary"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Modal */}
        <Modal
          isOpen={isFilterOpen}
          onClose={onFilterClose}
          size="full"
          scrollBehavior="inside"
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="font-playfair text-xl font-semibold">Filter UMKM</h3>
            </ModalHeader>
            <ModalBody>
              {/* Same filter content as desktop sidebar */}
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Kategori</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <button
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setCurrentPage(1);
                          }}
                          className={`flex items-center gap-2 p-3 rounded-lg text-left transition-colors ${
                            selectedCategory === category.id
                              ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                              : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                          }`}
                        >
                          <IconComponent size={16} />
                          <span className="text-sm">{category.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Lokasi</h4>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        variant="bordered"
                        className="w-full justify-between"
                        endContent={<ChevronDown size={16} />}
                      >
                        {selectedLocation}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      selectedKeys={[selectedLocation]}
                      onSelectionChange={(keys) => {
                        setSelectedLocation(Array.from(keys)[0] as string);
                        setCurrentPage(1);
                      }}
                    >
                      {locations.map((location) => (
                        <DropdownItem key={location}>{location}</DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Rating Minimum</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => {
                          setSelectedRating(rating);
                          setCurrentPage(1);
                        }}
                        className={`flex items-center gap-2 p-3 rounded-lg text-left transition-colors ${
                          selectedRating === rating
                            ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{rating}+</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Status</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "all", label: "Semua" },
                      { value: "open", label: "Buka" },
                      { value: "closed", label: "Tutup" }
                    ].map((status) => (
                      <button
                        key={status.value}
                        onClick={() => {
                          setSelectedStatus(status.value as "all" | "open" | "closed");
                          setCurrentPage(1);
                        }}
                        className={`p-3 rounded-lg text-left transition-colors ${
                          selectedStatus === status.value
                            ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                            : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        <span className="text-sm">{status.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                onPress={resetFilters}
              >
                Reset
              </Button>
              <Button
                color="primary"
                onPress={onFilterClose}
              >
                Terapkan Filter
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </DefaultLayout>
  );
}