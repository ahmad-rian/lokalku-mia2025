import { Card, CardBody } from "@heroui/card";
import { 
  BuildingStorefrontIcon, 
  StarIcon, 
  UserGroupIcon 
} from "@heroicons/react/24/outline";

export default function StatsSection() {
  const stats = [
    {
      icon: BuildingStorefrontIcon,
      value: "150+",
      label: "UMKM Terdaftar",
      description: "Bisnis lokal aktif",
      gradient: "from-primary-500 to-orange-500"
    },
    {
      icon: StarIcon,
      value: "4.8",
      label: "Rating Rata-rata",
      description: "Kepuasan pelanggan",
      gradient: "from-secondary-500 to-blue-500"
    },
    {
      icon: UserGroupIcon,
      value: "2.5K+",
      label: "Pengguna Aktif",
      description: "Komunitas yang berkembang",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-orange-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
            Dipercaya oleh{" "}
            <span className="bg-gradient-to-r from-primary-600 to-orange-500 bg-clip-text text-transparent">
              Ribuan Pengguna
            </span>
          </h2>
          
          {/* Javanese Script */}
          <div className="mb-4">
            <p className="text-xl md:text-2xl font-medium text-primary-700 dark:text-primary-300" style={{ fontFamily: 'NotoJavaneseRegular, serif' }}>
              ꦢꦶꦥꦼꦂꦕꦪ ꦢꦺꦤꦶꦁ ꦲꦺꦮꦸ ꦥꦁꦒꦸꦤ
            </p>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Platform terdepan untuk menghubungkan UMKM dengan pelanggan di Banyumas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              <CardBody className="text-center p-8">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.gradient} p-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {stat.label}
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.description}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Additional decorative elements */}
        <div className="relative mt-16">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-5">
            <div className="w-96 h-96 bg-gradient-radial from-primary-200 to-transparent rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}