import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    className?: string;
}

// Verified Badge - Colorful illustration style
export const IconVerified: React.FC<IconProps> = ({
    size = 64,
    className,
    ...props
}) => (
    <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        className={className}
        {...props}
    >
        <circle cx="32" cy="32" r="28" fill="#10B981" opacity="0.2" />
        <path d="M32 8L36.5 12.5L42.5 11L44 17L49.5 19.5L48 25.5L52 30L48 34.5L49.5 40.5L44 43L42.5 49L36.5 47.5L32 52L27.5 47.5L21.5 49L20 43L14.5 40.5L16 34.5L12 30L16 25.5L14.5 19.5L20 17L21.5 11L27.5 12.5L32 8Z" fill="#10B981" />
        <path d="M32 8L36.5 12.5L42.5 11L44 17L49.5 19.5L48 25.5L52 30L48 34.5L49.5 40.5L44 43L42.5 49L36.5 47.5L32 52L27.5 47.5L21.5 49L20 43L14.5 40.5L16 34.5L12 30L16 25.5L14.5 19.5L20 17L21.5 11L27.5 12.5L32 8Z" stroke="#059669" strokeWidth="1.5" />
        <path d="M22 32L28 38L42 24" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Location Pin - Colorful illustration
export const IconLocation: React.FC<IconProps> = ({
    size = 64,
    className,
    ...props
}) => (
    <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        className={className}
        {...props}
    >
        <ellipse cx="32" cy="56" rx="12" ry="4" fill="#3B82F6" opacity="0.2" />
        <path d="M32 8C22.6 8 15 15.6 15 25C15 38 32 56 32 56C32 56 49 38 49 25C49 15.6 41.4 8 32 8Z" fill="#3B82F6" />
        <path d="M32 8C22.6 8 15 15.6 15 25C15 38 32 56 32 56C32 56 49 38 49 25C49 15.6 41.4 8 32 8Z" stroke="#2563EB" strokeWidth="2" />
        <circle cx="32" cy="25" r="7" fill="white" />
        <circle cx="32" cy="25" r="4" fill="#2563EB" />
    </svg>
);

// Star Rating - Colorful illustration
export const IconReviews: React.FC<IconProps> = ({
    size = 64,
    className,
    ...props
}) => (
    <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        className={className}
        {...props}
    >
        <circle cx="32" cy="32" r="28" fill="#FBBF24" opacity="0.2" />
        <path d="M32 10L37.5 24.5L53 26.5L42.5 36.5L45 52L32 44.5L19 52L21.5 36.5L11 26.5L26.5 24.5L32 10Z" fill="#FBBF24" />
        <path d="M32 10L37.5 24.5L53 26.5L42.5 36.5L45 52L32 44.5L19 52L21.5 36.5L11 26.5L26.5 24.5L32 10Z" stroke="#F59E0B" strokeWidth="2" strokeLinejoin="round" />
        <path d="M32 18L35 28L45 29L38 35L40 45L32 40L24 45L26 35L19 29L29 28L32 18Z" fill="#FEF3C7" />
    </svg>
);

// Clock/Realtime - Colorful illustration
export const IconRealtime: React.FC<IconProps> = ({
    size = 64,
    className,
    ...props
}) => (
    <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        className={className}
        {...props}
    >
        <circle cx="32" cy="32" r="28" fill="#A855F7" opacity="0.2" />
        <circle cx="32" cy="32" r="22" fill="#A855F7" />
        <circle cx="32" cy="32" r="22" stroke="#9333EA" strokeWidth="2" />
        <circle cx="32" cy="32" r="18" fill="#E9D5FF" />
        <path d="M32 18V32L40 40" stroke="#9333EA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="32" r="2" fill="#9333EA" />
        <circle cx="32" cy="14" r="1.5" fill="#9333EA" />
        <circle cx="32" cy="50" r="1.5" fill="#9333EA" />
        <circle cx="50" cy="32" r="1.5" fill="#9333EA" />
        <circle cx="14" cy="32" r="1.5" fill="#9333EA" />
    </svg>
);

// Community - Colorful illustration
export const IconCommunity: React.FC<IconProps> = ({
    size = 64,
    className,
    ...props
}) => (
    <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        className={className}
        {...props}
    >
        <ellipse cx="32" cy="52" rx="24" ry="6" fill="#6366F1" opacity="0.2" />
        <circle cx="32" cy="20" r="8" fill="#6366F1" />
        <circle cx="32" cy="20" r="8" stroke="#4F46E5" strokeWidth="2" />
        <path d="M18 48C18 40 24 34 32 34C40 34 46 40 46 48" fill="#6366F1" />
        <path d="M18 48C18 40 24 34 32 34C40 34 46 40 46 48" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="24" r="6" fill="#818CF8" />
        <circle cx="48" cy="24" r="6" fill="#818CF8" />
        <path d="M8 48C8 42 11 38 16 38" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
        <path d="M56 48C56 42 53 38 48 38" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

// Support/Help - Colorful illustration
export const IconSupport: React.FC<IconProps> = ({
    size = 64,
    className,
    ...props
}) => (
    <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        className={className}
        {...props}
    >
        <circle cx="32" cy="32" r="28" fill="#EF4444" opacity="0.2" />
        <path d="M16 36C16 28 20 20 32 20C44 20 48 28 48 36C48 44 44 48 32 48C28 48 26 47 24 46L16 48L18 40C17 38 16 37 16 36Z" fill="#EF4444" />
        <path d="M16 36C16 28 20 20 32 20C44 20 48 28 48 36C48 44 44 48 32 48C28 48 26 47 24 46L16 48L18 40C17 38 16 37 16 36Z" stroke="#DC2626" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="24" cy="32" r="2" fill="white" />
        <circle cx="32" cy="32" r="2" fill="white" />
        <circle cx="40" cy="32" r="2" fill="white" />
        <path d="M22 40C24 42 28 43 32 43C36 43 40 42 42 40" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
