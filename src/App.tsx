import { Route, Routes, useLocation } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import DirectoryPage from "@/pages/directory";
import DirectoryCategoriesPage from "@/pages/directory-categories";
import DirectoryLatestPage from "@/pages/directory-latest";
import DetailPage from "@/pages/detail";
import FavoritesPage from "@/pages/favorites";
import MapPage from "@/pages/map";
import MapNearbyPage from "@/pages/map-nearby";
import FAQPage from "@/pages/faq";
import TermsPage from "@/pages/syarat";
import PrivacyPage from "@/pages/privasi";
import NotFound from "@/pages/NotFound";
import ChatWidget from "@/components/chat/ChatWidget";

function App() {
  const location = useLocation();
  const isMapPage = location.pathname === "/peta";

  return (
    <>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<DocsPage />} path="/docs" />
        <Route element={<PricingPage />} path="/pricing" />
        <Route element={<BlogPage />} path="/blog" />
        <Route element={<AboutPage />} path="/about" />
        <Route element={<DirectoryPage />} path="/direktori" />
        <Route element={<DirectoryCategoriesPage />} path="/direktori/kategori" />
        <Route element={<DirectoryLatestPage />} path="/direktori/terbaru" />
        <Route element={<FavoritesPage />} path="/favorit" />
        <Route element={<DetailPage />} path="/detail/:category/:slug" />
        <Route element={<MapPage />} path="/peta" />
        <Route element={<MapNearbyPage />} path="/peta/terdekat" />
        <Route element={<FAQPage />} path="/faq" />
        <Route element={<TermsPage />} path="/syarat" />
        <Route element={<PrivacyPage />} path="/privasi" />
        <Route element={<NotFound />} path="*" />
      </Routes>
      
      {/* SABI AI Chatbot - Hidden on map page */}
      {!isMapPage && <ChatWidget />}
    </>
  );
}

export default App;
