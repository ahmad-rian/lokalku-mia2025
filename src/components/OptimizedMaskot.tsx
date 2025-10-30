import { memo } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedMaskotProps {
  className?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  priority?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12', 
  lg: 'w-24 h-24'
};

const OptimizedMaskot = memo(({ 
  className, 
  alt = "SABI AI", 
  size = 'md',
  priority = false 
}: OptimizedMaskotProps) => {
  return (
    <img
      src="/assets/images/maskot.png"
      alt={alt}
      className={cn(
        sizeClasses[size],
        "object-contain",
        className
      )}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      // Add responsive image attributes for better performance
      sizes={size === 'lg' ? '96px' : size === 'md' ? '48px' : '32px'}
    />
  );
});

OptimizedMaskot.displayName = 'OptimizedMaskot';

export default OptimizedMaskot;