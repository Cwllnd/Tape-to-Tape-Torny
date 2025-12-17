import React from 'react';

export const ICONS: Record<string, React.FC<{ className?: string }>> = {
    '1': ({ className }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ), // Puck/Target
    '2': ({ className }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M22 2l-2.5 14L13 22l-1.5-3.5L14 12 8 6l-6 6-2-2 16-8 6-2z" />
        </svg>
    ), // Stick (Simulated)
    '3': ({ className }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
        </svg>
    ), // Shield/Defense
    '4': ({ className }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 2L1 21h22L12 2zm0 3.51l5.13 8.88h-10.26L12 5.51zM12 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
        </svg>
    ), // Warning/Ref
    '5': ({ className }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
    ), // Star
    '6': ({ className }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l3.59-3.58L17 12l-5 5z" />
        </svg>
    ), // Check/Win
    '7': ({ className }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M13.5 2c-1.93 0-3.5 1.57-3.5 3.5H8v10h5v3.5c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5V10h-2v8.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V8h2v-2.5c0-1.93-1.57-3.5-3.5-3.5zM6 16H4v3.5C4 21.43 5.57 23 7.5 23s3.5-1.57 3.5-3.5V16H6z" />
        </svg>
    ), // Glove/Hands
    '8': ({ className }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
        </svg>
    ), // Trophy
    '9': ({ className }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
        </svg>
    ), // Dart/Speed
    '10': ({ className }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M20.24 12.24l-6-6-1.41 1.41 3.29 3.29H6v2h10.12l-3.29 3.29 1.41 1.41 6-6z" />
        </svg>
    ), // Arrow
};

export const COLORS = [
    '#ef4444', // Red
    '#f97316', // Orange
    '#eab308', // Yellow
    '#22c55e', // Green
    '#06b6d4', // Cyan
    '#3b82f6', // Blue
    '#8b5cf6', // Violet
    '#d946ef', // Fuchsia
    '#ec4899', // Pink
    '#64748b', // Slate
];
