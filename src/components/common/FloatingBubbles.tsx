import React from 'react';

interface Bubble {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
  colorType: 'flame' | 'blue' | 'warm';
}

const BUBBLES: Bubble[] = [
  { id: 1, size: 45, left: 8, duration: 18, delay: 0, opacity: 0.25, colorType: 'flame' },
  { id: 2, size: 28, left: 18, duration: 22, delay: 4, opacity: 0.2, colorType: 'blue' },
  { id: 3, size: 65, left: 28, duration: 25, delay: 8, opacity: 0.18, colorType: 'flame' },
  { id: 4, size: 36, left: 42, duration: 19, delay: 2, opacity: 0.22, colorType: 'warm' },
  { id: 5, size: 54, left: 56, duration: 24, delay: 7, opacity: 0.2, colorType: 'flame' },
  { id: 6, size: 24, left: 68, duration: 17, delay: 11, opacity: 0.28, colorType: 'blue' },
  { id: 7, size: 70, left: 78, duration: 26, delay: 3, opacity: 0.15, colorType: 'flame' },
  { id: 8, size: 38, left: 88, duration: 20, delay: 9, opacity: 0.22, colorType: 'warm' },
  { id: 9, size: 30, left: 94, duration: 21, delay: 5, opacity: 0.2, colorType: 'blue' },
  { id: 10, size: 50, left: 3, duration: 23, delay: 12, opacity: 0.18, colorType: 'warm' },
  { id: 11, size: 34, left: 35, duration: 18, delay: 14, opacity: 0.24, colorType: 'flame' },
  { id: 12, size: 42, left: 72, duration: 22, delay: 1, opacity: 0.2, colorType: 'flame' },
];

export const FloatingBubbles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {BUBBLES.map(b => {
        const bgGradient =
          b.colorType === 'flame'
            ? 'radial-gradient(circle at 35% 35%, rgba(250, 70, 22, 0.4), rgba(237, 118, 73, 0.08))'
            : b.colorType === 'blue'
            ? 'radial-gradient(circle at 35% 35%, rgba(23, 84, 216, 0.35), rgba(23, 84, 216, 0.06))'
            : 'radial-gradient(circle at 35% 35%, rgba(245, 158, 11, 0.35), rgba(250, 70, 22, 0.06))';

        return (
          <div
            key={b.id}
            className="floating-bubble-particle border border-white/20 dark:border-white/10 shadow-sm"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: `${b.left}%`,
              background: bgGradient,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              opacity: b.opacity,
            }}
          />
        );
      })}
    </div>
  );
};
