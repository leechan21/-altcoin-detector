interface MiniChartProps {
  data: number[];
  className?: string;
  color?: string;
}

export function MiniChart({ data, className = "", color = "#10b981" }: MiniChartProps) {
  if (!data || data.length < 2) {
    return <div className={`w-16 h-8 bg-dark-border rounded ${className}`} />;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 60; // 60px width
    const y = 28 - ((value - min) / range) * 24; // 28px height, 24px usable
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width="60" height="28" className={`${className}`}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        points={points}
      />
    </svg>
  );
}