import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
} from "@heroui/react";
import {
  Heart,
  ChevronRight,
  ChevronDown,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Eye,
  X,
  Trash2,
  Share2,
  CheckSquare,
  Square,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DefaultLayout from "@/layouts/default";
import { useLanguage } from "@/contexts/LanguageContext";

// UMKM Interface (matching directory.tsx)
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
  dateSaved?: string;
}

// Mock UMKM data (same as directory.tsx)
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
    isFavorite: true,
    dateSaved: "2024-01-15T10:30:00Z"
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
    isFavorite: true,
    dateSaved: "2024-01-14T15:45:00Z"
  },
  {
    id: "4",
    name: "Kopi Gunung Slamet",
    category: "Kafe & Resto",
    location: "Purwokerto Barat",
    distance: "4.1 km",
    rating: 4.6,
    reviewCount: 203,
    description: "Kopi premium dari lereng Gunung Slamet dengan cita rasa yang khas dan autentik",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$$",
    isFavorite: true,
    dateSaved: "2024-01-13T09:20:00Z"
  }
];

// Favorites Card Component
interface FavoritesCardProps {
  umkm: UMKM;
  onRemove: (id: string) => void;
  onClick: () => void;
  isSelected?: boolean;
  onSelect?: (id: string, selected: boolean) => void;
  selectionMode?: boolean;
}

function FavoritesCard({ umkm, onRemove, onClick, isSelected, onSelect, selectionMode }: FavoritesCardProps) {
  const navigate = useNavigate();

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

  const formatDateSaved = (dateString?: string) => {
    if (!dateString) return "Baru saja";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Disimpan kemarin";
    if (diffDays < 7) return `Disimpan ${diffDays} hari lalu`;
    if (diffDays < 30) return `Disimpan ${Math.ceil(diffDays / 7)} minggu lalu`;
    return `Disimpan ${Math.ceil(diffDays / 30)} bulan lalu`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        isPressable={!selectionMode}
        className="group hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
        onPress={selectionMode ? undefined : onClick}
      >
        <CardBody className="p-0">
          {/* Image Container */}
          <div className="relative">
            <img
              src={umkm.image}
              alt={umkm.name}
              className="w-full h-48 object-cover"
            />
            
            {/* Status Badge */}
            <div className="absolute top-3 left-3">
              <Chip
                size="sm"
                variant="flat"
                color={umkm.status === "open" ? "success" : "danger"}
                className="text-xs font-medium"
              >
                {umkm.status === "open" ? "Buka" : "Tutup"}
              </Chip>
            </div>

            {/* Selection Checkbox */}
            {selectionMode && (
              <div className="absolute top-3 right-3">
                <Checkbox
                  isSelected={isSelected}
                  onValueChange={(selected) => onSelect?.(umkm.id, selected)}
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-1"
                />
              </div>
            )}

            {/* Remove Button */}
            {!selectionMode && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(umkm.id);
                }}
                className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <X size={16} className="text-gray-600" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
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

            {/* Date Saved */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              {formatDateSaved(umkm.dateSaved)}
            </p>

            {/* Price Range & Actions */}
            <div className="flex items-center justify-between">
              <Chip size="sm" variant="flat" color="secondary">
                {formatPriceRange(umkm.priceRange)}
              </Chip>
              
              {!selectionMode && (
                <div className="flex items-center gap-2">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    color="success"
                    onPress={() => {
                      // Handle call action
                    }}
                  >
                    <Phone size={14} />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    color="primary"
                    onPress={() => {
                      // Handle chat action
                    }}
                  >
                    <MessageCircle size={14} />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    onPress={() => {
                      onClick();
                    }}
                  >
                    <Eye size={14} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}

// Empty State Component
function EmptyState() {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="mb-6">
        <Heart size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="font-playfair text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Belum Ada Favorit
        </h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-6">
          Mulai tambahkan UMKM favorit Anda untuk akses cepat dan mudah
        </p>
        <Button
          color="primary"
          size="lg"
          onPress={() => navigate("/direktori")}
          startContent={<Heart size={20} />}
        >
          Jelajahi UMKM
        </Button>
      </div>
    </motion.div>
  );
}

// Main Favorites Page Component
export default function FavoritesPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // State Management
  const [favorites, setFavorites] = useState<UMKM[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [undoAction, setUndoAction] = useState<(() => void) | null>(null);
  
  // Modal Controls
  const { isOpen: isRemoveModalOpen, onOpen: onRemoveModalOpen, onClose: onRemoveModalClose } = useDisclosure();

  // Notification timeout
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
        setUndoAction(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("lokaku_favorites");
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites);
      const favoriteUMKMs = mockUMKMData.filter(umkm => favoriteIds.includes(umkm.id));
      setFavorites(favoriteUMKMs);
    }
  }, []);

  // Sort favorites
  const sortedFavorites = useMemo(() => {
    let sorted = [...favorites];
    
    switch (sortBy) {
      case "newest":
        sorted.sort((a, b) => new Date(b.dateSaved || 0).getTime() - new Date(a.dateSaved || 0).getTime());
        break;
      case "alphabetical":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    return sorted;
  }, [favorites, sortBy]);

  // Handle remove favorite
  const handleRemoveFavorite = (id: string) => {
    setRemoveId(id);
    onRemoveModalOpen();
  };

  const confirmRemoveFavorite = () => {
    if (removeId) {
      const removedUMKM = favorites.find(fav => fav.id === removeId);
      const updatedFavorites = favorites.filter(fav => fav.id !== removeId);
      setFavorites(updatedFavorites);
      
      // Update localStorage
      const favoriteIds = updatedFavorites.map(fav => fav.id);
      localStorage.setItem("lokaku_favorites", JSON.stringify(favoriteIds));
      
      // Show notification with undo
      setNotification("UMKM dihapus dari favorit");
      setUndoAction(() => () => {
        if (removedUMKM) {
          const restoredFavorites = [...updatedFavorites, removedUMKM];
          setFavorites(restoredFavorites);
          const restoredIds = restoredFavorites.map(fav => fav.id);
          localStorage.setItem("lokaku_favorites", JSON.stringify(restoredIds));
          setNotification(null);
          setUndoAction(null);
        }
      });
      
      setRemoveId(null);
    }
    onRemoveModalClose();
  };

  // Handle bulk actions
  const handleSelectAll = () => {
    if (selectedItems.size === favorites.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(favorites.map(fav => fav.id)));
    }
  };

  const handleRemoveSelected = () => {
    const updatedFavorites = favorites.filter(fav => !selectedItems.has(fav.id));
    setFavorites(updatedFavorites);
    
    const favoriteIds = updatedFavorites.map(fav => fav.id);
    localStorage.setItem("lokaku_favorites", JSON.stringify(favoriteIds));
    
    setSelectedItems(new Set());
    setSelectionMode(false);
    
    setNotification(`${selectedItems.size} UMKM dihapus dari favorit`);
  };

  const handleCardClick = (umkm: UMKM) => {
    const categorySlug = umkm.category.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const nameSlug = umkm.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const slug = `${categorySlug}/${nameSlug}-${umkm.id}`;
    navigate(`/detail/${slug}`);
  };

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
              <span className="text-gray-900 dark:text-white">Favorit</span>
            </nav>

            {/* Page Title */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-playfair text-4xl font-bold text-gray-900 dark:text-white">
                  UMKM Favorit Saya
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {favorites.length} UMKM tersimpan
                </p>
              </div>
              
              {favorites.length > 0 && (
                <div className="flex items-center gap-3">
                  {/* Sort Dropdown */}
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="flat" endContent={<ChevronDown size={16} />}>
                        {sortBy === "newest" && "Terbaru Disimpan"}
                        {sortBy === "alphabetical" && "A-Z"}
                        {sortBy === "rating" && "Rating Tertinggi"}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      selectedKeys={[sortBy]}
                      onSelectionChange={(keys) => setSortBy(Array.from(keys)[0] as string)}
                    >
                      <DropdownItem key="newest">Terbaru Disimpan</DropdownItem>
                      <DropdownItem key="alphabetical">A-Z</DropdownItem>
                      <DropdownItem key="rating">Rating Tertinggi</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  {/* Selection Mode Toggle */}
                  <Button
                    variant={selectionMode ? "solid" : "flat"}
                    color={selectionMode ? "primary" : "default"}
                    onPress={() => {
                      setSelectionMode(!selectionMode);
                      setSelectedItems(new Set());
                    }}
                    startContent={selectionMode ? <CheckSquare size={16} /> : <Square size={16} />}
                  >
                    {selectionMode ? "Batal" : "Pilih"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selection Actions Bar */}
        <AnimatePresence>
          {selectionMode && selectedItems.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-primary-50 dark:bg-primary-900/20 border-b border-primary-200 dark:border-primary-800"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                    {selectedItems.size} item dipilih
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="flat"
                      onPress={handleSelectAll}
                    >
                      {selectedItems.size === favorites.length ? "Batal Pilih Semua" : "Pilih Semua"}
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      onPress={handleRemoveSelected}
                      startContent={<Trash2 size={14} />}
                    >
                      Hapus
                    </Button>
                    <Button
                      size="sm"
                      variant="flat"
                      startContent={<Share2 size={14} />}
                    >
                      Bagikan
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification Toast */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
                <span>{notification}</span>
                {undoAction && (
                  <Button
                    size="sm"
                    variant="flat"
                    className="text-white border-white hover:bg-white/20"
                    onPress={() => {
                      undoAction();
                    }}
                  >
                    Undo
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {sortedFavorites.map((umkm) => (
                  <FavoritesCard
                    key={umkm.id}
                    umkm={umkm}
                    onRemove={handleRemoveFavorite}
                    onClick={() => handleCardClick(umkm)}
                    selectionMode={selectionMode}
                    isSelected={selectedItems.has(umkm.id)}
                    onSelect={(id, selected) => {
                      const newSelected = new Set(selectedItems);
                      if (selected) {
                        newSelected.add(id);
                      } else {
                        newSelected.delete(id);
                      }
                      setSelectedItems(newSelected);
                    }}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <EmptyState />
          )}
        </div>

        {/* Remove Confirmation Modal */}
        <Modal isOpen={isRemoveModalOpen} onClose={onRemoveModalClose}>
          <ModalContent>
            <ModalHeader>Hapus dari Favorit</ModalHeader>
            <ModalBody>
              <p>Apakah Anda yakin ingin menghapus UMKM ini dari daftar favorit?</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onRemoveModalClose}>
                Batal
              </Button>
              <Button color="danger" onPress={confirmRemoveFavorite}>
                Hapus
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </DefaultLayout>
  );
}