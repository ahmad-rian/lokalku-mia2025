import { Link } from "react-router-dom";
import { 
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  HomeIcon,
  BuildingStorefrontIcon,
  MapIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

export default function Footer() {
  const navigationLinks = [
    { label: "Beranda", href: "/", icon: HomeIcon },
    { label: "Direktori UMKM", href: "/direktori", icon: BuildingStorefrontIcon },
    { label: "Peta", href: "/peta", icon: MapIcon },
    { label: "Favorit", href: "/favorit", icon: HeartIcon }
  ];

  const informationLinks = [
    { label: "Tentang Kami", href: "/tentang" },
    { label: "Hubungi Kami", href: "/kontak" },
    { label: "Kebijakan Privasi", href: "/privasi" },
    { label: "Syarat & Ketentuan", href: "/syarat" },
    { label: "FAQ", href: "/faq" }
  ];

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://instagram.com/rian_syaifullah",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/ahmad-rian",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: "GitHub",
      url: "https://github.com/ahmad-rian",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: "Website",
      url: "https://ahmadrian.site",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      )
    }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black dark:from-black dark:via-gray-950 dark:to-black">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-orange-500/5 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16 border-b border-gray-800/50">
          {/* Column 1 - Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-primary-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                <span className="text-white font-bold text-xl">LK</span>
              </div>
              <span className="text-white font-bold text-2xl">LokalKu</span>
            </div>
            
            {/* Javanese Script Brand Description */}
            <div className="space-y-2">
              <p className="text-primary-400 font-medium" style={{ fontFamily: 'NotoJavaneseRegular, serif' }}>
                ꦭꦺꦴꦏꦭ꧀ꦏꦸ - ꦥ꧀ꦭꦠ꧀ꦥꦺꦴꦂꦩ꧀ ꦢꦶꦫꦺꦏ꧀ꦠꦺꦴꦂꦶ ꦢꦶꦒꦶꦠꦭ꧀
              </p>
              <p className="text-gray-500 text-xs italic">
                (LokalKu - Platform direktori digital)
              </p>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Platform direktori digital yang menghubungkan masyarakat dengan UMKM lokal terbaik di Banyumas. Temukan, jelajahi, dan dukung bisnis lokal dengan mudah.
            </p>
            <div className="flex items-center gap-2 text-gray-400 group hover:text-primary-400 transition-colors">
              <MapPinIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Purwokerto, Banyumas</span>
            </div>
          </div>

          {/* Column 2 - Navigation */}
          <div className="space-y-5">
            <h3 className="text-white font-bold font-display text-lg">Navigasi</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="group flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-all duration-200"
                    >
                      <div className="p-1.5 rounded-lg bg-gray-800/50 group-hover:bg-primary-500/10 transition-colors">
                        <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </div>
                      <span className="text-sm font-medium">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3 - Information */}
          <div className="space-y-5">
            <h3 className="text-white font-bold font-display text-lg">Informasi</h3>
            <ul className="space-y-3">
              {informationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm font-medium hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div className="space-y-5">
            <h3 className="text-white font-bold font-display text-lg">Kontak</h3>
            <div className="space-y-4">
              <a 
                href="mailto:alriansr@gmail.com" 
                className="group flex items-start gap-3 text-gray-400 hover:text-primary-400 transition-colors duration-200"
              >
                <div className="p-1.5 rounded-lg bg-gray-800/50 group-hover:bg-primary-500/10 transition-colors mt-0.5">
                  <EnvelopeIcon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium break-all">
                 alriansr@gmail.com
                </span>
              </a>
              
              
              <a 
                href="https://instagram.com/rian_syaifullah" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors duration-200"
              >
                <div className="p-1.5 rounded-lg bg-gray-800/50 group-hover:bg-primary-500/10 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">@rian_syaifullah</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-gray-500 text-sm text-center lg:text-left">
              © {currentYear} <span className="text-gray-400 font-semibold">LokalKu Banyumas</span>. All rights reserved.
            </div>

            {/* Creator Info */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="text-center sm:text-right">
                <div className="text-gray-300 text-sm font-semibold">
                  Dibuat oleh Ahmad Rian Syaifullah
                </div>
                <div className="text-gray-500 text-xs mt-0.5">
                  Universitas Jenderal Soedirman
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-10 h-10 rounded-xl bg-gray-800/50 backdrop-blur-sm text-gray-400 flex items-center justify-center hover:bg-gradient-to-br hover:from-primary-500 hover:to-orange-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/25"
                    aria-label={social.name}
                    title={social.name}
                  >
                    {social.icon}
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom gradient line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      </div>
    </footer>
  );
}