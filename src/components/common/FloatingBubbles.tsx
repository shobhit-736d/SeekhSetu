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
  { id: 1, size: 40, left: 8, duration: 24, delay: 0, opacity: 0.08, colorType: 'flame' },
  { id: 2, size: 24, left: 20, duration: 28, delay: 4, opacity: 0.06, colorType: 'blue' },
  { id: 3, size: 55, left: 32, duration: 32, delay: 8, opacity: 0.06, colorType: 'flame' },
  { id: 4, size: 30, left: 45, duration: 26, delay: 2, opacity: 0.07, colorType: 'warm' },
  { id: 5, size: 48, left: 60, duration: 30, delay: 7, opacity: 0.06, colorType: 'flame' },
  { id: 6, size: 22, left: 72, duration: 24, delay: 11, opacity: 0.08, colorType: 'blue' },
  { id: 7, size: 58, left: 82, duration: 34, delay: 3, opacity: 0.05, colorType: 'flame' },
  { id: 8, size: 32, left: 92, duration: 28, delay: 9, opacity: 0.07, colorType: 'warm' },
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
