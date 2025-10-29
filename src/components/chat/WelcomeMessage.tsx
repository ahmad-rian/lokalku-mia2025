// Welcome Message Component - Redesigned
import { motion } from "framer-motion";
import { 
  MapPinIcon, 
  BuildingStorefrontIcon, 
  MagnifyingGlassIcon, 
  HeartIcon,
  SparklesIcon,
  LightBulbIcon
} from "@heroicons/react/24/solid";

interface WelcomeMessageProps {
  onQuickReply: (reply: string) => void;
}

export const WelcomeMessage = ({ onQuickReply }: WelcomeMessageProps) => {
  const quickStartOptions = [
    {
      icon: MapPinIcon,
      text: "Warung makan terdekat",
      query: "Cari warung makan terdekat",
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: BuildingStorefrontIcon,
      text: "Toko batik Banyumas",
      query: "Cari toko batik Banyumas",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: MagnifyingGlassIcon,
      text: "Rekomendasi kafe",
      query: "Rekomendasikan kafe yang bagus",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: HeartIcon,
      text: "UMKM rating tertinggi",
      query: "Tampilkan UMKM dengan rating tertinggi",
      gradient: "from-green-500 to-emerald-500"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-orange-500 rounded-3xl p-6 shadow-xl"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
        
        <div className="relative">
          <div className="flex items-start gap-4 mb-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-yellow-300/30 rounded-2xl blur-xl animate-pulse"></div>
                <div className="relative w-full h-full bg-white/20 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
                  <img
                    src="/assets/images/maskot.png"
                    alt="SABI AI"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
            
            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-2xl font-bold text-white">
                  Halo! Saya SABI AI
                </h3>
                <SparklesIcon className="w-6 h-6 text-yellow-300 animate-pulse" />
              </div>
              <p className="text-sm text-white/95 font-medium mb-3">
                Asisten Virtual untuk UMKM Banyumas
              </p>
              <p className="text-sm leading-relaxed text-white/90">
                Saya siap membantu Anda menemukan <strong className="text-yellow-300">UMKM terbaik</strong> di Banyumas! 
                Tanya saya tentang makanan, tempat belanja, jasa, atau apapun yang Anda butuhkan. 🏪✨
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Start Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <div className="w-1 h-5 bg-gradient-to-b from-primary-600 to-orange-500 rounded-full"></div>
          <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
            Mulai Pencarian Anda
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-2.5">
          {quickStartOptions.map((option, idx) => {
            const IconComponent = option.icon;
            return (
              <motion.button
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                onClick={() => onQuickReply(option.query)}
                className="group relative flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 transition-all shadow-sm hover:shadow-lg overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${option.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                
                {/* Icon */}
                <div className={`relative flex-shrink-0 w-11 h-11 bg-gradient-to-br ${option.gradient} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                {/* Text */}
                <span className="relative text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-left">
                  {option.text}
                </span>
                
                {/* Arrow indicator */}
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-4"
      >
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
            <LightBulbIcon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-blue-900 dark:text-blue-200 mb-1">
              💡 Tips Pencarian
            </h4>
            <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
              Anda bisa bertanya apa saja! Contoh: "Cari bengkel motor terdekat", "Rekomendasi tempat nongkrong", atau "UMKM dengan rating 4.5+"
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};