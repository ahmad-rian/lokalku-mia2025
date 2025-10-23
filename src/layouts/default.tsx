import Navbar from "@/components/navbar";
import { Button } from "@heroui/button";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="w-full flex-grow">
        {children}
      </main>
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          isIconOnly
          size="lg"
          className="fixed bottom-6 right-6 z-50 bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
          onPress={scrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronUpIcon className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}