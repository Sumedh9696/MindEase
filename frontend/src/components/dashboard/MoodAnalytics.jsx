import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, TrendingUp } from 'lucide-react';
import { api } from '../../services/api';

export default function MoodAnalytics({ refreshTrigger }) {
  const [analyticsData, setAnalyticsData] = useState({
    period: 'Last week',
    averageScore: 6.2,
    trend: [
      { day: 'Mon', score: 6, feeling: 'Positive' },
      { day: 'Tue', score: 7, feeling: 'Daily Joy' },
      { day: 'Wed', score: 5, feeling: 'Calm' },
      { day: 'Thu', score: 4, feeling: 'Anxious' },
      { day: 'Fri', score: 6, feeling: 'Positive' },
      { day: 'Sat', score: 8, feeling: 'Radiant' },
      { day: 'Sun', score: 7, feeling: 'Daily Joy' }
    ]
  });

  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    api.getMoodAnalytics()
      .then(data => {
        if (data && data.trend) {
          setAnalyticsData(data);
        }
      })
      .catch(() => {});
  }, [refreshTrigger]);

  const trend = analyticsData.trend || [];

  // SVG Coordinates calculation
  // SVG dimensions: width=600, height=180
  const width = 600;
  const height = 150;
  const paddingX = 40;
  const paddingY = 25;

  const points = trend.map((item, idx) => {
    const x = paddingX + (idx * (width - 2 * paddingX)) / (trend.length - 1);
    // score ranges from 1 to 10
    const normalizedY = (item.score - 1) / 9; 
    const y = height - paddingY - (normalizedY * (height - 2 * paddingY));
    return { x, y, ...item };
  });

  // Generate smooth spline path
  const generatePath = () => {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const pathString = generatePath();
  const areaPath = pathString ? `${pathString} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z` : '';

  return (
    <div className="bg-white rounded-3xl p-5 border border-[#EFE8DD] shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-[#2C2622]">Mood Trend Analytics</h3>
          <p className="text-xs text-[#786F66]">My Emotional Patterns</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Period selector */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#EFE8DD] text-xs font-medium text-[#786F66] bg-[#FAF8F5] hover:bg-[#FAF4EB] transition-colors">
            <span>{analyticsData.period}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {/* Full view button */}
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#EFE8DD] text-xs font-semibold text-[#E77A57] hover:bg-[#FAF4EB] transition-colors">
            <span>Full view</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Spline Graph */}
      <div className="relative w-full aspect-[21/8] min-h-[160px] flex items-center justify-center">
        <svg
          viewBox={`0 0 ${width} ${height + 25}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E77A57" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#E77A57" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Subtle horizontal grid lines */}
          <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#F2ECE1" strokeDasharray="4 4" />
          <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="#F2ECE1" strokeDasharray="4 4" />
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#F2ECE1" />

          {/* Soft shaded area under curve */}
          {areaPath && (
            <path d={areaPath} fill="url(#curveGradient)" />
          )}

          {/* Smooth line */}
          {pathString && (
            <path
              d={pathString}
              fill="none"
              stroke="#B3937C"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data Points */}
          {points.map((pt, i) => {
            const isHovered = hoveredPoint?.day === pt.day;
            return (
              <g key={i} className="cursor-pointer">
                {/* Vertical guide line on hover */}
                {isHovered && (
                  <line
                    x1={pt.x}
                    y1={paddingY}
                    x2={pt.x}
                    y2={height - paddingY}
                    stroke="#E77A57"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Point Halo */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 8 : 5}
                  fill="#FFFFFF"
                  stroke="#E77A57"
                  strokeWidth="2.5"
                  className="transition-all duration-200"
                />

                {/* Day Label below */}
                <text
                  x={pt.x}
                  y={height + 15}
                  textAnchor="middle"
                  className={`text-[11px] font-medium transition-colors ${
                    isHovered ? 'fill-[#E77A57] font-bold' : 'fill-[#8C8276]'
                  }`}
                >
                  {pt.day}
                </text>

                {/* Invisible hit target for smooth hover */}
                <rect
                  x={pt.x - 20}
                  y={0}
                  width="40"
                  height={height}
                  fill="transparent"
                  onMouseEnter={() => setHoveredPoint(pt)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Float */}
        {hoveredPoint && (
          <div
            className="absolute pointer-events-none -top-1 bg-[#2C2622] text-white px-2.5 py-1 rounded-xl text-xs shadow-lg transform -translate-x-1/2 animate-fade-in"
            style={{
              left: `${(points.find(p => p.day === hoveredPoint.day)?.x / width) * 100}%`
            }}
          >
            <span className="font-bold">{hoveredPoint.day}:</span> {hoveredPoint.feeling} (Score {hoveredPoint.score}/10)
          </div>
        )}
      </div>

    </div>
  );
}
