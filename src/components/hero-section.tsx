import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { 
  MagnifyingGlassIcon, 
  ArrowRightIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from 'react';
import { Renderer, Program, Triangle, Mesh } from 'ogl';

// Import Playfair Display font
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap';
if (!document.head.querySelector('[href*="Playfair+Display"]')) {
  document.head.appendChild(fontLink);
}

// Light Rays Component using OGL
const LightRays = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<any>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const meshRef = useRef<any>(null);
  const cleanupFunctionRef = useRef<(() => void) | null>(null);

  const hexToRgb = (hex: string): [number, number, number] => {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
  };

  useEffect(() => {
    if (!containerRef.current) return;

    if (cleanupFunctionRef.current) {
      cleanupFunctionRef.current();
      cleanupFunctionRef.current = null;
    }

    const initializeWebGL = async () => {
      if (!containerRef.current) return;

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true
      });
      rendererRef.current = renderer;

      const gl = renderer.gl;
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';

      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(gl.canvas);

      const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

      const frag = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;
uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;

varying vec2 vUv;

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);
  
  float spreadFactor = pow(max(cosAngle, 0.0), 1.0 / max(lightSpread, 0.001));
  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  
  float baseStrength = clamp(
    (0.45 + 0.15 * sin(cosAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-cosAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * spreadFactor;
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
  
  vec4 rays1 = vec4(1.0) * rayStrength(rayPos, rayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) * rayStrength(rayPos, rayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);

  vec4 fragColor = rays1 * 0.5 + rays2 * 0.4;

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  fragColor.rgb *= raysColor;
  gl_FragColor = fragColor;
}`;

      // Different colors for light and dark mode
      // Light mode: Warm amber/yellow (#fbbf24)
      // Dark mode: Orange (#f97316)
      const rayColor = isDarkMode ? '#f97316' : '#fbbf24';
      
      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },
        rayPos: { value: [0, 0] },
        rayDir: { value: [0, 1] },
        raysColor: { value: hexToRgb(rayColor) },
        raysSpeed: { value: isDarkMode ? 1.0 : 0.7 },
        lightSpread: { value: isDarkMode ? 0.8 : 1.2 },
        rayLength: { value: isDarkMode ? 2.0 : 1.8 },
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms
      });
      const mesh = new Mesh(gl, { geometry, program });
      meshRef.current = mesh;

      const updatePlacement = () => {
        if (!containerRef.current || !renderer) return;

        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        renderer.setSize(wCSS, hCSS);

        const dpr = renderer.dpr;
        const w = wCSS * dpr;
        const h = hCSS * dpr;

        uniforms.iResolution.value = [w, h];
        uniforms.rayPos.value = [0.5 * w, -0.2 * h];
        uniforms.rayDir.value = [0, 1];
      };

      const loop = (t: number) => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) {
          return;
        }

        uniforms.iTime.value = t * 0.001;

        try {
          renderer.render({ scene: mesh });
          animationIdRef.current = requestAnimationFrame(loop);
        } catch (error) {
          console.warn('WebGL rendering error:', error);
          return;
        }
      };

      window.addEventListener('resize', updatePlacement);
      updatePlacement();
      animationIdRef.current = requestAnimationFrame(loop);

      cleanupFunctionRef.current = () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }

        window.removeEventListener('resize', updatePlacement);

        if (renderer) {
          try {
            const canvas = renderer.gl.canvas;
            const loseContextExt = renderer.gl.getExtension('WEBGL_lose_context');
            if (loseContextExt) {
              loseContextExt.loseContext();
            }

            if (canvas && canvas.parentNode) {
              canvas.parentNode.removeChild(canvas);
            }
          } catch (error) {
            console.warn('Error during WebGL cleanup:', error);
          }
        }

        rendererRef.current = null;
        uniformsRef.current = null;
        meshRef.current = null;
      };
    };

    initializeWebGL();

    return () => {
      if (cleanupFunctionRef.current) {
        cleanupFunctionRef.current();
        cleanupFunctionRef.current = null;
      }
    };
  }, [isDarkMode]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ 
        mixBlendMode: isDarkMode ? 'screen' : 'multiply',
        opacity: isDarkMode ? 1 : 0.2
      }}
    />
  );
};

export default function HeroSection() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Unsplash images - Indonesian food & business
  const umkmImages = [
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=500&fit=crop",
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=500&fit=crop",
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center">
        {/* Light Rays Background - Works in both modes */}
        <div className="absolute inset-0 overflow-hidden">
          <LightRays isDarkMode={isDarkMode} />
          {isDarkMode && (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent" />
            </>
          )}
        </div>

        {/* Light mode background pattern */}
        {!isDarkMode && (
          <div className="absolute inset-0">
            <div className="absolute top-20 right-10 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
          </div>
        )}

        {/* Animated gradient orbs - Dark mode only */}
        {isDarkMode && (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-full border border-gray-200 dark:border-white/20 shadow-lg mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white/90">
                150+ UMKM Terdaftar di Banyumas
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="block text-gray-900 dark:text-white mb-2">
                Platform Terdepan
              </span>
              <span className="block bg-gradient-to-r from-primary-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                UMKM Banyumas
              </span>
            </h1>

            {/* Javanese Script */}
            <div className="mb-6">
              <p className="text-2xl md:text-3xl font-medium text-orange-600 dark:text-orange-400/80" style={{ fontFamily: 'NotoJavaneseRegular, serif' }}>
                ꦢꦶꦫꦺꦏ꧀ꦠꦺꦴꦂꦶ ꦈꦩ꧀ꦏꦺꦩ꧀ ꦧꦚꦸꦩꦱ꧀
              </p>
            </div>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
              Jelajahi ribuan UMKM lokal di Banyumas. Temukan makanan lezat, 
              produk unik, dan layanan terpercaya dari pengusaha lokal.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10 max-w-2xl mx-auto">
              <Input
                size="lg"
                placeholder="Cari UMKM, makanan, jasa..."
                startContent={<MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />}
                classNames={{
                  input: "text-base",
                  inputWrapper: "bg-white dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/15 transition-all shadow-lg"
                }}
                className="flex-1"
              />
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary-600 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-orange-500/30 transition-all px-8"
              >
                Cari
              </Button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                as={Link}
                to="/direktori"
                className="bg-gray-900 dark:bg-white/10 backdrop-blur-md border border-gray-900 dark:border-white/20 text-white font-semibold hover:bg-gray-800 dark:hover:bg-white/20 transition-all shadow-lg"
                endContent={<ArrowRightIcon className="w-4 h-4" />}
              >
                Jelajahi UMKM
              </Button>
              <Button 
                size="lg"
                variant="bordered"
                className="border-2 border-gray-300 dark:border-white/30 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                startContent={<PlayIcon className="w-4 h-4" />}
              >
                Lihat Video
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">150+</div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">UMKM Terdaftar</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">4.8</div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Rating Rata-rata</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">2.5K+</div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Pengguna Aktif</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-gray-600 dark:bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

    
    </>
  );
}