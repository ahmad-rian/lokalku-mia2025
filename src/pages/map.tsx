import { useState, useEffect, useRef, useCallback } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {
  Button,
  Input,
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
  Spinner
} from "@heroui/react";
import {
  Navigation,
  Phone,
  Star,
  MapPin,
  Search,
  Filter,
  X,
  Eye,
  Locate,
  List,
  Clock,
  Layers,
  Mountain,
  Satellite,
  Map as MapIcon,
  ChevronDown
} from "lucide-react";
import Navbar from "@/components/navbar";

// UMKM Interface (matching existing structure)
interface UMKM {
  id: string;
  name: string;
  category: string;
  location: string;
  coordinates: [number, number]; // [longitude, latitude]
  distance?: string;
  rating: number;
  reviewCount: number;
  description: string;
  image: string;
  status: "open" | "closed";
  priceRange?: "$" | "$$" | "$$$";
  isFavorite: boolean;
  phone?: string;
  address: string;
}

// Banyumas/Purwokerto UMKM Mock Data with real coordinates
const banyumasUMKMData: UMKM[] = [
  {
    id: "1",
    name: "Warung Sate Pak Kumis",
    category: "Makanan & Minuman",
    location: "Purwokerto Utara",
    coordinates: [109.2349, -7.4186],
    distance: "2.5 km",
    rating: 4.8,
    reviewCount: 124,
    description: "Sate kambing dan ayam dengan bumbu kacang khas Banyumas yang gurih dan lezat",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$$",
    isFavorite: false,
    phone: "+62812-3456-7890",
    address: "Jl. Prof. Dr. Suharso No. 45, Purwokerto Utara"
  },
  {
    id: "2",
    name: "Batik Gumelem Asli",
    category: "Fashion",
    location: "Purwokerto Selatan",
    coordinates: [109.2401, -7.4298],
    distance: "1.8 km",
    rating: 4.9,
    reviewCount: 89,
    description: "Batik khas Banyumas dengan motif tradisional dan modern berkualitas tinggi",
    image: "https://images.unsplash.com/photo-1610003524635-5fe4c7e11b32?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$$$",
    isFavorite: true,
    phone: "+62813-2345-6789",
    address: "Jl. Jenderal Sudirman No. 123, Purwokerto Selatan"
  },
  {
    id: "3",
    name: "Getuk Goreng Bu Tini",
    category: "Makanan & Minuman",
    location: "Sokaraja",
    coordinates: [109.2876, -7.4567],
    distance: "3.2 km",
    rating: 4.7,
    reviewCount: 156,
    description: "Getuk goreng tradisional dengan berbagai topping dan rasa yang menggugah selera",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop",
    status: "closed",
    priceRange: "$",
    isFavorite: false,
    phone: "+62814-3456-7890",
    address: "Jl. Raya Sokaraja No. 67, Sokaraja"
  },
  {
    id: "4",
    name: "Kopi Gunung Slamet",
    category: "Kafe & Resto",
    location: "Purwokerto Barat",
    coordinates: [109.2187, -7.4234],
    distance: "4.1 km",
    rating: 4.6,
    reviewCount: 203,
    description: "Kopi premium dari lereng Gunung Slamet dengan cita rasa yang khas dan autentik",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$$",
    isFavorite: false,
    phone: "+62815-4567-8901",
    address: "Jl. Overste Isdiman No. 89, Purwokerto Barat"
  },
  {
    id: "5",
    name: "Salon Cantik Ayu",
    category: "Kecantikan",
    location: "Purwokerto Timur",
    coordinates: [109.2567, -7.4123],
    distance: "2.8 km",
    rating: 4.5,
    reviewCount: 78,
    description: "Salon kecantikan dengan layanan lengkap dan perawatan modern",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$$",
    isFavorite: false,
    phone: "+62816-5678-9012",
    address: "Jl. Ahmad Yani No. 234, Purwokerto Timur"
  },
  {
    id: "6",
    name: "Mendoan Cokro Kembang",
    category: "Makanan & Minuman",
    location: "Banyumas",
    coordinates: [109.2934, -7.5234],
    distance: "5.5 km",
    rating: 4.8,
    reviewCount: 167,
    description: "Mendoan khas Banyumas dengan tempe segar dan bumbu rahasia turun temurun",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$",
    isFavorite: true,
    phone: "+62817-6789-0123",
    address: "Jl. Raya Banyumas No. 45, Banyumas"
  },
  {
    id: "7",
    name: "Bengkel Motor Jaya Abadi",
    category: "Otomotif & Jasa",
    location: "Purwokerto Selatan",
    coordinates: [109.2445, -7.4356],
    distance: "3.7 km",
    rating: 4.4,
    reviewCount: 92,
    description: "Bengkel motor terpercaya dengan teknisi berpengalaman dan spare part original",
    image: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$$",
    isFavorite: false,
    phone: "+62818-7890-1234",
    address: "Jl. Gatot Subroto No. 156, Purwokerto Selatan"
  },
  {
    id: "8",
    name: "Lanting Bu Narti",
    category: "Makanan & Minuman",
    location: "Cilongok",
    coordinates: [109.1876, -7.4567],
    distance: "6.2 km",
    rating: 4.7,
    reviewCount: 134,
    description: "Lanting khas Banyumas dengan rasa gurih dan tekstur yang renyah",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=800&h=600&fit=crop",
    status: "open",
    priceRange: "$",
    isFavorite: false,
    phone: "+62819-8901-2345",
    address: "Jl. Raya Cilongok No. 78, Cilongok"
  }
];

// Filter categories
const categories = [
  "Semua",
  "Makanan & Minuman",
  "Fashion",
  "Kafe & Resto",
  "Kecantikan",
  "Otomotif & Jasa"
];

// Simple map component using OpenStreetMap
// Google Maps API Key & Map ID
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "your_google_maps_api_key_here";
const GOOGLE_MAPS_MAP_ID = "7ae59d30616b9f915b176e75"; // LokalKu 3D Map with dark mode support

// Purwokerto city center coordinates
// Latitude: 7°25'17" S = -7.421389°
// Longitude: 109°14'3.98" E = 109.234439°
const PURWOKERTO_CENTER = { 
  lat: -7.421389,  // Purwokerto city center
  lng: 109.234439
};

// Banyumas region coordinates based on astronomical data
// Longitude: 108°39'17'' - 109°27'15'' BT
// Latitude: 7°15'05'' - 7°37'10'' LS
const BANYUMAS_CENTER = { 
  lat: -7.4354,  // Center of latitude range: (7°15'05'' + 7°37'10'') / 2 = 7°26'07.5'' LS
  lng: 109.0545  // Center of longitude range: (108°39'17'' + 109°27'15'') / 2 = 109°03'16'' BT
};
const BANYUMAS_BOUNDS = {
  north: -7.2514,  // 7°15'05'' LS (converted to decimal)
  south: -7.6194,  // 7°37'10'' LS (converted to decimal)
  east: 109.4542,  // 109°27'15'' BT (converted to decimal)
  west: 108.6547   // 108°39'17'' BT (converted to decimal)
};

// Google Maps Component
interface GoogleMapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  markers: UMKM[];
  onMarkerClick: (umkm: UMKM) => void;
  userLocation?: [number, number];
  mapType: string;
  is3DEnabled: boolean;
  isDarkMode: boolean; // Add dark mode prop
}

// Map type options
const mapTypes = [
  { key: "roadmap", label: "Peta", icon: MapIcon },
  { key: "satellite", label: "Satelit", icon: Satellite },
  { key: "hybrid", label: "Hybrid", icon: Layers },
  { key: "terrain", label: "Terrain", icon: Mountain }
];

// Google Maps dark mode styles
const darkModeStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

function GoogleMapComponent({ center, zoom, markers, onMarkerClick, userLocation, mapType, is3DEnabled, isDarkMode }: GoogleMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [markersArray, setMarkersArray] = useState<google.maps.Marker[]>([]);
  const [hoveredUMKM, setHoveredUMKM] = useState<UMKM | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);
  const boundaryPolygonRef = useRef<google.maps.Polygon | null>(null);

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new google.maps.Map(ref.current, {
        center,
        zoom,
        // Use LokalKu 3D Map with dark mode support
        mapId: GOOGLE_MAPS_MAP_ID,
        mapTypeId: "roadmap",
        restriction: {
          latLngBounds: BANYUMAS_BOUNDS,
          strictBounds: false,
        },
        minZoom: 10,
        maxZoom: 20,
        tilt: 0,
        heading: 0,
        gestureHandling: 'greedy',
        isFractionalZoomEnabled: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        rotateControl: false,
        rotateControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        // Apply dark mode styles initially if needed
        styles: isDarkMode ? darkModeStyles : []
      });

      // Add Banyumas boundary polygon
      const banyumasBoundary = new google.maps.Polygon({
        paths: [
          { lat: BANYUMAS_BOUNDS.north, lng: BANYUMAS_BOUNDS.west },
          { lat: BANYUMAS_BOUNDS.north, lng: BANYUMAS_BOUNDS.east },
          { lat: BANYUMAS_BOUNDS.south, lng: BANYUMAS_BOUNDS.east },
          { lat: BANYUMAS_BOUNDS.south, lng: BANYUMAS_BOUNDS.west }
        ],
        strokeColor: isDarkMode ? "#f97316" : "#FF6B35",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: isDarkMode ? "#f97316" : "#FF6B35",
        fillOpacity: isDarkMode ? 0.15 : 0.1
      });
      banyumasBoundary.setMap(newMap);
      boundaryPolygonRef.current = banyumasBoundary;

      setMap(newMap);
    }
  }, []);

  // Apply dark mode styles when theme changes
  useEffect(() => {
    if (map) {
      console.log('🌓 Dark Mode Changed:', isDarkMode);
      map.setOptions({
        styles: isDarkMode ? darkModeStyles : []
      });
      
      // Update boundary polygon colors
      if (boundaryPolygonRef.current) {
        boundaryPolygonRef.current.setOptions({
          strokeColor: isDarkMode ? "#f97316" : "#FF6B35",
          fillColor: isDarkMode ? "#f97316" : "#FF6B35",
          fillOpacity: isDarkMode ? 0.15 : 0.1
        });
      }
    }
  }, [map, isDarkMode]);

  // Update map type and reapply dark mode styles
  useEffect(() => {
    if (map) {
      map.setMapTypeId(mapType as google.maps.MapTypeId);
      // Reapply dark mode styles after map type change
      // Important: setMapTypeId can reset styles, so we reapply them
      map.setOptions({
        styles: isDarkMode ? darkModeStyles : []
      });
    }
  }, [map, mapType, isDarkMode]);

  // Update 3D tilt and rotation controls
  useEffect(() => {
    if (map) {
      // Use moveCamera for smooth animation instead of immediate setTilt/setHeading
      const currentCenter = map.getCenter();
      const currentZoom = map.getZoom() || 15;
      
      if (is3DEnabled) {
        // Smooth transition to 3D view
        map.moveCamera({
          center: currentCenter,
          zoom: currentZoom < 17 ? 17 : currentZoom, // Ensure minimum zoom for 3D
          tilt: 67.5, // Increased for better 3D effect (0-90)
          heading: 45  // Rotation angle
        });
      } else {
        // Smooth transition back to 2D view
        map.moveCamera({
          center: currentCenter,
          zoom: currentZoom,
          tilt: 0,
          heading: 0
        });
      }
      
      // Enable/disable rotate control
      map.setOptions({
        rotateControl: is3DEnabled,
        rotateControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        }
      });
    }
  }, [map, is3DEnabled]);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markersArray.forEach(marker => marker.setMap(null));
    const newMarkers: google.maps.Marker[] = [];

    // Add UMKM markers
    markers.forEach((umkm) => {
      const marker = new google.maps.Marker({
        position: { lat: umkm.coordinates[1], lng: umkm.coordinates[0] },
        map,
        title: umkm.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C7.163 0 0 7.163 0 16c0 16 16 24 16 24s16-8 16-24C32 7.163 24.837 0 16 0z" fill="#ef4444"/>
              <circle cx="16" cy="16" r="8" fill="white"/>
              <path d="M16 10l-2 2h1v4h2v-4h1l-2-2z" fill="#ef4444"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 40),
          anchor: new google.maps.Point(16, 40),
        },
        animation: google.maps.Animation.DROP,
      });

      marker.addListener('click', () => {
        onMarkerClick(umkm);
      });

      marker.addListener('mouseover', (event: google.maps.MapMouseEvent) => {
        setHoveredUMKM(umkm);
        const domEvent = event.domEvent as MouseEvent | undefined;
        if (domEvent) {
          setHoverPosition({
            x: domEvent.clientX,
            y: domEvent.clientY
          });
        }
      });

      marker.addListener('mouseout', () => {
        setHoveredUMKM(null);
        setHoverPosition(null);
      });

      newMarkers.push(marker);
    });

    // Add user location marker if available
    if (userLocation) {
      const userMarker = new google.maps.Marker({
        position: { lat: userLocation[1], lng: userLocation[0] },
        map,
        title: "Lokasi Anda",
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" fill="#3b82f6" stroke="white" stroke-width="2"/>
              <circle cx="12" cy="12" r="3" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(24, 24),
          anchor: new google.maps.Point(12, 12),
        },
      });
      newMarkers.push(userMarker);
    }

    setMarkersArray(newMarkers);

    return () => {
      newMarkers.forEach(marker => marker.setMap(null));
    };
  }, [map, markers, onMarkerClick, userLocation]);

  // Hover tooltip
  const HoverTooltip = () => {
    if (!hoveredUMKM || !hoverPosition) return null;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed z-[9999] pointer-events-none"
        style={{
          left: `${hoverPosition.x + 15}px`,
          top: `${hoverPosition.y - 10}px`
        }}
      >
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-3 max-w-xs">
          <div className="flex items-start gap-3">
            <img
              src={hoveredUMKM.image}
              alt={hoveredUMKM.name}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                {hoveredUMKM.name}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <Chip size="sm" variant="flat" color="primary" className="text-xs">
                  {hoveredUMKM.category}
                </Chip>
                <Chip
                  size="sm"
                  variant="flat"
                  color={hoveredUMKM.status === "open" ? "success" : "danger"}
                  className="text-xs"
                >
                  {hoveredUMKM.status === "open" ? "Buka" : "Tutup"}
                </Chip>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {hoveredUMKM.rating}
                </span>
                <span className="text-xs text-gray-500">
                  ({hoveredUMKM.reviewCount})
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <div ref={ref} className="w-full h-full" />
      <AnimatePresence>
        {hoveredUMKM && hoverPosition && <HoverTooltip />}
      </AnimatePresence>
    </>
  );
}

// Render function for Google Maps wrapper
const render = (status: Status): React.ReactElement => {
  switch (status) {
    case Status.LOADING:
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <Spinner size="lg" color="primary" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">Memuat peta...</p>
          </div>
        </div>
      );
    case Status.FAILURE:
      return (
        <div className="w-full h-full flex items-center justify-center bg-red-50 dark:bg-red-900/20">
          <div className="text-center p-6">
            <div className="text-red-500 mb-4 flex justify-center">
              <MapPin size={48} />
            </div>
            <h3 className="font-playfair text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
              Gagal Memuat Peta
            </h3>
            <p className="text-red-600 dark:text-red-300 text-sm">
              Periksa koneksi internet atau API key Google Maps
            </p>
          </div>
        </div>
      );
    default:
      return <div className="w-full h-full" />;
  }
};
interface InfoWindowProps {
  umkm: UMKM;
  onClose: () => void;
  onViewDetails: () => void;
}

function InfoWindow({ umkm, onClose, onViewDetails }: InfoWindowProps) {
  const formatPriceRange = (priceRange?: "$" | "$$" | "$$$") => {
    switch (priceRange) {
      case "$": return "Rp 10.000 - 25.000";
      case "$$": return "Rp 25.000 - 50.000";
      case "$$$": return "Rp 50.000 - 100.000";
      default: return "Harga bervariasi";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="border-0 shadow-lg max-w-sm">
        <CardBody className="p-0">
          {/* Image */}
          <div className="relative h-32 overflow-hidden">
            <img
              src={umkm.image}
              alt={umkm.name}
              className="w-full h-full object-cover"
            />
            <Button
              isIconOnly
              size="sm"
              variant="flat"
              className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm"
              onPress={onClose}
            >
              <X size={16} />
            </Button>
            <Chip
              size="sm"
              variant="flat"
              color={umkm.status === "open" ? "success" : "danger"}
              className="absolute bottom-2 left-2"
            >
              <Clock size={12} className="mr-1" />
              {umkm.status === "open" ? "Buka" : "Tutup"}
            </Chip>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-playfair text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                  {umkm.name}
                </h3>
                <Chip size="sm" variant="flat" color="primary" className="mt-1">
                  {umkm.category}
                </Chip>
              </div>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{umkm.rating}</span>
              </div>
              <span className="text-sm text-gray-500">({umkm.reviewCount} ulasan)</span>
            </div>

            {/* Location & Distance */}
            <div className="flex items-center gap-1 mb-2">
              <MapPin size={14} className="text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {umkm.location} • {umkm.distance}
              </span>
            </div>

            {/* Price Range */}
            <p className="text-sm text-gray-500 mb-4">
              {formatPriceRange(umkm.priceRange)}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {umkm.phone && (
                <Button
                  size="sm"
                  variant="flat"
                  color="success"
                  startContent={<Phone size={14} />}
                  onPress={() => window.open(`tel:${umkm.phone}`, '_self')}
                >
                  Call
                </Button>
              )}
              <Button
                size="sm"
                variant="flat"
                color="primary"
                startContent={<Navigation size={14} />}
                onPress={() => {
                  const url = `https://www.google.com/maps/dir/?api=1&destination=${umkm.coordinates[1]},${umkm.coordinates[0]}`;
                  window.open(url, '_blank');
                }}
              >
                Directions
              </Button>
              <Button
                size="sm"
                color="primary"
                startContent={<Eye size={14} />}
                onPress={onViewDetails}
              >
                Details
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}

// List Item Component for Side Panel
interface ListItemProps {
  umkm: UMKM;
  onClick: () => void;
  onViewDetails: () => void;
}

function ListItem({ umkm, onClick, onViewDetails }: ListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex gap-3">
        <img
          src={umkm.image}
          alt={umkm.name}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h4 className="font-playfair font-semibold text-gray-900 dark:text-white truncate">
              {umkm.name}
            </h4>
            <Chip
              size="sm"
              variant="flat"
              color={umkm.status === "open" ? "success" : "danger"}
            >
              {umkm.status === "open" ? "Buka" : "Tutup"}
            </Chip>
          </div>
          
          <Chip size="sm" variant="flat" color="primary" className="mb-2">
            {umkm.category}
          </Chip>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{umkm.rating}</span>
            </div>
            <span className="text-xs text-gray-500">({umkm.reviewCount})</span>
            <span className="text-xs text-gray-500">• {umkm.distance}</span>
          </div>

          <div className="flex gap-2">
            {umkm.phone && (
              <Button
                size="sm"
                variant="flat"
                color="success"
                startContent={<Phone size={12} />}
                onPress={() => {
                  window.open(`tel:${umkm.phone}`, '_self');
                }}
              >
                Call
              </Button>
            )}
            <Button
              size="sm"
              color="primary"
              startContent={<Eye size={12} />}
              onPress={() => {
                onViewDetails();
              }}
            >
              Details
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Main Map Page Component
export default function MapPage() {
  const navigate = useNavigate();
  
  // State management
  const [viewState, setViewState] = useState({
    longitude: PURWOKERTO_CENTER.lng, // Start at Purwokerto
    latitude: PURWOKERTO_CENTER.lat,
    zoom: 14 // Closer zoom for city view
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedUMKM, setSelectedUMKM] = useState<UMKM | null>(null);
  const [showListView, setShowListView] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMapType, setSelectedMapType] = useState<string>("roadmap");
  const [is3DMode, setIs3DMode] = useState(false);
  
  // Detect dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Listen for dark mode changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Filter UMKM data
  const filteredUMKM = banyumasUMKMData.filter(umkm => {
    const matchesSearch = umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         umkm.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         umkm.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || umkm.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle marker click
  const handleMarkerClick = useCallback((umkm: UMKM) => {
    setSelectedUMKM(umkm);
    setViewState(prev => ({
      ...prev,
      longitude: umkm.coordinates[0],
      latitude: umkm.coordinates[1],
      zoom: Math.max(prev.zoom, 15)
    }));
  }, []);

  // Get user location
  const getUserLocation = useCallback(() => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setUserLocation([longitude, latitude]);
          setViewState(prev => ({
            ...prev,
            longitude,
            latitude,
            zoom: 16 // Zoom in to user location
          }));
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
        }
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  // Handle list item click
  const handleListItemClick = useCallback((umkm: UMKM) => {
    handleMarkerClick(umkm);
    setShowListView(false);
  }, [handleMarkerClick]);

  // Handle view details
  const handleViewDetails = useCallback((umkm: UMKM) => {
    navigate(`/detail/${umkm.id}`);
  }, [navigate]);

  // Calculate distance (simple approximation)
  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }, []);

  // Update distances when user location changes
  useEffect(() => {
    if (userLocation) {
      banyumasUMKMData.forEach(umkm => {
        const distance = calculateDistance(
          userLocation[1], userLocation[0],
          umkm.coordinates[1], umkm.coordinates[0]
        );
        umkm.distance = `${distance.toFixed(1)} km`;
      });
    }
  }, [userLocation, calculateDistance]);

  return (
    <>
      {/* Navbar */}
      <Navbar />
      
      <div className="relative h-screen overflow-hidden">
        {/* Google Maps Container */}
        <Wrapper apiKey={GOOGLE_MAPS_API_KEY} render={render}>
          <GoogleMapComponent
            center={PURWOKERTO_CENTER}
            zoom={viewState.zoom}
            markers={filteredUMKM}
            onMarkerClick={handleMarkerClick}
            userLocation={userLocation || undefined}
            mapType={selectedMapType}
            is3DEnabled={is3DMode}
            isDarkMode={isDarkMode}
          />
        </Wrapper>

      {/* Info Window */}
      <AnimatePresence>
        {selectedUMKM && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] pointer-events-auto w-full max-w-sm px-4">
            <InfoWindow
              umkm={selectedUMKM}
              onClose={() => setSelectedUMKM(null)}
              onViewDetails={() => handleViewDetails(selectedUMKM)}
            />
          </div>
        )}
      </AnimatePresence>

      {/* No additional map controls here - they're in GoogleMapComponent */}

      {/* Search & Filter Overlay - Positioned below navbar */}
      <div className="fixed top-[94px] left-0 right-0 z-[90] px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl p-3 sm:p-4 shadow-xl border-2 border-gray-300 dark:border-gray-600">
            {/* Search Bar */}
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Cari UMKM, kategori, atau lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<Search size={18} className="text-gray-500 dark:text-gray-400" />}
                className="flex-1"
                classNames={{
                  input: "bg-transparent text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400",
                  inputWrapper: "bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-gray-600"
                }}
              />
              <Button
                isIconOnly
                variant="solid"
                color="primary"
                onPress={onOpen}
                className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 shadow-md"
              >
                <Filter size={18} className="text-white" />
              </Button>
            </div>

            {/* Category Chips with Horizontal Scroll */}
            <div className="relative -mx-3 sm:-mx-4">
              <div 
                className="flex gap-2 overflow-x-auto px-3 sm:px-4 pb-3 scroll-smooth"
                style={{ 
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#9ca3af #f3f4f6',
                  WebkitOverflowScrolling: 'touch',
                  msOverflowStyle: 'auto'
                }}
              >
                {categories.map((category) => (
                  <Chip
                    key={category}
                    variant={selectedCategory === category ? "solid" : "flat"}
                    color={selectedCategory === category ? "primary" : "default"}
                    className={`cursor-pointer whitespace-nowrap transition-all flex-shrink-0 ${
                      selectedCategory === category
                        ? "bg-primary-600 dark:bg-primary-500 text-white shadow-md scale-105"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 border-2 border-gray-300 dark:border-gray-600"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Chip>
                ))}
                {/* Spacer to ensure scrollbar appears */}
                <div className="flex-shrink-0 w-px" />
              </div>
              {/* Fade indicator on right edge */}
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white/95 dark:from-gray-800/95 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons - All controls at bottom left */}
      <div className="absolute bottom-6 left-4 z-10 flex flex-col gap-2">
        {/* Map Type Selector */}
        <Dropdown>
          <DropdownTrigger>
            <Button
              size="sm"
              variant="solid"
              className="bg-white dark:bg-gray-800 backdrop-blur-md shadow-lg border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-medium hover:shadow-xl transition-all"
              startContent={
                React.createElement(
                  mapTypes.find(type => type.key === selectedMapType)?.icon || Layers,
                  { size: 16, className: "text-primary-600 dark:text-primary-400" }
                )
              }
              endContent={<ChevronDown size={14} className="text-gray-600 dark:text-gray-400" />}
            >
              {mapTypes.find(type => type.key === selectedMapType)?.label || "Peta"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Map Type"
            selectedKeys={[selectedMapType]}
            selectionMode="single"
            className="bg-white dark:bg-gray-800"
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              if (selected) setSelectedMapType(selected as string);
            }}
          >
            {mapTypes.map((type) => (
              <DropdownItem
                key={type.key}
                startContent={<type.icon size={16} />}
                className="text-gray-900 dark:text-white"
              >
                {type.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        {/* 3D Toggle */}
        <Button
          size="sm"
          variant={is3DMode ? "solid" : "bordered"}
          color={is3DMode ? "primary" : "default"}
          className={`backdrop-blur-md shadow-lg border-2 font-medium transition-all hover:shadow-xl ${
            is3DMode 
              ? 'bg-primary-600 dark:bg-primary-500 border-primary-600 dark:border-primary-500 text-white' 
              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white'
          }`}
          startContent={<Mountain size={16} />}
          onPress={() => setIs3DMode(!is3DMode)}
        >
          3D {is3DMode ? 'On' : 'Off'}
        </Button>
        
        {/* List View Toggle */}
        <Button
          size="sm"
          color="primary"
          variant={showListView ? "solid" : "flat"}
          startContent={<List size={16} />}
          onPress={() => setShowListView(!showListView)}
          className={`backdrop-blur-md shadow-lg ${
            showListView
              ? 'bg-primary-600 dark:bg-primary-500'
              : 'bg-white/95 dark:bg-gray-900/95'
          }`}
        >
          {showListView ? "Sembunyikan" : "Daftar UMKM"}
        </Button>

        {/* Current Location */}
        <Button
          size="sm"
          isIconOnly
          color="primary"
          variant="flat"
          isLoading={isLoading}
          onPress={getUserLocation}
          className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
        >
          {!isLoading && <Locate size={16} />}
        </Button>
      </div>

      {/* Side Panel (Desktop) / Bottom Sheet (Mobile) */}
      <AnimatePresence>
        {showListView && (
          <>
            {/* Desktop Side Panel */}
            <motion.div
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="hidden lg:block absolute left-4 top-24 bottom-4 w-96 z-[100] pointer-events-auto"
            >
              <Card className="h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl">
                <CardBody className="p-0">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="font-playfair text-lg font-semibold">
                        UMKM Terdekat ({filteredUMKM.length})
                      </h3>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        className="z-[110] pointer-events-auto bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                        onPress={() => setShowListView(false)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <AnimatePresence>
                      {filteredUMKM.map((umkm) => (
                        <ListItem
                          key={umkm.id}
                          umkm={umkm}
                          onClick={() => handleListItemClick(umkm)}
                          onViewDetails={() => handleViewDetails(umkm)}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Mobile Bottom Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden absolute bottom-0 left-0 right-0 z-[100] max-h-[60vh] pointer-events-auto"
            >
              <Card className="rounded-t-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl">
                <CardBody className="p-0">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="font-playfair text-lg font-semibold">
                        UMKM Terdekat ({filteredUMKM.length})
                      </h3>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="flat"
                        className="z-[110] pointer-events-auto bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                        onPress={() => setShowListView(false)}
                      >
                        <ChevronDown size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <AnimatePresence>
                      {filteredUMKM.map((umkm) => (
                        <ListItem
                          key={umkm.id}
                          umkm={umkm}
                          onClick={() => handleListItemClick(umkm)}
                          onViewDetails={() => handleViewDetails(umkm)}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Filter Modal */}
      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        size="md"
        scrollBehavior="inside"
        placement="center"
        classNames={{
          wrapper: "z-[100]",
          backdrop: "z-[99]",
          base: "bg-white dark:bg-gray-800",
          header: "border-b border-gray-200 dark:border-gray-700 px-5 py-4",
          body: "px-5 py-4",
          footer: "border-t border-gray-200 dark:border-gray-700 px-5 py-3"
        }}
      >
        <ModalContent>
          <ModalHeader>
            <h3 className="text-lg font-playfair font-semibold text-gray-900 dark:text-white">
              Filter & Pengaturan
            </h3>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              {/* Categories Filter */}
              <div>
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-white text-sm">Filter Kategori</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  Pilih kategori untuk menyaring UMKM
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Chip
                      key={category}
                      size="sm"
                      variant={selectedCategory === category ? "solid" : "flat"}
                      color={selectedCategory === category ? "primary" : "default"}
                      className={`cursor-pointer transition-all ${
                        selectedCategory === category
                          ? "bg-primary-600 dark:bg-primary-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* Info Statistics */}
              <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-primary-700 dark:text-primary-300">
                      Total UMKM Ditampilkan
                    </p>
                    <p className="text-xl font-bold text-primary-900 dark:text-primary-100">
                      {filteredUMKM.length}
                    </p>
                  </div>
                  <div className="text-3xl">
                    🏪
                  </div>
                </div>
              </div>

              {/* Map Tips */}
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex gap-2">
                  <div className="text-xl flex-shrink-0">💡</div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-sm text-blue-900 dark:text-blue-100 mb-1.5">Tips Navigasi</h5>
                    <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                      <li className="flex items-start gap-1.5">
                        <span className="text-primary-600 dark:text-primary-400 font-bold">•</span>
                        <span>Gunakan tombol <strong>kiri bawah</strong> untuk ubah tampilan peta</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-primary-600 dark:text-primary-400 font-bold">•</span>
                        <span>Aktifkan <strong>3D</strong> untuk perspektif tiga dimensi</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-primary-600 dark:text-primary-400 font-bold">•</span>
                        <span>Mode 3D: <strong>Shift+Drag</strong> untuk rotate, <strong>Ctrl+Drag</strong> untuk tilt</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-primary-600 dark:text-primary-400 font-bold">•</span>
                        <span>Klik marker merah untuk detail UMKM</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      </div>
    </>
  );
}