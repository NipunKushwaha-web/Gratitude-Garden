import React, { useEffect, useRef, useState } from 'react';
import { useGarden } from '../context/GardenContext';
import { FLOWER_COLORS } from '../types';
import type { FlowerType, GardenFlower } from '../types';
import gsap from 'gsap';

interface PollenParticle {
  id: number;
  x: number;
  y: number;
  delay: number;
}

export default function GardenCanvas() {
  const { flowers, newFlowerId } = useGarden();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [particles] = useState<PollenParticle[]>(() =>
    [...Array(15)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60 + 20,
      delay: Math.random() * 5,
    }))
  );
  const flowerRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    flowers.forEach((flower) => {
      const el = flowerRefs.current.get(flower.id);
      if (el && flower.bloomProgress === 0) {
        gsap.fromTo(
          el,
          { scale: 0, opacity: 0, y: 20 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 2,
            ease: 'elastic.out(1, 0.5)',
          }
        );
      }
    });
  }, [flowers]);

  const setFlowerRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) {
      flowerRefs.current.set(id, el);
    }
  };

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl"
      style={{
        background: 'linear-gradient(180deg, #E8F4E5 0%, #C9E4CA 40%, #8FB996 70%, #5C8A5C 100%)',
      }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 150" preserveAspectRatio="none">
        <path
          d="M0,150 Q100,100 200,120 T400,110 T600,130 T800,100 T1000,120 T1200,110 L1200,150 Z"
          fill="#5C4033"
          opacity="0.8"
        />
        <path
          d="M0,130 Q150,80 300,100 T600,90 T900,110 T1200,95 L1200,150 L0,150 Z"
          fill="#6B5344"
        />
      </svg>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-1 h-1 rounded-full bg-[#E8C872]/60 animate-pollen"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {flowers.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="text-6xl mb-4 animate-float">🌱</div>
          <p className="font-handwritten text-2xl text-white/90">
            Plant your first gratitude
          </p>
          <p className="text-white/60 mt-2">
            Watch your garden bloom with each entry
          </p>
        </div>
      )}

      {flowers.map((flower) => (
        <GardenFlowerElement
          key={flower.id}
          flower={flower}
          ref={setFlowerRef(flower.id)}
          isNew={flower.id === newFlowerId}
        />
      ))}

      <div className="absolute top-4 left-4 flex items-center gap-2 text-white/80 text-sm">
        <span className="font-handwritten">Click a flower to read its gratitude</span>
      </div>
    </div>
  );
}

interface GardenFlowerElementProps {
  flower: GardenFlower;
  isNew?: boolean;
}

const GardenFlowerElement = React.forwardRef<HTMLDivElement, GardenFlowerElementProps>(
  ({ flower, isNew }, ref) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const { entries } = useGarden();
    const entry = entries.find((e) => e.id === flower.entryId);
    const internalRef = useRef<HTMLDivElement>(null);
    const combinedRef = (el: HTMLDivElement | null) => {
      (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }
    };

    useEffect(() => {
      if (isNew && internalRef.current) {
        gsap.timeline()
          .fromTo(internalRef.current.querySelector('.flower-stem'), 
            { scaleY: 0 },
            { scaleY: 1, duration: 0.5, ease: 'power2.out' }
          )
          .fromTo(internalRef.current.querySelector('.flower-head'),
            { scale: 0, rotation: -180 },
            { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' },
            '-=0.3'
          )
          .fromTo(internalRef.current.querySelectorAll('.flower-leaf'),
            { scale: 0 },
            { scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' },
            '-=0.5'
          );
      }
    }, [isNew]);

    return (
      <div
        ref={combinedRef}
        className="absolute cursor-pointer transition-transform hover:scale-110 hover:z-10"
        style={{
          left: `${(flower.x / 800) * 100}%`,
          bottom: `${((flower.y - 200) / 400) * 100}%`,
          transform: `scale(${flower.scale}) rotate(${flower.rotation}deg)`,
          transition: 'transform 0.3s ease-out',
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="relative flex flex-col items-center">
          <div className="flower-head">
            <FlowerSVG type={flower.flowerType} size={50} />
          </div>
          <svg className="flower-stem" width="6" height="70" viewBox="0 0 6 70" style={{ transformOrigin: 'bottom' }}>
            <rect x="2" y="0" width="2" height="70" fill="#5C8A5C" rx="1" />
          </svg>
          <svg className="flower-leaf absolute" width="20" height="15" viewBox="0 0 20 15" style={{ left: '-15px', top: '25px', transform: 'rotate(-30deg)' }}>
            <path d="M2,13 Q10,5 18,8 Q10,11 2,13 Z" fill="#7B9E87" />
          </svg>
          <svg className="flower-leaf absolute" width="20" height="15" viewBox="0 0 20 15" style={{ right: '-15px', top: '40px', transform: 'rotate(30deg)' }}>
            <path d="M2,8 Q10,0 18,5 Q10,8 2,8 Z" fill="#6B8E77" />
          </svg>
        </div>

        {showTooltip && entry && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-[#E8E4DB] z-20">
            <p className="font-handwritten text-lg text-[#3D3229] leading-relaxed line-clamp-4">
              "{entry.content}"
            </p>
            <p className="text-xs text-[#7A6F5D] mt-2">
              {new Date(entry.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white/95 border-r border-b border-[#E8E4DB]" />
          </div>
        )}
      </div>
    );
  }
);

GardenFlowerElement.displayName = 'GardenFlowerElement';

function FlowerSVG({ type, size }: { type: FlowerType; size: number }) {
  const colors = FLOWER_COLORS[type];

  switch (type) {
    case 'rose':
      return (
        <svg width={size} height={size} viewBox="0 0 50 50">
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse
              key={i}
              cx={25 + Math.cos((i * 72 * Math.PI) / 180) * 10}
              cy={25 + Math.sin((i * 72 * Math.PI) / 180) * 10}
              rx="8"
              ry="12"
              fill={i % 2 === 0 ? colors.primary : colors.secondary}
              transform={`rotate(${i * 72} ${25 + Math.cos((i * 72 * Math.PI) / 180) * 10} ${25 + Math.sin((i * 72 * Math.PI) / 180) * 10})`}
            />
          ))}
          <circle cx="25" cy="25" r="6" fill={colors.primary} />
          <circle cx="25" cy="25" r="3" fill={colors.center} />
        </svg>
      );
    case 'sunflower':
      return (
        <svg width={size + 10} height={size + 10} viewBox="0 0 60 60">
          {[...Array(10)].map((_, i) => (
            <ellipse
              key={i}
              cx="30"
              cy="12"
              rx="5"
              ry="12"
              fill={i % 2 === 0 ? colors.primary : colors.secondary}
              transform={`rotate(${i * 36} 30 30)`}
            />
          ))}
          <circle cx="30" cy="30" r="10" fill={colors.center} />
        </svg>
      );
    case 'tulip':
      return (
        <svg width={size - 5} height={size + 15} viewBox="0 0 45 65">
          <ellipse cx="22" cy="18" rx="10" ry="20" fill={colors.primary} />
          <ellipse cx="16" cy="20" rx="6" ry="16" fill={colors.secondary} transform="rotate(-10 16 20)" />
          <ellipse cx="28" cy="20" rx="6" ry="16" fill={colors.secondary} transform="rotate(10 28 20)" />
        </svg>
      );
    case 'lavender':
      return (
        <svg width={size - 15} height={size + 30} viewBox="0 0 30 70">
          {[...Array(6)].map((_, i) => (
            <ellipse
              key={i}
              cx="15"
              cy={12 + i * 5}
              rx={4 - i * 0.3}
              ry="3"
              fill={i % 2 === 0 ? colors.primary : colors.secondary}
            />
          ))}
        </svg>
      );
    case 'lotus':
      return (
        <svg width={size + 10} height={size - 5} viewBox="0 0 60 45">
          {[...Array(6)].map((_, i) => {
            const angle = (i * 60 - 150) * (Math.PI / 180);
            return (
              <ellipse
                key={i}
                cx={30 + Math.cos(angle) * 8}
                cy={22 + Math.sin(angle) * 8 - 10}
                rx="6"
                ry="16"
                fill={i % 2 === 0 ? colors.primary : colors.secondary}
                transform={`rotate(${i * 60 - 90} ${30 + Math.cos(angle) * 8} ${22 + Math.sin(angle) * 8 - 10})`}
              />
            );
          })}
          <circle cx="30" cy="25" r="6" fill={colors.center} />
        </svg>
      );
    default:
      return null;
  }
}
