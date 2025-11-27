import { lazy, Suspense } from "react";
import DefaultLayout from "@/layouts/default";
import HeroSection from "@/components/hero-section";

// Lazy load non-critical sections untuk improve LCP
const MapShowcaseSection = lazy(() => import("@/components/map-showcase-section"));
const FeaturedUMKMSection = lazy(() => import("@/components/featured-umkm-section"));
const CategoriesSection = lazy(() => import("@/components/categories-section"));
const WhyChooseSection = lazy(() => import("@/components/why-choose-section"));
const Footer = lazy(() => import("@/components/footer"));

// Simple loading fallback
const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

export default function IndexPage() {
  return (
    <DefaultLayout>
      {/* Critical: Hero Section - Loaded immediately for LCP */}
      <HeroSection />

      {/* Map Showcase - Lazy loaded with scroll animation */}
      <Suspense fallback={<SectionLoader />}>
        <MapShowcaseSection />
      </Suspense>

      {/* Non-critical: Lazy loaded to improve initial LCP */}
      <Suspense fallback={<SectionLoader />}>
        <FeaturedUMKMSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <CategoriesSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <WhyChooseSection />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </DefaultLayout>
  );
}
