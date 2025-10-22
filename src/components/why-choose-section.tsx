import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { 
  ShieldCheckIcon,
  MapPinIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  HeartIcon,
  ArrowRightIcon,
  PlusIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function WhyChooseSection() {
  const benefits = [
    {
      icon: ShieldCheckIcon,
      title: "Terpercaya & Terverifikasi",
      description: "Semua UMKM telah melalui proses verifikasi untuk memastikan kualitas dan kredibilitas",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
    },
    {
      icon: MapPinIcon,
      title: "Lokasi Strategis",
      description: "Temukan UMKM terdekat dengan sistem navigasi yang akurat dan mudah digunakan",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
    },
    {
      icon: StarIcon,
      title: "Rating & Ulasan Real",
      description: "Sistem review transparan dari pelanggan asli untuk membantu keputusan Anda",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
    },
    {
      icon: ClockIcon,
      title: "Update Real-time",
      description: "Informasi jam operasional, promo, dan ketersediaan produk selalu terkini",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
    },
    {
      icon: UserGroupIcon,
      title: "Komunitas Lokal",
      description: "Bergabung dengan komunitas yang mendukung pertumbuhan ekonomi lokal Banyumas",
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20"
    },
    {
      icon: HeartIcon,
      title: "Dukung UMKM Lokal",
      description: "Setiap pembelian Anda berkontribusi langsung pada pertumbuhan ekonomi daerah",
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-orange-50/30 via-white to-blue-50/20 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
            Mengapa Memilih{" "}
            <span className="bg-gradient-to-r from-primary-600 to-orange-500 bg-clip-text text-transparent">
              LokalKu?
            </span>
          </h2>
          
          {/* Javanese Script */}
          <div className="mb-4">
            <p className="text-xl md:text-2xl font-medium text-primary-700 dark:text-primary-300" style={{ fontFamily: 'NotoJavaneseRegular, serif' }}>
              ꦏꦼꦤꦥ ꦩꦶꦭꦶꦃ ꦭꦺꦴꦏꦭ꧀ꦏꦸ?
            </p>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Platform terpercaya untuk menghubungkan Anda dengan UMKM terbaik di Banyumas
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              <CardBody className="p-8">
                {/* Icon */}
                <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${benefit.bgGradient} p-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`w-full h-full rounded-xl bg-gradient-to-br ${benefit.gradient} p-2 shadow-lg`}>
                    <benefit.icon className="w-full h-full text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 via-primary-500 to-orange-500 p-12 text-center">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="white" />
                  <path d="M10,10 Q15,5 20,10 T30,10" stroke="white" fill="none" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-pattern)" />
            </svg>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
              Siap Bergabung dengan LokalKu?
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Mulai jelajahi ribuan UMKM terbaik di Banyumas atau daftarkan bisnis Anda untuk menjangkau lebih banyak pelanggan
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                as={Link}
                to="/direktori"
                className="bg-white text-primary-600 font-semibold shadow-lg hover:shadow-xl transition-all px-8"
                endContent={<ArrowRightIcon className="w-4 h-4" />}
              >
                Mulai Jelajahi
              </Button>
              <Button
                size="lg"
                variant="bordered"
                className="border-2 border-white text-white font-semibold hover:bg-white hover:text-primary-600 transition-all px-8"
                startContent={<PlusIcon className="w-4 h-4" />}
              >
                Daftarkan UMKM
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="relative mt-16">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-[0.02]">
            <div className="w-96 h-96 bg-gradient-radial from-primary-200 via-orange-200 to-transparent rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}