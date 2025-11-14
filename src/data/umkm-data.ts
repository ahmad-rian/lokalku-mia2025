// Centralized UMKM Data for LokalKU Application
// This file contains all UMKM data used across the application to ensure consistency

export interface UMKM {
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
  coordinates: { lat: number; lng: number };
  phone?: string;
  address: string;
  tags?: string[];
  isNew?: boolean;
  isTrending?: boolean;
}

export interface UMKMDetail extends UMKM {
  slug: string;
  nextStatusChange: string;
  whatsapp: string;
  instagram?: string;
  facebook?: string;
  email?: string;
  twitter?: string;
  images: string[];
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  facilities: string[];
  payments: string[];
  products: Product[];
  services?: string[];
  reviews: any[];
}

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  ingredients?: string[];
  category: string;
}

// Main UMKM Dataset
export const umkmData: UMKM[] = [
  {
    id: "1",
    name: "Cuankuy",
    category: "Makanan & Minuman",
    location: "Purwokerto",
    distance: "1.2 km",
    rating: 4.8,
    reviewCount: 156,
    description: "Bakso aci dan cuanky dengan varian rasa keju pedas yang menggugah selera",
    image: "/assets/data-umkm/Cuankuy/cuankuy-1.webp",
    status: "open",
    priceRange: "$",
    isFavorite: false,
    coordinates: { lat: -7.4254, lng: 109.2378 },
    phone: "+6281286939793",
    address: "Purwokerto",
    tags: ["Bakso", "Cuanky", "Pedas"],
    isNew: false,
    isTrending: true
  },
  {
    id: "2",
    name: "Tuku Dimsum",
    category: "Makanan & Minuman",
    location: "Purwokerto Timur",
    distance: "2.3 km",
    rating: 4.7,
    reviewCount: 203,
    description: "Dimsum enak dengan berbagai varian rasa dan paket hemat yang terjangkau",
    image: "/assets/data-umkm/Tuku/tuku.webp",
    status: "open",
    priceRange: "$",
    isFavorite: true,
    coordinates: { lat: -7.4171, lng: 109.2494 },
    phone: "+628180937839",
    address: "Tuku Dimsum Gor Satria, Mangunjaya, Purwokerto Lor, Banyumas",
    tags: ["Dimsum", "Frozen"],
    isNew: false,
    isTrending: true
  },
  {
    id: "3",
    name: "Nakopi",
    category: "Kafe & Resto",
    location: "Banyumas",
    distance: "4.5 km",
    rating: 4.9,
    reviewCount: 178,
    description: "Slow bar dan roastery kopi dengan biji kopi arabika premium dari berbagai daerah",
    image: "/assets/data-umkm/Nakopi/nakopi.webp",
    status: "open",
    priceRange: "$$",
    isFavorite: true,
    coordinates: { lat: -7.4289, lng: 109.2867 },
    phone: "+6283863150405",
    address: "Nakopi Slow Bar and Roastery, Jl. KH. Agus Salim, Karangpucung, Banyumas",
    tags: ["Kopi", "Roastery", "Arabika"],
    isNew: false,
    isTrending: true
  },
  {
    id: "4",
    name: "Madame Mbois",
    category: "Makanan & Minuman",
    location: "Karanglewas",
    distance: "6.8 km",
    rating: 4.8,
    reviewCount: 44,
    description: "Camilan dan kue kering khas dengan Stik Jahe dan Brownies Tempe Cookies yang unik",
    image: "/assets/data-umkm/madame/madem1.webp",
    status: "open",
    priceRange: "$",
    isFavorite: false,
    coordinates: { lat: -7.4512, lng: 109.2623 },
    phone: "+62085291375099",
    address: "Jl. Lettu Irawan RT 04/01 No.40, Dusun II, Pangebatan, Karanglewas, Banyumas",
    tags: ["Camilan", "Kue Kering", "Jahe"],
    isNew: false,
    isTrending: false
  },
  {
    id: "5",
    name: "Kopi Banyumas Mbekayu",
    category: "Kafe & Resto",
    location: "Wangon",
    distance: "12.5 km",
    rating: 4.6,
    reviewCount: 8,
    description: "Kopi lokal Banyumas dengan berbagai varian dari robusta, arabica hingga excelsa",
    image: "/assets/data-umkm/mbekayu/mbekayu.webp",
    status: "open",
    priceRange: "$",
    isFavorite: false,
    coordinates: { lat: -7.5234, lng: 109.1567 },
    phone: "+620811369119",
    address: "Klapagading Kulon RT 04/02, Pecikalan Satu, Wangon, Banyumas",
    tags: ["Kopi", "Lokal", "Robusta"],
    isNew: false,
    isTrending: false
  },
  {
    id: "6",
    name: "Pringmas Batik",
    category: "Fashion",
    location: "Banyumas",
    distance: "8.3 km",
    rating: 4.9,
    reviewCount: 67,
    description: "Batik tulis, cap, dan kombinasi khas Banyumas dengan motif tradisional berkualitas",
    image: "/assets/data-umkm/pringmasbatik/pringmas.webp",
    status: "open",
    priceRange: "$$$",
    isFavorite: true,
    coordinates: { lat: -7.4867, lng: 109.3123 },
    phone: "+62085643312590",
    address: "Galery Batik Pringmas, Kalisuren, Papringan, Banyumas",
    tags: ["Batik", "Tulis", "Cap"],
    isNew: false,
    isTrending: true
  },
  {
    id: "7",
    name: "Sate Taichan Skuyy",
    category: "Makanan & Minuman",
    location: "Purwokerto Timur",
    distance: "3.1 km",
    rating: 4.7,
    reviewCount: 189,
    description: "Sate taichan daging dan kulit dengan sambal pedas khas dan minuman squash segar",
    image: "/assets/data-umkm/SateTaichanSkuyy/sate-1.webp",
    status: "open",
    priceRange: "$",
    isFavorite: false,
    coordinates: { lat: -7.4234, lng: 109.2489 },
    phone: "+62085166447510",
    address: "Pasar Pon (bagian Barat), Jl. DI Panjaitan, Kongsen, Purwokerto Timur",
    tags: ["Sate", "Pedas", "Taichan"],
    isNew: false,
    isTrending: true
  },
  {
    id: "8",
    name: "Getuk Goreng Asli Haji Tohirin",
    category: "Makanan & Minuman",
    location: "Sokaraja",
    distance: "5.4 km",
    rating: 4.7,
    reviewCount: 4000,
    description: "Getuk goreng legendaris dengan keripik bayam, pisang aroma, dan opak kucai pedas",
    image: "/assets/data-umkm/Getukgorengaslihajitohirin/getuk-1.webp",
    status: "open",
    priceRange: "$",
    isFavorite: true,
    coordinates: { lat: -7.4556, lng: 109.2734 },
    phone: "+6208112814141",
    address: "Jl. Jend. Sudirman No.151, Sokaraja Tengah, Banyumas",
    tags: ["Getuk", "Tradisional", "Keripik"],
    isNew: false,
    isTrending: true
  },
  {
    id: "9",
    name: "Kubaro",
    category: "Makanan & Minuman",
    location: "Purwokerto Barat",
    distance: "2.8 km",
    rating: 4.6,
    reviewCount: 167,
    description: "Dimsum dengan berbagai varian seperti ayam, udang, mentai, dan paket hemat lengkap",
    image: "/assets/data-umkm/kubaro/kubaro.webp",
    status: "open",
    priceRange: "$",
    isFavorite: false,
    coordinates: { lat: -7.4198, lng: 109.2289 },
    phone: "+620895422791307",
    address: "Ruko Jl. Ps. Manis No.6, Pesayangan, Kedungwuluh, Purwokerto Barat",
    tags: ["Dimsum", "Paket Hemat", "Mentai"],
    isNew: false,
    isTrending: false
  },
  {
    id: "10",
    name: "Boersa Kampus",
    category: "Retail",
    location: "Bancarkembar",
    distance: "3.9 km",
    rating: 4.5,
    reviewCount: 312,
    description: "Minimarket modern dengan berbagai produk kebutuhan sehari-hari dan pelayanan lengkap",
    image: "/assets/data-umkm/Boersakampus/boersa-1.webp",
    status: "open",
    priceRange: "$$",
    isFavorite: false,
    coordinates: { lat: -7.4145, lng: 109.2567 },
    phone: "+622816574499",
    address: "Ruko Purwokerto Citywalk No.1-3, JL. HR Bunyamin, Dukuhbandong, Bancarkembar",
    tags: ["Minimarket", "Retail", "Modern"],
    isNew: false,
    isTrending: false
  }
];

// Detailed UMKM Database for detail pages
export const umkmDatabase: Record<string, UMKMDetail> = {
  "1": {
    ...umkmData[0],
    slug: "cuankuy",
    nextStatusChange: "22:00",
    whatsapp: "6281286939793",
    instagram: "@cuankuy.pwt",
    images: [
      "/assets/data-umkm/Cuankuy/cuankuy-1.webp",
      "/assets/data-umkm/Cuankuy/cuankut-2.webp",
      "/assets/data-umkm/Cuankuy/cuankut-3.webp"
    ],
    hours: {
      monday: "10:00-22:00",
      tuesday: "10:00-22:00",
      wednesday: "10:00-22:00",
      thursday: "10:00-22:00",
      friday: "10:00-22:00",
      saturday: "10:00-22:00",
      sunday: "10:00-22:00"
    },
    facilities: ["Parkir Motor", "Area Makan", "Tempat Cuci Tangan"],
    payments: ["Cash", "QRIS", "GoPay", "OVO", "ShopeePay"],
    products: [
      {
        id: 1,
        name: "Paket Double-Biasa",
        price: "Rp 28.000",
        image: "/assets/data-umkm/Cuankuy/cuankuy-1.webp",
        description: "1 Aci Biasa + 1 Cuanky Biasa + 2 Es Teh Sereh",
        ingredients: ["Bakso Aci", "Cuanky", "Es Teh Sereh"],
        category: "Paket Spesial"
      },
      {
        id: 2,
        name: "Paket Double-Campur",
        price: "Rp 30.000",
        image: "/assets/data-umkm/Cuankuy/cuankut-2.webp",
        description: "1 Bakso Aci/Cuanky Keju Pedas + 1 Bakso Aci/Cuanky Biasa + 2 Es Teh Sereh",
        ingredients: ["Bakso Aci/Cuanky Keju Pedas", "Bakso Aci Biasa", "Es Teh Sereh"],
        category: "Paket Spesial"
      },
      {
        id: 3,
        name: "Paket Double-Spesial",
        price: "Rp 32.000",
        image: "/assets/data-umkm/Cuankuy/cuankut-3.webp",
        description: "1 Bakso Aci Keju Pedas + 1 Cuanky Keju Pedas + 2 Es Teh Sereh",
        ingredients: ["Bakso Aci Keju Pedas", "Cuanky Keju Pedas", "Es Teh Sereh"],
        category: "Paket Spesial"
      },
      {
        id: 4,
        name: "PAHE (Paket Aci-Hemat)",
        price: "Rp 14.000",
        image: "/assets/data-umkm/Cuankuy/cuankuy-1.webp",
        description: "Bakso Aci/Cuanky Biasa + Es Teh Sereh",
        ingredients: ["Bakso Aci/Cuanky Biasa", "Es Teh Sereh"],
        category: "Paket Hemat"
      },
      {
        id: 5,
        name: "Paket Puas",
        price: "Rp 16.000",
        image: "/assets/data-umkm/Cuankuy/cuankut-2.webp",
        description: "Bakso Aci/Cuanky Kuah Keju Pedas + Es Teh Sereh",
        ingredients: ["Bakso Aci/Cuanky Keju Pedas", "Es Teh Sereh"],
        category: "Paket Hemat"
      },
      {
        id: 6,
        name: "Paket Double",
        price: "Rp 20.000 - 22.000",
        image: "/assets/data-umkm/Cuankuy/cuankut-3.webp",
        description: "1 Bakso Aci/Cuanky Biasa + 1 Bakso Aci/Cuanky Kuah Keju Pedas",
        ingredients: ["Bakso Aci Biasa", "Cuanky Keju Pedas"],
        category: "Paket Hemat"
      }
    ],
    services: ["Dine In", "Take Away", "Delivery"],
    reviews: []
  },
  "2": {
    ...umkmData[1],
    slug: "tuku-dimsum",
    nextStatusChange: "22:00",
    whatsapp: "628180937839",
    instagram: "@tuku_dimsumpwt",
    images: [
      "/assets/data-umkm/Tuku/tuku.webp",
      "/assets/data-umkm/Tuku/tuku_2.webp",
      "/assets/data-umkm/Tuku/tuku-menu.webp"
    ],
    hours: {
      monday: "09:00-21:00",
      tuesday: "09:00-21:00",
      wednesday: "09:00-21:00",
      thursday: "09:00-21:00",
      friday: "09:00-21:00",
      saturday: "09:00-22:00",
      sunday: "09:00-21:00"
    },
    facilities: ["Parkir Motor", "Area Makan", "Tempat Cuci Tangan", "WiFi"],
    payments: ["Cash", "QRIS", "GoPay", "OVO", "ShopeePay", "DANA"],
    products: [
      {
        id: 1,
        name: "Dimsum Udang Ayam (4 pcs)",
        price: "Rp 13.000",
        image: "/assets/data-umkm/Tuku/tuku.webp",
        description: "Dimsum dengan isian udang dan ayam segar",
        ingredients: ["Udang", "Ayam", "Kulit dimsum"],
        category: "Dimsum"
      },
      {
        id: 2,
        name: "Dimsum Mozzarella (4 pcs)",
        price: "Rp 13.000",
        image: "/assets/data-umkm/Tuku/tuku_2.webp",
        description: "Dimsum dengan isian keju mozzarella yang meleleh",
        ingredients: ["Keju Mozzarella", "Kulit dimsum"],
        category: "Dimsum"
      },
      {
        id: 3,
        name: "Dimsum Mentai (4 pcs)",
        price: "Rp 15.000",
        image: "/assets/data-umkm/Tuku/tuku-menu.webp",
        description: "Dimsum dengan saus mentai yang creamy",
        ingredients: ["Isian dimsum", "Saus mentai", "Kulit dimsum"],
        category: "Dimsum"
      },
      {
        id: 4,
        name: "Gyoza (4 pcs)",
        price: "Rp 13.000",
        image: "/assets/data-umkm/Tuku/tuku.webp",
        description: "Gyoza kukus atau goreng dengan isian ayam",
        ingredients: ["Ayam", "Sayuran", "Kulit gyoza"],
        category: "Dimsum"
      },
      {
        id: 5,
        name: "Paket Teh (T1-T3)",
        price: "Rp 17.000 - 21.000",
        image: "/assets/data-umkm/Tuku/tuku-menu.webp",
        description: "Paket dimsum dengan teh manis atau tawar",
        ingredients: ["Dimsum pilihan", "Teh"],
        category: "Paket"
      },
      {
        id: 6,
        name: "Frozen Box Small (20 pcs)",
        price: "Rp 60.000 - 62.000",
        image: "/assets/data-umkm/Tuku/tuku_2.webp",
        description: "Paket frozen dimsum untuk stock di rumah",
        ingredients: ["20 pcs dimsum pilihan"],
        category: "Frozen"
      },
      {
        id: 7,
        name: "Frozen Box Big (30 pcs)",
        price: "Rp 85.000 - 88.000",
        image: "/assets/data-umkm/Tuku/tuku.webp",
        description: "Paket frozen dimsum besar untuk stock di rumah",
        ingredients: ["30 pcs dimsum pilihan"],
        category: "Frozen"
      }
    ],
    services: ["Dine In", "Take Away", "Frozen Box", "Delivery"],
    reviews: []
  },
  "3": {
    ...umkmData[2],
    slug: "nakopi",
    nextStatusChange: "21:00",
    whatsapp: "6283863150405",
    instagram: "@ini.nakopi",
    images: [
      "/assets/data-umkm/Nakopi/nakopi.webp",
      "/assets/data-umkm/Nakopi/nakopi2.webp"
    ],
    hours: {
      monday: "08:00-21:00",
      tuesday: "08:00-21:00",
      wednesday: "08:00-21:00",
      thursday: "08:00-21:00",
      friday: "08:00-22:00",
      saturday: "08:00-22:00",
      sunday: "08:00-21:00"
    },
    facilities: ["WiFi", "AC", "Colokan", "Toilet", "Parkir", "Smoking Area"],
    payments: ["Cash", "QRIS", "GoPay", "OVO", "DANA", "ShopeePay", "Transfer Bank"],
    products: [
      {
        id: 1,
        name: "Arabika Kailasa/Honey 100gr",
        price: "Rp 35.000",
        image: "/assets/data-umkm/Nakopi/nakopi.webp",
        description: "Kopi arabika dengan notes sweet caramel, kismis, sweet dry, fruit",
        ingredients: ["Biji kopi arabika Kailasa/Honey"],
        category: "Kopi Arabika"
      },
      {
        id: 2,
        name: "Arabika Kailasa/Honey 250gr",
        price: "Rp 83.500",
        image: "/assets/data-umkm/Nakopi/nakopi2.webp",
        description: "Paket hemat 250gr kopi arabika Kailasa",
        ingredients: ["Biji kopi arabika Kailasa/Honey 250gr"],
        category: "Kopi Arabika"
      },
      {
        id: 3,
        name: "Arabika Brazil/Rio Verde 100gr",
        price: "Rp 37.500",
        image: "/assets/data-umkm/Nakopi/nakopi.webp",
        description: "Kopi arabika Brazil dengan notes hazelnut, chocolate, almond",
        ingredients: ["Biji kopi arabika Brazil/Rio Verde"],
        category: "Kopi Arabika"
      },
      {
        id: 4,
        name: "Arabika Ratamba/Funky 100gr",
        price: "Rp 36.500",
        image: "/assets/data-umkm/Nakopi/nakopi2.webp",
        description: "Kopi arabika Banjarnegara dengan notes funky berry, fruity",
        ingredients: ["Biji kopi arabika Ratamba/Funky"],
        category: "Kopi Arabika"
      },
      {
        id: 5,
        name: "Arabika Halu/Carbonic 100gr",
        price: "Rp 36.500",
        image: "/assets/data-umkm/Nakopi/nakopi.webp",
        description: "Kopi arabika dengan proses carbonic maceration, notes sweet banana, caramel",
        ingredients: ["Biji kopi arabika Halu/Carbonic"],
        category: "Kopi Arabika"
      },
      {
        id: 6,
        name: "Arabika Kailasa 1kg",
        price: "Rp 325.000",
        image: "/assets/data-umkm/Nakopi/nakopi2.webp",
        description: "Paket kiloan arabika Kailasa untuk kebutuhan kafe atau roastery",
        ingredients: ["Biji kopi arabika Kailasa 1kg"],
        category: "Kopi Arabika"
      }
    ],
    services: ["Dine In", "Take Away", "Coffee Beans Retail", "Roastery Services"],
    reviews: []
  },
  "4": {
    ...umkmData[3],
    slug: "madame-mbois",
    nextStatusChange: "20:00",
    whatsapp: "62085291375099",
    instagram: "@madame.mbois",
    images: [
      "/assets/data-umkm/madame/madem1.webp",
      "/assets/data-umkm/madame/madame2.webp"
    ],
    hours: {
      monday: "08:00-20:00",
      tuesday: "08:00-20:00",
      wednesday: "08:00-20:00",
      thursday: "08:00-20:00",
      friday: "08:00-20:00",
      saturday: "08:00-20:00",
      sunday: "09:00-18:00"
    },
    facilities: ["Parkir Motor", "Area Tunggu"],
    payments: ["Cash", "QRIS", "Transfer Bank"],
    products: [
      {
        id: 1,
        name: "Stik Jahe 300gr",
        price: "Rp 42.000",
        image: "/assets/data-umkm/madame/madem1.webp",
        description: "Stik jahe renyah dengan rasa jahe yang khas dan hangat (10 terjual)",
        ingredients: ["Tepung", "Jahe", "Gula", "Mentega"],
        category: "Kue Kering"
      },
      {
        id: 2,
        name: "Brownies Tempe Cookies 90gr",
        price: "Rp 25.000",
        image: "/assets/data-umkm/madame/madame2.webp",
        description: "Brownies cookies unik dengan campuran tempe yang bergizi (16 terjual)",
        ingredients: ["Tempe", "Tepung", "Coklat", "Gula"],
        category: "Kue Kering"
      },
      {
        id: 3,
        name: "Brownies Tempe Cookies 130gr",
        price: "Rp 30.000",
        image: "/assets/data-umkm/madame/madem1.webp",
        description: "Brownies tempe cookies ukuran besar (12 terjual)",
        ingredients: ["Tempe", "Tepung", "Coklat", "Gula"],
        category: "Kue Kering"
      },
      {
        id: 4,
        name: "Bundling Package",
        price: "Rp 67.000",
        image: "/assets/data-umkm/madame/madame2.webp",
        description: "Paket hemat Brownies 90gr + Stik Jahe 300gr (5 terjual)",
        ingredients: ["Brownies Tempe 90gr", "Stik Jahe 300gr"],
        category: "Paket"
      },
      {
        id: 5,
        name: "Keripik Pisang Karamel 350gr",
        price: "Rp 39.000",
        image: "/assets/data-umkm/madame/madem1.webp",
        description: "Keripik pisang renyah dengan coating karamel manis (1 terjual)",
        ingredients: ["Pisang", "Gula karamel", "Minyak goreng"],
        category: "Keripik"
      }
    ],
    services: ["Take Away", "Pre Order", "Delivery Area Banyumas"],
    reviews: []
  },
  "5": {
    ...umkmData[4],
    slug: "kopi-banyumas-mbekayu",
    nextStatusChange: "20:00",
    whatsapp: "620811369119",
    instagram: "@kopimbekayu",
    images: [
      "/assets/data-umkm/mbekayu/mbekayu.webp",
      "/assets/data-umkm/mbekayu/mbekayu1.webp"
    ],
    hours: {
      monday: "07:00-20:00",
      tuesday: "07:00-20:00",
      wednesday: "07:00-20:00",
      thursday: "07:00-20:00",
      friday: "07:00-20:00",
      saturday: "07:00-21:00",
      sunday: "08:00-20:00"
    },
    facilities: ["Parkir Motor", "Area Makan", "WiFi"],
    payments: ["Cash", "QRIS", "Transfer Bank"],
    products: [
      {
        id: 1,
        name: "Kopi Mbekayu Clebek Blend",
        price: "Rp 20.000",
        image: "/assets/data-umkm/mbekayu/mbekayu.webp",
        description: "Kopi blend khas Mbekayu dengan harga terjangkau (2 terjual)",
        ingredients: ["Campuran biji kopi lokal"],
        category: "Kopi Bubuk"
      },
      {
        id: 2,
        name: "Kopi Mbekayu Robusta",
        price: "Rp 30.000",
        image: "/assets/data-umkm/mbekayu/mbekayu1.webp",
        description: "Kopi robusta murni dengan body yang kuat (2 terjual)",
        ingredients: ["Biji kopi robusta"],
        category: "Kopi Bubuk"
      },
      {
        id: 3,
        name: "Kopi Mbekayu Tubruk",
        price: "Rp 35.000",
        image: "/assets/data-umkm/mbekayu/mbekayu.webp",
        description: "Kopi tubruk siap seduh ala tradisional (2 terjual)",
        ingredients: ["Kopi tubruk halus"],
        category: "Kopi Bubuk"
      },
      {
        id: 4,
        name: "Kopi Mbekayu Excelsa",
        price: "Rp 37.500",
        image: "/assets/data-umkm/mbekayu/mbekayu1.webp",
        description: "Kopi excelsa dengan rasa unik yang langka (1 terjual)",
        ingredients: ["Biji kopi excelsa"],
        category: "Kopi Bubuk"
      },
      {
        id: 5,
        name: "Kopi Mbekayu Arabica",
        price: "Rp 40.000",
        image: "/assets/data-umkm/mbekayu/mbekayu.webp",
        description: "Kopi arabika premium lokal Banyumas (1 terjual)",
        ingredients: ["Biji kopi arabika"],
        category: "Kopi Bubuk"
      },
      {
        id: 6,
        name: "Kopi Mbekayu Spesial Slim",
        price: "Rp 45.000",
        image: "/assets/data-umkm/mbekayu/mbekayu1.webp",
        description: "Kopi spesial dengan efek slim untuk diet",
        ingredients: ["Kopi blend spesial", "Ekstrak alami"],
        category: "Kopi Spesial"
      },
      {
        id: 7,
        name: "Kopisusu/Cold Brew",
        price: "Rp 15.000",
        image: "/assets/data-umkm/mbekayu/mbekayu.webp",
        description: "Kopi susu dingin atau cold brew segar",
        ingredients: ["Kopi", "Susu", "Es"],
        category: "Minuman"
      }
    ],
    services: ["Dine In", "Take Away", "Coffee Retail"],
    reviews: []
  },
  "6": {
    ...umkmData[5],
    slug: "pringmas-batik",
    nextStatusChange: "17:00",
    whatsapp: "62085643312590",
    instagram: "@pringmasbatik",
    images: [
      "/assets/data-umkm/pringmasbatik/pringmas.webp",
      "/assets/data-umkm/pringmasbatik/pringmas-2.webp",
      "/assets/data-umkm/pringmasbatik/pringmas-3.webp",
      "/assets/data-umkm/pringmasbatik/pringmas-4.webp"
    ],
    hours: {
      monday: "08:00-17:00",
      tuesday: "08:00-17:00",
      wednesday: "08:00-17:00",
      thursday: "08:00-17:00",
      friday: "08:00-17:00",
      saturday: "08:00-16:00",
      sunday: "09:00-15:00"
    },
    facilities: ["Parkir Luas", "Galeri Batik", "Ruang Fitting", "Toilet", "Photo Spot"],
    payments: ["Cash", "Transfer Bank", "QRIS"],
    products: [
      {
        id: 1,
        name: "Batik Tulis Premium",
        price: "Mulai Rp 400.000",
        image: "/assets/data-umkm/pringmasbatik/pringmas.webp",
        description: "Batik tulis halus dengan motif khas Banyumas, dikerjakan oleh pengrajin berpengalaman",
        ingredients: ["Kain katun/sutra premium", "Pewarna alami", "Malam berkualitas", "Dikerjakan secara manual"],
        category: "Batik Tulis"
      },
      {
        id: 2,
        name: "Batik Cap",
        price: "Mulai Rp 150.000",
        image: "/assets/data-umkm/pringmasbatik/pringmas-2.webp",
        description: "Batik cap dengan motif tradisional Banyumas yang terjangkau",
        ingredients: ["Kain katun", "Pewarna berkualitas", "Cap batik tradisional"],
        category: "Batik Cap"
      },
      {
        id: 3,
        name: "Batik Kombinasi",
        price: "Mulai Rp 150.000",
        image: "/assets/data-umkm/pringmasbatik/pringmas-3.webp",
        description: "Kombinasi batik tulis dan cap untuk hasil optimal",
        ingredients: ["Kain premium", "Teknik tulis dan cap", "Finishing rapi"],
        category: "Batik Kombinasi"
      },
      {
        id: 4,
        name: "Kemeja Batik Pria",
        price: "Rp 200.000 - 350.000",
        image: "/assets/data-umkm/pringmasbatik/pringmas-4.webp",
        description: "Kemeja batik siap pakai dengan cutting modern",
        ingredients: ["Kain batik cap/tulis", "Kancing branded", "Jahitan presisi"],
        category: "Ready to Wear"
      },
      {
        id: 5,
        name: "Dress Batik Wanita",
        price: "Rp 250.000 - 450.000",
        image: "/assets/data-umkm/pringmasbatik/pringmas-2.webp",
        description: "Dress batik elegan untuk berbagai acara",
        ingredients: ["Kain batik premium", "Desain eksklusif", "Furing halus"],
        category: "Ready to Wear"
      }
    ],
    services: ["Custom Order", "Wholesale", "Kursus Membatik", "Export"],
    reviews: []
  },
  "7": {
    ...umkmData[6],
    slug: "sate-taichan-skuyy",
    nextStatusChange: "Habis",
    whatsapp: "62085166447510",
    instagram: "@satetaichan.skuyy",
    images: [
      "/assets/data-umkm/SateTaichanSkuyy/sate-1.webp",
      "/assets/data-umkm/SateTaichanSkuyy/Menu Taichan Skuyy.webp"
    ],
    hours: {
      monday: "Tutup",
      tuesday: "18:00-Habis",
      wednesday: "18:00-Habis",
      thursday: "18:00-Habis",
      friday: "18:00-Habis",
      saturday: "18:00-Habis",
      sunday: "18:00-Habis"
    },
    facilities: ["Parkir Motor", "Area Makan", "Tempat Cuci Tangan"],
    payments: ["Cash", "QRIS"],
    products: [
      {
        id: 1,
        name: "Sate Daging",
        price: "Rp 15.000",
        image: "/assets/data-umkm/SateTaichanSkuyy/sate-1.webp",
        description: "Sate taichan daging sapi/ayam dengan sambal pedas khas",
        ingredients: ["Daging pilihan", "Sambal pedas", "Jeruk nipis"],
        category: "Sate"
      },
      {
        id: 2,
        name: "Sate Kulit",
        price: "Rp 16.000",
        image: "/assets/data-umkm/SateTaichanSkuyy/Menu Taichan Skuyy.webp",
        description: "Sate kulit ayam yang renyah dengan bumbu spesial",
        ingredients: ["Kulit ayam", "Sambal pedas", "Jeruk nipis"],
        category: "Sate"
      },
      {
        id: 3,
        name: "Sate Mix Daging Kulit",
        price: "Rp 17.000",
        image: "/assets/data-umkm/SateTaichanSkuyy/sate-1.webp",
        description: "Kombinasi sate daging dan kulit dalam satu porsi",
        ingredients: ["Daging", "Kulit ayam", "Sambal pedas", "Jeruk nipis"],
        category: "Sate"
      },
      {
        id: 4,
        name: "Ketupat",
        price: "Rp 1.500",
        image: "/assets/data-umkm/SateTaichanSkuyy/Menu Taichan Skuyy.webp",
        description: "Ketupat lontong pendamping sate",
        ingredients: ["Nasi", "Pembungkus ketupat"],
        category: "Pendamping"
      },
      {
        id: 5,
        name: "Strawberry/Lychee/Melon Squash",
        price: "Rp 7.000",
        image: "/assets/data-umkm/SateTaichanSkuyy/Menu Taichan Skuyy.webp",
        description: "Minuman squash segar dengan pilihan rasa",
        ingredients: ["Sirup pilihan", "Soda", "Es"],
        category: "Minuman"
      },
      {
        id: 6,
        name: "Black Tea (Ice/Hot)",
        price: "Rp 4.000",
        image: "/assets/data-umkm/Sate Taichan Skuyy/Menu Taichan Skuyy.webp",
        description: "Teh hitam manis dingin atau hangat",
        ingredients: ["Teh hitam", "Gula"],
        category: "Minuman"
      }
    ],
    services: ["Dine In", "Take Away"],
    reviews: []
  },
  "8": {
    ...umkmData[7],
    slug: "getuk-goreng-asli-haji-tohirin",
    nextStatusChange: "21:00",
    whatsapp: "6208112814141",
    instagram: "@getukgoreng.aslihajitohirin",
    images: [
      "/assets/data-umkm/Getukgorengaslihajitohirin/getuk-1.webp",
      "/assets/data-umkm/Getukgorengaslihajitohirin/getuk-2.webp",
      "/assets/data-umkm/Getukgorengaslihajitohirin/getuk-3.webp",
      "/assets/data-umkm/Getukgorengaslihajitohirin/keripik.webp",
      "/assets/data-umkm/Getukgorengaslihajitohirin/opak.webp",
      "/assets/data-umkm/Getukgorengaslihajitohirin/pisang-aroma.webp",
      "/assets/data-umkm/Getukgorengaslihajitohirin/sale-pisang.webp"
    ],
    hours: {
      monday: "08:00-21:00",
      tuesday: "08:00-21:00",
      wednesday: "08:00-21:00",
      thursday: "08:00-21:00",
      friday: "08:00-21:00",
      saturday: "08:00-21:00",
      sunday: "08:00-21:00"
    },
    facilities: ["Parkir Luas", "Area Tunggu", "Toilet", "WiFi"],
    payments: ["Cash", "QRIS", "GoPay", "OVO", "ShopeePay", "Transfer Bank"],
    products: [
      {
        id: 1,
        name: "Getuk Goreng ASLI",
        price: "Rp 25.000",
        image: "/assets/data-umkm/Getukgorengaslihajitohirin/getuk-1.webp",
        description: "Getuk goreng legendaris khas Haji Tohirin ★4.7 (4RB+ terjual)",
        ingredients: ["Singkong pilihan", "Gula", "Kelapa", "Minyak goreng"],
        category: "Getuk"
      },
      {
        id: 2,
        name: "Keripik Bayam",
        price: "Rp 18.000",
        image: "/assets/data-umkm/Getukgorengaslihajitohirin/keripik.webp",
        description: "Keripik bayam renyah dan gurih ★4.9 (40 terjual)",
        ingredients: ["Bayam", "Tepung", "Bumbu", "Minyak goreng"],
        category: "Keripik"
      },
      {
        id: 3,
        name: "Pisang Aroma",
        price: "Rp 27.000",
        image: "/assets/data-umkm/Getukgorengaslihajitohirin/pisang-aroma.webp",
        description: "Pisang aroma manis dengan aroma harum ★4.1 (12 terjual)",
        ingredients: ["Pisang ambon", "Tepung", "Gula", "Wijen"],
        category: "Oleh-oleh"
      },
      {
        id: 4,
        name: "Opak Mentah Kucai Pedas",
        price: "Rp 15.000",
        image: "/assets/data-umkm/Getukgorengaslihajitohirin/opak.webp",
        description: "Opak kucai pedas siap goreng ★4.8 (57 terjual)",
        ingredients: ["Tepung beras", "Kucai", "Cabai", "Bumbu"],
        category: "Keripik"
      },
      {
        id: 5,
        name: "Sale Pisang Keju",
        price: "Rp 27.000",
        image: "/assets/data-umkm/Getukgorengaslihajitohirin/sale-pisang.webp",
        description: "Sale pisang dengan topping keju ★4.5 (65 terjual)",
        ingredients: ["Pisang", "Keju", "Gula", "Tepung"],
        category: "Oleh-oleh"
      }
    ],
    services: ["Take Away", "Pre Order", "Delivery", "Wholesale"],
    reviews: []
  },
  "9": {
    ...umkmData[8],
    slug: "kubaro",
    nextStatusChange: "21:00",
    whatsapp: "620895422791307",
    instagram: "@kubaro_pwt",
    images: [
      "/assets/data-umkm/kubaro/kubaro.webp",
      "/assets/data-umkm/kubaro/kubaro-2.webp",
      "/assets/data-umkm/kubaro/menu-kubaro-1.webp",
      "/assets/data-umkm/kubaro/menu-kubaro-2.webp",
      "/assets/data-umkm/kubaro/menu-lengkap.webp"
    ],
    hours: {
      monday: "10:00-21:00",
      tuesday: "10:00-21:00",
      wednesday: "10:00-21:00",
      thursday: "10:00-21:00",
      friday: "10:00-21:00",
      saturday: "10:00-21:00",
      sunday: "10:00-21:00"
    },
    facilities: ["AC", "Parkir Motor", "Area Makan", "WiFi", "Toilet"],
    payments: ["Cash", "QRIS", "GoPay", "OVO", "ShopeePay"],
    products: [
      {
        id: 1,
        name: "Dimsum Ayam (4 pcs)",
        price: "Rp 13.000",
        image: "/assets/data-umkm/kubaro/kubaro.webp",
        description: "Dimsum dengan isian ayam segar",
        ingredients: ["Ayam", "Kulit dimsum"],
        category: "Dimsum"
      },
      {
        id: 2,
        name: "Dimsum Udang (4 pcs)",
        price: "Rp 13.000",
        image: "/assets/data-umkm/kubaro/kubaro-2.webp",
        description: "Dimsum dengan isian udang segar",
        ingredients: ["Udang", "Kulit dimsum"],
        category: "Dimsum"
      },
      {
        id: 3,
        name: "Dimsum Mentai (4 pcs)",
        price: "Rp 15.000",
        image: "/assets/data-umkm/kubaro/menu-kubaro-1.webp",
        description: "Dimsum dengan saus mentai creamy",
        ingredients: ["Isian dimsum", "Saus mentai"],
        category: "Dimsum"
      },
      {
        id: 4,
        name: "Gyoza Kukus/Goreng (4 pcs)",
        price: "Rp 12.000",
        image: "/assets/data-umkm/kubaro/menu-kubaro-2.webp",
        description: "Gyoza dengan pilihan kukus atau goreng",
        ingredients: ["Ayam", "Sayuran", "Kulit gyoza"],
        category: "Dimsum"
      },
      {
        id: 5,
        name: "Rambutan Keju (3 pcs)",
        price: "Rp 13.000",
        image: "/assets/data-umkm/kubaro/menu-lengkap.webp",
        description: "Dimsum rambutan dengan isian keju mozzarella",
        ingredients: ["Keju mozzarella", "Kulit rambutan"],
        category: "Dimsum"
      },
      {
        id: 6,
        name: "Paket Hemat 1",
        price: "Rp 14.000",
        image: "/assets/data-umkm/kubaro/kubaro.webp",
        description: "Paket hemat dimsum + minuman",
        ingredients: ["Dimsum pilihan", "Minuman"],
        category: "Paket"
      },
      {
        id: 7,
        name: "Lemon Tea",
        price: "Rp 5.000",
        image: "/assets/data-umkm/kubaro/menu-lengkap.webp",
        description: "Teh lemon segar",
        ingredients: ["Teh", "Lemon", "Gula", "Es"],
        category: "Minuman"
      }
    ],
    services: ["Dine In", "Take Away", "Delivery"],
    reviews: []
  },
  "10": {
    ...umkmData[9],
    slug: "boersa-kampus",
    nextStatusChange: "23:00",
    whatsapp: "622816574499",
    instagram: "@boersakampus",
    images: [
      "/assets/data-umkm/Boersakampus/boersa-1.webp",
      "/assets/data-umkm/Boersakampus/boersa-2.webp",
      "/assets/data-umkm/Boersakampus/boersa-3.webp",
      "/assets/data-umkm/Boersakampus/boersa-4.webp"
    ],
    hours: {
      monday: "08:00-22:00",
      tuesday: "08:00-22:00",
      wednesday: "08:00-22:00",
      thursday: "08:00-22:00",
      friday: "08:00-22:00",
      saturday: "08:00-23:00",
      sunday: "08:00-22:00"
    },
    facilities: ["AC", "WiFi", "Parkir Luas", "Toilet", "CCTV", "ATM"],
    payments: ["Cash", "Debit Card", "Credit Card", "QRIS", "GoPay", "OVO", "DANA", "ShopeePay"],
    products: [
      {
        id: 1,
        name: "Produk Segar",
        price: "Rp 3.000 - 50.000",
        image: "/assets/data-umkm/Boersakampus/boersa-1.webp",
        description: "Sayuran, buah-buahan, dan produk segar berkualitas",
        ingredients: ["Sayuran segar", "Buah-buahan", "Daging", "Ikan", "Telur"],
        category: "Produk Segar"
      },
      {
        id: 2,
        name: "Kebutuhan Rumah Tangga",
        price: "Rp 2.000 - 100.000",
        image: "/assets/data-umkm/Boersakampus/boersa-2.webp",
        description: "Berbagai kebutuhan rumah tangga dan peralatan",
        ingredients: ["Sabun", "Deterjen", "Shampo", "Pasta gigi", "Peralatan dapur"],
        category: "Rumah Tangga"
      },
      {
        id: 3,
        name: "Makanan & Minuman",
        price: "Rp 1.000 - 30.000",
        image: "/assets/data-umkm/Boersakampus/boersa-3.webp",
        description: "Makanan ringan, minuman, dan kebutuhan konsumsi",
        ingredients: ["Snack", "Minuman", "Roti", "Susu", "Kopi instan"],
        category: "F&B"
      },
      {
        id: 4,
        name: "Sembako Lengkap",
        price: "Rp 5.000 - 150.000",
        image: "/assets/data-umkm/Boersakampus/boersa-4.webp",
        description: "Paket sembako lengkap untuk kebutuhan sehari-hari",
        ingredients: ["Beras", "Minyak goreng", "Gula", "Tepung", "Bumbu dapur"],
        category: "Sembako"
      },
      {
        id: 5,
        name: "Alat Tulis & Kantor",
        price: "Rp 1.000 - 50.000",
        image: "/assets/data-umkm/Boersakampus/boersa-1.webp",
        description: "Perlengkapan alat tulis dan kebutuhan kantor",
        ingredients: ["Pulpen", "Buku", "Kertas", "Penghapus", "Stapler"],
        category: "ATK"
      },
      {
        id: 6,
        name: "Produk Frozen & Olahan",
        price: "Rp 5.000 - 80.000",
        image: "/assets/data-umkm/Boersakampus/boersa-2.webp",
        description: "Produk beku dan makanan olahan siap masak",
        ingredients: ["Nugget", "Sosis", "Bakso", "Dimsum frozen", "Kentang frozen"],
        category: "Frozen"
      }
    ],
    services: ["Retail", "Delivery", "Top Up Pulsa", "Bayar Tagihan", "ATM"],
    reviews: []
  }
};

// Helper functions for data manipulation
export const getUMKMById = (id: string): UMKM | undefined => {
  return umkmData.find(umkm => umkm.id === id);
};

export const getUMKMDetailById = (id: string): UMKMDetail | undefined => {
  return umkmDatabase[id];
};

export const getUMKMByCategory = (category: string): UMKM[] => {
  if (category === "Semua" || category === "All") {
    return umkmData;
  }
  return umkmData.filter(umkm => umkm.category === category);
};

export const getUMKMByLocation = (location: string): UMKM[] => {
  if (location === "Semua" || location === "All") {
    return umkmData;
  }
  return umkmData.filter(umkm => umkm.location === location);
};

export const getUMKMByStatus = (status: "open" | "closed" | "all"): UMKM[] => {
  if (status === "all") {
    return umkmData;
  }
  return umkmData.filter(umkm => umkm.status === status);
};

export const searchUMKM = (query: string): UMKM[] => {
  const lowercaseQuery = query.toLowerCase();
  return umkmData.filter(umkm =>
    umkm.name.toLowerCase().includes(lowercaseQuery) ||
    umkm.description.toLowerCase().includes(lowercaseQuery) ||
    umkm.category.toLowerCase().includes(lowercaseQuery) ||
    umkm.location.toLowerCase().includes(lowercaseQuery)
  );
};

// Categories and locations for filters
export const categories = [
  "Semua",
  "Makanan & Minuman",
  "Fashion",
  "Kafe & Resto",
  "Retail"
];

export const locations = [
  "Semua",
  "Purwokerto",
  "Purwokerto Timur",
  "Purwokerto Barat",
  "Banyumas",
  "Karanglewas",
  "Wangon",
  "Sokaraja",
  "Bancarkembar"
];

// Map-specific data transformations
export const getUMKMForMap = (): Array<Omit<UMKM, 'coordinates'> & { coordinates: [number, number] }> => {
  return umkmData.map(umkm => ({
    ...umkm,
    coordinates: [umkm.coordinates.lng, umkm.coordinates.lat] as [number, number]
  }));
};

export const getNearbyUMKM = (userLocation: [number, number], radiusKm: number = 5): UMKM[] => {
  return umkmData.filter(umkm => {
    const distance = calculateDistance(
      userLocation[1], userLocation[0],
      umkm.coordinates.lat, umkm.coordinates.lng
    );
    return distance <= radiusKm;
  });
};

// Distance calculation helper
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}
