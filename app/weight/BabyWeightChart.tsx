import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Sample data with min and max bounds
const data = [
  { month: 0, minMax: [2.5, 4.5], weight: 3.5 },
  { month: 1, minMax: [3.0, 6.0], weight: 4.5 },
  { month: 2, minMax: [3.5, 7.0], weight: 5.0 },
  { month: 3, minMax: [4.0, 8.0], weight: 6.0 },
  { month: 4, minMax: [4.5, 8.5], weight: 6.5 },
];

export default function BabyWeightChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        {/* Grid */}
        <CartesianGrid strokeDasharray="3 3" />

        {/* Axes */}
        <XAxis
          dataKey="month"
          label={{ value: 'Months', position: 'insideBottom', offset: -5 }}
          tickFormatter={(month) => `${month} mo`}
        />
        <YAxis label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }} />

        {/* Tooltip */}
        <Tooltip formatter={(value: number) => `${value} kg`} />

       {/* Baby's Actual Weight */}
       <Area
          type="monotone"
          dataKey="weight"
          stroke="red"
          fill="none"
          fillOpacity={1}
          name="Actual weight"
        />

        {/* Shaded Area Between Min and Max */}
        <Area
          type="monotone"
          dataKey="minMax"
          stroke="none"
          fill="lightblue"
          fillOpacity={0.5}
          name="Shaded Area (Min to Max)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

