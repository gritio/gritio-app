import { TRACKING_COLORS } from '../constants/colors';

interface RingProgressProps {
  value: number;
  max: number;
  size?: 'sm' | 'lg';
}

function getRingColor(value: number, max: number): string {
  if (max <= 0 || value <= 0) return TRACKING_COLORS.ringRed;
  const ratio = value / max;
  if (ratio >= 0.75) return TRACKING_COLORS.ringGreen;
  return TRACKING_COLORS.ringAmber;
}

function formatLabel(value: number, max: number): string {
  const fmt = (n: number) => n >= 1000 ? `${Math.round(n / 100) / 10}k` : String(Math.round(n));
  return `${fmt(value)}/${fmt(max)}`;
}

export function RingProgress({ value, max, size = 'lg' }: RingProgressProps) {
  const isLg = size === 'lg';
  const diameter = isLg ? 48 : 32;
  const radius = isLg ? 19 : 12;
  const strokeWidth = isLg ? 5 : 4;
  const circumference = 2 * Math.PI * radius;
  const progress = max > 0 ? Math.min(value / max, 1) : 0;
  const dashOffset = circumference * (1 - progress);
  const color = getRingColor(value, max);

  return (
    <div style={{ position: 'relative', width: diameter, height: diameter, flexShrink: 0 }}>
      <svg
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          cx={diameter / 2} cy={diameter / 2} r={radius}
          fill="none" stroke="var(--color-border-tertiary)" strokeWidth={strokeWidth}
        />
        {max > 0 && (
          <circle
            cx={diameter / 2} cy={diameter / 2} r={radius}
            fill="none" stroke={color} strokeWidth={strokeWidth}
            strokeDasharray={circumference} strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        )}
      </svg>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: isLg ? 9 : 8,
        fontWeight: 500,
        color: 'var(--color-text-primary)',
        textAlign: 'center',
        lineHeight: 1.2,
        whiteSpace: 'nowrap',
      }}>
        {formatLabel(value, max)}
      </div>
    </div>
  );
}
