import { useState } from "react";
import { ChevronDown, FileText, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DefaultLayout from "@/layouts/default";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface TermsSection {
  title: string;
  content: string;
}

// Lightweight Animated Dots Background
const AnimatedDotsBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute inset-0 w-full h-full opacity-50">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(156, 163, 175, 0.4) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          animation: 'dotsPulse 3s ease-in-out infinite'
        }} />
        
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/80 to-white dark:via-gray-900/80 dark:to-gray-900" 
          style={{
            background: `radial-gradient(ellipse at top, transparent 0%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,1) 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-900/80 to-gray-900 hidden dark:block"
          style={{
            background: `radial-gradient(ellipse at top, transparent 0%, rgba(17,24,39,0.2) 40%, rgba(17,24,39,1) 100%)`,
          }}
        />
      </div>
    </div>
  );
};

// Accordion Item Component
const AccordionItem = ({ item, index, isOpen, onToggle }: { 
  item: TermsSection; 
  index: number; 
  isOpen: boolean; 
  onToggle: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-gray-200 dark:border-gray-800"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
      >
        <span className="text-lg font-semibold text-gray-900 dark:text-white pr-8 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {item.title}
        </span>
        <ChevronDown 
          className={cn(
            "w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function TermsAndConditions() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const termsData: TermsSection[] = [
    {
      title: t("terms.sections.acceptance.title"),
      content: t("terms.sections.acceptance.content")
    },
    {
      title: t("terms.sections.services.title"),
      content: t("terms.sections.services.content")
    },
    {
      title: t("terms.sections.registration.title"),
      content: t("terms.sections.registration.content")
    },
    {
      title: t("terms.sections.userConduct.title"),
      content: t("terms.sections.userConduct.content")
    },
    {
      title: t("terms.sections.content.title"),
      content: t("terms.sections.content.content")
    },
    {
      title: t("terms.sections.privacy.title"),
      content: t("terms.sections.privacy.content")
    },
    {
      title: t("terms.sections.liability.title"),
      content: t("terms.sections.liability.content")
    },
    {
      title: t("terms.sections.modifications.title"),
      content: t("terms.sections.modifications.content")
    },
    {
      title: t("terms.sections.termination.title"),
      content: t("terms.sections.termination.content")
    },
    {
      title: t("terms.sections.governing.title"),
      content: t("terms.sections.governing.content")
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
        {/* Animated Dots Background */}
        <AnimatedDotsBackground />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
          {/* Header */}
          <div className="text-center mb-12 blur-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="inline-block mb-4 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full">
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                {t("terms.badge")}
              </span>
            </div>
            
            <h1
              className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
            >
              {t("terms.title")}
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
              {t("terms.description")}
            </p>
            
            <p className="text-gray-600 dark:text-gray-400">
              {t("terms.lastUpdated")}: {new Date().toLocaleDateString('id-ID', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Terms Accordion */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden blur-fade-in" style={{ animationDelay: "0.3s" }}>
            {termsData.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center blur-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="bg-gradient-to-r from-primary-600 to-orange-500 rounded-2xl p-8 text-white">
              <h3 className="font-playfair text-2xl font-bold mb-4">
                {t("terms.contact.title")}
              </h3>
              <p className="text-white/90 mb-6 max-w-xl mx-auto">
                {t("terms.contact.description")}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.ahmadrian.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  {t("terms.contact.email")}
                </a>
                
                <a
                  href="https://wa.me/6282123479638"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-colors border border-white/30"
                >
                  <Shield className="w-5 h-5" />
                  {t("terms.contact.whatsapp")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Styles */}
        <style>{`
          @keyframes blurFadeIn {
            0% {
              opacity: 0;
              filter: blur(10px);
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              filter: blur(0);
              transform: translateY(0);
            }
          }

          .blur-fade-in {
            animation: blurFadeIn 0.8s ease-out both;
          }

          @keyframes dotsPulse {
            0%, 100% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.6;
            }
          }
        `}</style>
      </div>
    </DefaultLayout>
  );
}