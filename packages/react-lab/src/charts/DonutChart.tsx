import React, { useMemo } from 'react';

export interface DonutChartProps {
  size: number;
  strokeWidth: number;
  dataset: {
    color: string;
    value: number;
  }[];
}

export default function DonutChart({
  size = 100,
  strokeWidth = 20,
  dataset = [],
}: DonutChartProps): JSX.Element {
  const radius = useMemo<number>(
    () => (size - strokeWidth) / 2,
    [size, strokeWidth],
  );
  const circumference = useMemo<number>(() => 2 * radius * Math.PI, [radius]);
  const total = useMemo<number>(
    () => dataset.map(({ value }) => value).reduce((prev, v) => prev + v),
    [dataset],
  );
  const ratios = useMemo<number[]>(
    () => dataset.map(({ value }) => value / total),
    [dataset, total],
  );
  const accArr = useMemo<number[]>(
    () =>
      ratios.reduce(
        (arr, v, i) => {
          const last = arr[arr.length - 1];
          return [...arr, last + v];
        },
        [0],
      ),
    [ratios],
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {dataset.map(({ color }, i) => (
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference * ratios[i]} ${
            circumference * (1 - ratios[i])
          }`}
          strokeDashoffset={circumference * accArr[i] * -1}
        />
      ))}
    </svg>
  );
}
