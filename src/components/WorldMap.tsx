import { useRef, useState, useEffect, useMemo } from "react";
import DottedMap from "dotted-map";

interface MapDot {
  start: { lat: number; lng: number; label?: string };
  end: { lat: number; lng: number; label?: string };
}

interface WorldMapProps {
  dots?: MapDot[];
  lineColor?: string;
}

export default function WorldMap({ dots = [], lineColor = "#f97316" }: WorldMapProps) {
  const svgRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(() => 
    document.documentElement.classList.contains('dark')
  );

  // Memoize the map creation to prevent unnecessary re-renders
  const map = useMemo(() => new DottedMap({ height: 60, grid: "diagonal" }), []); // Reduced height for performance

  // Optimize theme detection with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const checkTheme = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newIsDarkMode = document.documentElement.classList.contains('dark');
        if (newIsDarkMode !== isDarkMode) {
          setIsDarkMode(newIsDarkMode);
        }
      }, 100); // Increased debounce
    };
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [isDarkMode]);

  // Memoize SVG map to prevent regeneration on every render
  const svgMap = useMemo(() => {
    return map.getSVG({
      radius: 0.2,
      color: isDarkMode ? "#FFFFFF30" : "#00000030", // Reduced opacity
      shape: "circle",
      backgroundColor: isDarkMode ? "black" : "white",
    });
  }, [map, isDarkMode]);

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  // Simplified straight path instead of curve for better performance
  const createPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  };

  // Memoize projected points to avoid recalculation
  const projectedDots = useMemo(() => {
    return dots.map(dot => ({
      ...dot,
      startPoint: projectPoint(dot.start.lat, dot.start.lng),
      endPoint: projectPoint(dot.end.lat, dot.end.lng)
    }));
  }, [dots]);

  return (
    <div className="w-full aspect-[2/1] dark:bg-black bg-white rounded-lg relative">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        loading="lazy"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {/* Simple paths without animation */}
        {projectedDots.map((dot, i) => (
          <g key={`path-group-${i}`}>
            <path
              d={createPath(dot.startPoint, dot.endPoint)}
              fill="none"
              stroke={lineColor}
              strokeWidth="1.5"
              opacity="0.6"
              strokeDasharray="5,5"
            />
          </g>
        ))}

        {/* Simple dots without animation */}
        {projectedDots.map((dot, i) => (
          <g key={`dots-${i}`}>
            {/* Start point */}
            <circle
              cx={dot.startPoint.x}
              cy={dot.startPoint.y}
              r="4"
              fill={lineColor}
              opacity="0.8"
            />

            {/* End point */}
            <circle
              cx={dot.endPoint.x}
              cy={dot.endPoint.y}
              r="4"
              fill={lineColor}
              opacity="0.8"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}