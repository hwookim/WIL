import React, { useMemo } from 'react';

export interface DonutChartProps {
  size: number;
  emptyColor: string;
  strokeWidth: number;
  dataset: {
    color: string;
    rate: number;
  }[];
}

export default function DonutChart({
  size = 100,
  emptyColor = 'white',
  strokeWidth = 20,
  dataset = [],
}: DonutChartProps): JSX.Element {
  const radius = useMemo<number>(
    () => size / 2 - strokeWidth,
    [size, strokeWidth],
  );
  const diameter = useMemo<number>(() => 2 * Math.PI * radius, [radius]);
  const accArr = useMemo<number[]>(
    () =>
      dataset
        .map(({ rate }) => rate)
        .reduce(
          (arr, v, i) => {
            const last = arr[arr.length - 1];
            return [...arr, last + v];
          },
          [0],
        ),
    [dataset],
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={emptyColor}
        strokeWidth={strokeWidth}
      />
      {dataset.map(({ color, rate }, i) => (
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${diameter * rate} ${diameter * (1 - rate)}`}
          strokeDashoffset={diameter * -accArr[i]}
        />
      ))}
    </svg>
  );
}
