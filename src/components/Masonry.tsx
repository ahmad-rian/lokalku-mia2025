import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import '../styles/Masonry.css';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
  name?: string;
  category?: string;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  animateOnView?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.98,
  blurToFocus = true,
  colorShiftOnHover = false,
  animateOnView = true,
}) => {
  const navigate = useNavigate();
  
  // Better responsive breakpoints - FIXED: Shows 2 columns on mobile instead of 1
  const columns = useMedia(
    ['(min-width:1280px)', '(min-width:1024px)', '(min-width:768px)', '(min-width:640px)'],
    [4, 4, 3, 2],
    2  // Changed from 1 to 2 for mobile default
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.15,
    rootMargin: '0px',
    triggerOnce: true,
  });
  const combinedRef = (el: HTMLDivElement | null) => {
    (containerRef as any).current = el;
    (elementRef as any).current = el as any;
  };
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === 'random') {
      const directions = ['top', 'bottom', 'left', 'right'];
      direction = directions[Math.floor(Math.random() * directions.length)] as typeof animateFrom;
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;
    
    // Adjust height multiplier based on screen size
    const isMobile = width < 640;
    const heightMultiplier = isMobile ? 0.4 : 0.5;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height * heightMultiplier;
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };

      if (!hasMounted.current) {
        const initialPos = getInitialPosition(item);
        const initialState = {
          opacity: 0,
          x: initialPos.x,
          y: initialPos.y,
          width: item.w,
          height: item.h,
          ...(blurToFocus && { filter: 'blur(10px)' }),
        };

        if (animateOnView) {
          if (isIntersecting) {
            gsap.fromTo(selector, initialState, {
              opacity: 1,
              ...animationProps,
              ...(blurToFocus && { filter: 'blur(0px)' }),
              duration: 0.8,
              ease: 'power3.out',
              delay: index * stagger,
            });
          } else {
            gsap.set(selector, initialState);
          }
        } else {
          gsap.fromTo(selector, initialState, {
            opacity: 1,
            ...animationProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger,
          });
        }
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration: duration,
          ease: ease,
          overwrite: 'auto',
        });
      }
    });

    if (!hasMounted.current && (!animateOnView || isIntersecting)) {
      hasMounted.current = true;
    }
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease, isIntersecting, animateOnView]);

  const handleMouseEnter = (e: React.MouseEvent, item: GridItem) => {
    const element = e.currentTarget as HTMLElement;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.3
        });
      }
    }

    // Show overlay text
    const textOverlay = element.querySelector('.text-overlay') as HTMLElement;
    if (textOverlay) {
      gsap.to(textOverlay, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent, item: GridItem) => {
    const element = e.currentTarget as HTMLElement;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3
        });
      }
    }

    // Hide overlay text
    const textOverlay = element.querySelector('.text-overlay') as HTMLElement;
    if (textOverlay) {
      gsap.to(textOverlay, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleClick = (e: React.MouseEvent | React.TouchEvent, item: GridItem) => {
    e.preventDefault();
    const element = e.currentTarget as HTMLElement;
    const rect = element.getBoundingClientRect();
    
    // Get click/touch position
    let x: number, y: number;
    if ('touches' in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else if ('clientX' in e) {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    } else {
      x = rect.width / 2;
      y = rect.height / 2;
    }

    // Create ripple element
    const ripple = document.createElement('span');
    ripple.className = 'masonry-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    element.appendChild(ripple);

    // Animate ripple with GSAP
    const timeline = gsap.timeline();
    
    timeline.fromTo(ripple,
      {
        scale: 0,
        opacity: 0.8
      },
      {
        scale: 4,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          ripple.remove();
        }
      }
    );

    // Add press effect
    gsap.to(`[data-key="${item.id}"]`, {
      scale: 0.95,
      duration: 0.1,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        // Navigate after animation using React Router
        setTimeout(() => {
          console.log('Masonry: Navigating to:', item.url);
          navigate(item.url);
        }, 50);
      }
    });

    // Add flash effect
    const flash = element.querySelector('.masonry-item-img');
    if (flash) {
      gsap.fromTo(flash,
        {
          filter: 'brightness(1)'
        },
        {
          filter: 'brightness(1.2)',
          duration: 0.15,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1
        }
      );
    }
  };

  return (
    <div ref={combinedRef} className="masonry-list">
      {grid.map(item => {
        return (
          <div
            key={item.id}
            data-key={item.id}
            className="masonry-item-wrapper"
            onClick={e => handleClick(e, item)}
            onTouchStart={e => handleClick(e, item)}
            onMouseEnter={e => handleMouseEnter(e, item)}
            onMouseLeave={e => handleMouseLeave(e, item)}
          >
            <div className="masonry-item-img" style={{ backgroundImage: `url(${item.img})` }}>
              {colorShiftOnHover && (
                <div
                  className="color-overlay"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))',
                    opacity: 0,
                    pointerEvents: 'none',
                    borderRadius: '12px'
                  }}
                />
              )}
              
              {/* Text Overlay */}
              {(item.name || item.category) && (
                <div className="text-overlay">
                  <div className="text-overlay-content">
                    {item.name && <h3 className="text-overlay-title">{item.name}</h3>}
                    {item.category && <p className="text-overlay-category">{item.category}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Masonry;