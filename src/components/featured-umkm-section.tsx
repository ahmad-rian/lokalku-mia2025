import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  StarIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function FeaturedUMKMSection() {
  const featuredUMKM = [
    {
      id: 1,
      name: "Warung Gudeg Bu Sari",
      category: "Makanan",
      rating: 4.8,
      reviews: 124,
      location: "Purwokerto Selatan",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      isOpen: true,
      specialOffer: "Promo 20%",
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: 2,
      name: "Toko Batik Banyumas",
      category: "Fashion",
      rating: 4.9,
      reviews: 89,
      location: "Purwokerto Utara",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop",
      isOpen: true,
      specialOffer: "New Collection",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      id: 3,
      name: "Bengkel Motor Jaya",
      category: "Jasa",
      rating: 4.7,
      reviews: 156,
      location: "Purwokerto Barat",
      image: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=300&fit=crop",
      isOpen: false,
      specialOffer: "Service Gratis",
      gradient: "from-green-500 to-teal-500"
    },
    {
      id: 4,
      name: "Kopi Robusta Banyumas",
      category: "Minuman",
      rating: 4.6,
      reviews: 203,
      location: "Purwokerto Timur",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
      isOpen: true,
      specialOffer: "Buy 2 Get 1",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      id: 5,
      name: "Salon Cantik Indah",
      category: "Kecantikan",
      rating: 4.8,
      reviews: 67,
      location: "Purwokerto Tengah",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
      isOpen: true,
      specialOffer: "Paket Hemat",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white via-orange-50/20 to-blue-50/30 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
            UMKM{" "}
            <span className="bg-gradient-to-r from-primary-600 to-orange-500 bg-clip-text text-transparent">
              Unggulan
            </span>
          </h2>
          
          {/* Javanese Script */}
          <div className="mb-4">
            <p className="text-xl md:text-2xl font-medium text-primary-700 dark:text-primary-300" style={{ fontFamily: 'NotoJavaneseRegular, serif' }}>
              ꦈꦩ꧀ꦏꦺꦩ꧀ ꦈꦁꦒꦸꦭꦤ꧀
            </p>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
             Temukan UMKM pilihan terbaik dengan rating tertinggi dan ulasan positif dari pelanggan
           </p>
         </div>

         {/* Navigation Buttons */}
         <div className="flex justify-center mb-8">
           <div className="flex gap-2">
             <Button
               isIconOnly
               variant="bordered"
               className="border-2 border-gray-300 dark:border-gray-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-orange-50 dark:hover:from-primary-900/20 dark:hover:to-orange-900/20 transition-all"
             >
               <ChevronLeftIcon className="w-5 h-5" />
             </Button>
             <Button
               isIconOnly
               variant="bordered"
               className="border-2 border-gray-300 dark:border-gray-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-orange-50 dark:hover:from-primary-900/20 dark:hover:to-orange-900/20 transition-all"
             >
               <ChevronRightIcon className="w-5 h-5" />
             </Button>
           </div>
         </div>

        {/* UMKM Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {featuredUMKM.map((umkm) => (
            <Card 
              key={umkm.id}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-pointer"
              isPressable
            >
              <CardBody className="p-0">
                {/* Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={umkm.image} 
                    alt={umkm.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <Chip
                      size="sm"
                      className={`${
                        umkm.isOpen 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                      }`}
                      startContent={<ClockIcon className="w-3 h-3" />}
                    >
                      {umkm.isOpen ? 'Buka' : 'Tutup'}
                    </Chip>
                  </div>

                  {/* Special Offer Badge */}
                  <div className="absolute top-3 right-3">
                    <Chip
                      size="sm"
                      className={`bg-gradient-to-r ${umkm.gradient} text-white font-semibold shadow-lg`}
                    >
                      {umkm.specialOffer}
                    </Chip>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1 line-clamp-1">
                      {umkm.name}
                    </h3>
                    <Chip 
                      size="sm" 
                      variant="flat"
                      className="bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                    >
                      {umkm.category}
                    </Chip>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {umkm.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({umkm.reviews} ulasan)
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPinIcon className="w-4 h-4" />
                    <span className="text-sm">{umkm.location}</span>
                  </div>
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
            endContent={<ArrowRightIcon className="w-4 h-4" />}
          >
            Lihat Semua UMKM
          </Button>
        </div>
      </div>
    </section>
  );
}