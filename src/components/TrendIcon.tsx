import React from 'react';

interface TrendIconProps {
  trend: 'up' | 'down' | 'stable';
  strength: number;
}

const TrendIcon: React.FC<TrendIconProps> = ({ trend, strength }) => {
  const getColor = () => {
    if (trend === 'up') return strength > 0.5 ? '#ef4444' : '#fca5a5';
    if (trend === 'down') return strength > 0.5 ? '#22c55e' : '#86efac';
    return '#9ca3af';
  };

  const getPath = () => {
    if (trend === 'up' && strength > 0.5) return "M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z";
    if (trend === 'up') return "M8 11h3v10h2V11h3l-4-4-4 4z";
    if (trend === 'down' && strength > 0.5) return "M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z";
    if (trend === 'down') return "M16 13h-3V3h-2v10H8l4 4 4-4z";
    return "M4 12h16v2H4z";
  };

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={getColor()}>
      <path d={getPath()} />
    </svg>
  );
};

export default TrendIcon;