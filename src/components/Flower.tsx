import { FLOWER_COLORS } from '../types';
import type { FlowerType } from '../types';

interface FlowerProps {
  type: FlowerType;
  scale?: number;
  className?: string;
}

export default function Flower({ type, scale = 1, className = '' }: FlowerProps) {
  const colors = FLOWER_COLORS[type];

  const renderFlower = () => {
    switch (type) {
      case 'rose':
        return <Rose colors={colors} />;
      case 'sunflower':
        return <Sunflower colors={colors} />;
      case 'tulip':
        return <Tulip colors={colors} />;
      case 'lavender':
        return <Lavender colors={colors} />;
      case 'lotus':
        return <Lotus colors={colors} />;
      default:
        return <Rose colors={colors} />;
    }
  };

  return (
    <div
      className={`inline-flex flex-col items-center ${className}`}
      style={{ transform: `scale(${scale})` }}
    >
      {renderFlower()}
      <svg width="8" height="60" viewBox="0 0 8 60">
        <rect x="3" y="0" width="2" height="60" fill="#5C8A5C" rx="1" />
      </svg>
    </div>
  );
}

function Rose({ colors }: { colors: { primary: string; secondary: string; center: string } }) {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" className="animate-sway" style={{ transformOrigin: 'bottom center' }}>
      <ellipse cx="30" cy="55" rx="8" ry="4" fill="rgba(92,64,51,0.3)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse
          key={i}
          cx={30 + Math.cos((i * 72 * Math.PI) / 180) * 15}
          cy={30 + Math.sin((i * 72 * Math.PI) / 180) * 15}
          rx="12"
          ry="18"
          fill={i % 2 === 0 ? colors.primary : colors.secondary}
          transform={`rotate(${i * 72} ${30 + Math.cos((i * 72 * Math.PI) / 180) * 15} ${30 + Math.sin((i * 72 * Math.PI) / 180) * 15})`}
        />
      ))}
      <circle cx="30" cy="30" r="10" fill={colors.primary} />
      <circle cx="30" cy="30" r="5" fill={colors.center} />
    </svg>
  );
}

function Sunflower({ colors }: { colors: { primary: string; secondary: string; center: string } }) {
  return (
    <svg width="70" height="70" viewBox="0 0 70 70" className="animate-sway" style={{ transformOrigin: 'bottom center', animationDelay: '0.5s' }}>
      <ellipse cx="35" cy="65" rx="10" ry="4" fill="rgba(92,64,51,0.3)" />
      {[...Array(12)].map((_, i) => (
        <ellipse
          key={i}
          cx="35"
          cy="15"
          rx="6"
          ry="16"
          fill={i % 2 === 0 ? colors.primary : colors.secondary}
          transform={`rotate(${i * 30} 35 35)`}
        />
      ))}
      <circle cx="35" cy="35" r="14" fill={colors.center} />
      {[...Array(20)].map((_, i) => (
        <circle
          key={i}
          cx={35 + Math.cos((i * 18 * Math.PI) / 180) * 8}
          cy={35 + Math.sin((i * 18 * Math.PI) / 180) * 8}
          r="2"
          fill="rgba(92,64,51,0.5)"
        />
      ))}
    </svg>
  );
}

function Tulip({ colors }: { colors: { primary: string; secondary: string; center: string } }) {
  return (
    <svg width="50" height="70" viewBox="0 0 50 70" className="animate-sway" style={{ transformOrigin: 'bottom center', animationDelay: '1s' }}>
      <ellipse cx="25" cy="65" rx="8" ry="3" fill="rgba(92,64,51,0.3)" />
      <ellipse cx="25" cy="20" rx="12" ry="25" fill={colors.primary} />
      <ellipse cx="18" cy="22" rx="8" ry="22" fill={colors.secondary} transform="rotate(-15 18 22)" />
      <ellipse cx="32" cy="22" rx="8" ry="22" fill={colors.secondary} transform="rotate(15 32 22)" />
      <path d="M25 45 Q23 50 20 55" stroke="#5C8A5C" strokeWidth="2" fill="none" />
      <ellipse cx="18" cy="52" rx="8" ry="5" fill="#7B9E87" transform="rotate(-30 18 52)" />
    </svg>
  );
}

function Lavender({ colors }: { colors: { primary: string; secondary: string; center: string } }) {
  return (
    <svg width="40" height="80" viewBox="0 0 40 80" className="animate-sway" style={{ transformOrigin: 'bottom center', animationDelay: '1.5s' }}>
      <ellipse cx="20" cy="75" rx="6" ry="3" fill="rgba(92,64,51,0.3)" />
      {[...Array(8)].map((_, i) => (
        <ellipse
          key={i}
          cx="20"
          cy={15 + i * 6}
          rx={5 - i * 0.3}
          ry="3"
          fill={i % 2 === 0 ? colors.primary : colors.secondary}
        />
      ))}
    </svg>
  );
}

function Lotus({ colors }: { colors: { primary: string; secondary: string; center: string } }) {
  return (
    <svg width="70" height="50" viewBox="0 0 70 50" className="animate-sway" style={{ transformOrigin: 'bottom center', animationDelay: '0.3s' }}>
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45 - 180) * (Math.PI / 180);
        const length = i < 4 ? 25 : 18;
        return (
          <ellipse
            key={i}
            cx={35 + Math.cos(angle) * 10}
            cy={25 + Math.sin(angle) * 10 - length / 2}
            rx="8"
            ry="20"
            fill={i % 2 === 0 ? colors.primary : colors.secondary}
            transform={`rotate(${i * 45 - 90} ${35 + Math.cos(angle) * 10} ${25 + Math.sin(angle) * 10 - length / 2})`}
          />
        );
      })}
      <circle cx="35" cy="28" r="8" fill={colors.center} />
    </svg>
  );
}

export function FlowerIcon({ type, size = 24 }: { type: FlowerType; size?: number }) {
  const colors = FLOWER_COLORS[type];

  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {type === 'rose' && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <circle
              key={i}
              cx={12 + Math.cos((i * 72 * Math.PI) / 180) * 5}
              cy={12 + Math.sin((i * 72 * Math.PI) / 180) * 5}
              r="4"
              fill={i % 2 === 0 ? colors.primary : colors.secondary}
            />
          ))}
          <circle cx="12" cy="12" r="3" fill={colors.center} />
        </>
      )}
      {type === 'sunflower' && (
        <>
          {[...Array(8)].map((_, i) => (
            <ellipse
              key={i}
              cx="12"
              cy="6"
              rx="3"
              ry="5"
              fill={i % 2 === 0 ? colors.primary : colors.secondary}
              transform={`rotate(${i * 45} 12 12)`}
            />
          ))}
          <circle cx="12" cy="12" r="4" fill={colors.center} />
        </>
      )}
      {type === 'tulip' && (
        <>
          <ellipse cx="12" cy="10" rx="5" ry="8" fill={colors.primary} />
          <ellipse cx="10" cy="11" rx="3" ry="6" fill={colors.secondary} transform="rotate(-10 10 11)" />
          <ellipse cx="14" cy="11" rx="3" ry="6" fill={colors.secondary} transform="rotate(10 14 11)" />
        </>
      )}
      {type === 'lavender' && (
        <>
          {[...Array(4)].map((_, i) => (
            <ellipse
              key={i}
              cx="12"
              cy={8 + i * 3}
              rx="2.5"
              ry="2"
              fill={i % 2 === 0 ? colors.primary : colors.secondary}
            />
          ))}
        </>
      )}
      {type === 'lotus' && (
        <>
          {[...Array(5)].map((_, i) => (
            <ellipse
              key={i}
              cx="12"
              cy={i < 2 ? 10 : 14}
              rx="3"
              ry="6"
              fill={i % 2 === 0 ? colors.primary : colors.secondary}
              transform={`rotate(${i * 36 - 90} 12 ${i < 2 ? 10 : 14})`}
            />
          ))}
          <circle cx="12" cy="12" r="3" fill={colors.center} />
        </>
      )}
    </svg>
  );
}
